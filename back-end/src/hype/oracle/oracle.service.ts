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

  async updateHype(hypeId: string, score: number) {
    const validHypeId = this.validateHypeId(hypeId);

    const tx = await this.writeContract.write.updateHype([
      validHypeId as `0x${string}`,
      Math.floor(score * 100), // Convert to integer percentage
      0, // HypeB placeholder
    ]);
    return tx;
  }

  async getHype(hypeId: string) {
    const validHypeId = this.validateHypeId(hypeId);

    // Chama matchHypes para obter todos os dados do confronto
    const result: any = await this.readContract.read.matchHypes([
      validHypeId as `0x${string}`,
    ]);
    // result: [HypeA, HypeB, goalsA, goalsB, start, end, scheduledTime, status, teamAAbbreviation, teamBAbbreviation]
    return {
      hypeA: Number(result[0]) / 100,
      hypeB: Number(result[1]) / 100,
      goalsA: Number(result[2]),
      goalsB: Number(result[3]),
      start: Number(result[4]),
      end: Number(result[5]),
      scheduledTime: Number(result[6]),
      status: Number(result[7]),
      timeA: result[8] || '',
      timeB: result[9] || '',
    };
  }
}
