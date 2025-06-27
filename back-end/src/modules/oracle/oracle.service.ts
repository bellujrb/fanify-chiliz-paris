import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";
import {
  Abi,
  Address,
  Chain,
  createPublicClient,
  createWalletClient,
  getContract,
  GetContractReturnType,
  Hash,
  http,
  PublicClient,
  WalletClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { isBytes4 } from "../../utils/bytes4";
import { anvil } from "viem/chains";
import deployedContracts from "../../lib/deployedContracts";

@Injectable()
export class OracleService {
  private publicClient: PublicClient;
  private walletClient: WalletClient;
  private readContract;
  private writeContract;

  constructor(private readonly configService: ConfigService) {
    this.publicClient = createPublicClient({
      chain: anvil,
      transport: http(),
    });
    // Cria o account a partir da private key
    const account = privateKeyToAccount(
      this.configService.ethPrivateKey as `0x${string}`
    );

    // Cria o client de wallet para escrita
    this.walletClient = createWalletClient({
      chain: anvil,
      transport: http(),
      account,
    });

    this.readContract = getContract({
      address: deployedContracts.Oracle.address,
      abi: deployedContracts.Oracle.abi,
      client: this.publicClient,
    });
    this.writeContract = getContract({
      address: deployedContracts.Oracle.address,
      abi: deployedContracts.Oracle.abi,
      client: this.walletClient,
    });
  }

  private validateHypeId(hypeId: string): string {
    if (!isBytes4(hypeId)) {
      throw new Error("Hype ID must be a valid bytes4 value");
    }
    return hypeId;
  }

  async updateHype(hypeId: string, hypeA: number, hypeB: number) {
    const validHypeId = this.validateHypeId(hypeId);
    // Garante que a soma é 10000
    if (Math.round(hypeA + hypeB) !== 10000) {
      console.error(`Invalid hype values: hypeA (${hypeA}) + hypeB (${hypeB}) != 10000`);
      throw new Error('A soma de hypeA e hypeB deve ser 10000');
    }
    const tx = await this.writeContract.write.updateHype([
      validHypeId as `0x${string}`,
      Math.round(hypeA * 100), // Convertendo para inteiro
      Math.round(hypeB * 100),
    ]);
    return tx;
  }

  async getHype(hypeId: string) {
    const validHypeId = this.validateHypeId(hypeId);

    // Chama matchHypes para obter todos os dados do confronto
    const result: any = await this.readContract.read.matchHypes([
      validHypeId as `0x${string}`,
    ]);
    // result: [HypeA, HypeB, goalsA, goalsB, start, end, scheduledTime, status, teamAAbbreviation, teamBAbbreviation, hashtag]
    return {
      hypeA: Number(result[0]) / 100,
      hypeB: Number(result[1]) / 100,
      goalsA: Number(result[2]),
      goalsB: Number(result[3]),
      start: Number(result[4]),
      end: Number(result[5]),
      scheduledTime: Number(result[6]),
      status: Number(result[7]),
      teamA: result[8] || '',
      teamB: result[9] || '',
      hashtag: result[10] || '',
    };
  }

  async scheduleMatch(hypeId: string, scheduledTime: number, teamA: string, teamB: string, hashtag: string) {
    const validHypeId = this.validateHypeId(hypeId);
    return this.writeContract.write.scheduleMatch([
      validHypeId as `0x${string}`,
      scheduledTime,
      teamA,
      teamB,
      hashtag
    ]);
  }
}
