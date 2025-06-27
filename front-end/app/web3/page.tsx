"use client";

import React, { useState, useEffect } from "react";
import {
  createPublicClient,
  http,
  parseEther,
  formatEther,
  createWalletClient,
  custom,
  getContract,
} from "viem";
import { spicy } from "viem/chains";
import deployedContracts from "@/lib/deployedContracts";
import { getStatusText } from "@/lib/utils";
import WalletInfo from "@/components/web3/WalletInfo";
import ContractTabs from "@/components/web3/ContractTabs";
import { Button } from "@/components/ui/button";

// Configuração do cliente público
const publicClient = createPublicClient({
  chain: spicy,
  transport: http(),
});

// Adicionar mapeamento de erros Funify
const FUNIFY_ERROR_MESSAGES: Record<string, string> = {
  E000: 'A partida já foi finalizada.',
  E001: 'Falha na transferência de tokens.',
  E002: 'Nenhum lucro para sacar.',
  E003: 'Valores de hype inválidos.',
  E004: 'Valor de aposta inválido.',
  E005: 'A partida não foi finalizada.',
  E006: 'A partida terminou empatada.',
  E007: 'Usuário já apostou.',
  E008: 'Usuário não venceu.',
  E009: 'A partida não está aberta.',
  E010: 'Nenhuma aposta nesta partida.',
  E011: 'Apenas o owner pode executar esta ação.',
  E012: 'Você não é o owner.',
  E013: 'Partida não encontrada.',
  E014: 'Status da partida inválido.',
  E015: 'Prize pool insuficiente.',
  E016: 'Prêmio já foi reclamado.',
  E017: 'Endereço de usuário inválido.',
  E018: 'Falha ao consultar o Oracle.'
};

function getFriendlyErrorMessage(error: any): string | null {
  if (!error) return null;
  const msg = typeof error === 'string' ? error : (error.message || '');
  const match = msg.match(/E0\d{2}/);
  if (match && FUNIFY_ERROR_MESSAGES[match[0]]) {
    return FUNIFY_ERROR_MESSAGES[match[0]];
  }
  return null;
}

export default function ContractInteractionPage() {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [hypeTokenBalance, setHypeTokenBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [hypeId, setHypeId] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [hypeA, setHypeA] = useState<string>("");
  const [hypeB, setHypeB] = useState<string>("");
  const [goalsA, setGoalsA] = useState<string>("");
  const [goalsB, setGoalsB] = useState<string>("");
  const [betAmount, setBetAmount] = useState<string>("");
  const [teamA, setTeamA] = useState<boolean>(true);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [transferTo, setTransferTo] = useState<string>("");
  const [matchData, setMatchData] = useState<any>(null);
  const [odds, setOdds] = useState<any>(null);
  const [prizePools, setPrizePools] = useState<any>(null);
  const [hypeTokenOwner, setHypeTokenOwner] = useState<string>("");
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [userBet, setUserBet] = useState<any>(null);
  const [matchStats, setMatchStats] = useState<any>(null);
  const [claimStatus, setClaimStatus] = useState<any>(null);
  const [contractStats, setContractStats] = useState<any>(null);
  const [allowance, setAllowance] = useState<string>("0");
  const [hypeIds, setHypeIds] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState<string>("");
  const [teamAAbbreviation, setTeamAAbbreviation] = useState<string>("");
  const [teamBAbbreviation, setTeamBAbbreviation] = useState<string>("");

  // Conectar carteira
  const connectWallet = async () => {
    console.log("DEBUG: Tentando conectar carteira");
    console.log(
      "DEBUG: window.ethereum existe:",
      typeof window.ethereum !== "undefined"
    );

    try {
      if (typeof window.ethereum !== "undefined") {
        console.log("DEBUG: MetaMask encontrado, solicitando contas");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("DEBUG: Contas recebidas:", accounts);
        setAccount(accounts[0]);
        console.log("DEBUG: Conta definida:", accounts[0]);

        console.log("DEBUG: Atualizando saldos");
        await updateBalances(accounts[0]);
        console.log("DEBUG: Saldos atualizados");
      } else {
        console.log("DEBUG: MetaMask não encontrado");
        console.error("[Erro] MetaMask não encontrado!");
      }
    } catch (error) {
      console.error("DEBUG: Erro ao conectar carteira:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
    }
  };

  // Atualizar saldos
  const updateBalances = async (address: string) => {
    console.log("DEBUG: Atualizando saldos para endereço:", address);

    try {
      console.log("DEBUG: Buscando saldo de CHZ");
      const balance = await publicClient.getBalance({
        address: address as `0x${string}`,
      });
      console.log("DEBUG: Saldo CHZ (wei):", balance);
      setBalance(formatEther(balance));
      console.log("DEBUG: Saldo CHZ formatado:", formatEther(balance));

      console.log("DEBUG: Criando contrato HypeToken para buscar saldo");
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: publicClient,
      });
      console.log("DEBUG: Contrato HypeToken criado");

      console.log("DEBUG: Chamando balanceOf");
      const tokenBalance = await hypeTokenContract.read.balanceOf([
        address as `0x${string}`,
      ]);
      console.log("DEBUG: Saldo HYPE (wei):", tokenBalance);
      setHypeTokenBalance(formatEther(tokenBalance as bigint));
      console.log(
        "DEBUG: Saldo HYPE formatado:",
        formatEther(tokenBalance as bigint)
      );
    } catch (error) {
      console.error("DEBUG: Erro ao atualizar saldos:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
    }
  };

  // Funções do HypeToken
  const mintTokens = async () => {
    console.log("DEBUG: Iniciando mint de tokens");
    console.log("DEBUG: Account:", account);
    console.log("DEBUG: Loading state:", loading);
    console.log(
      "DEBUG: HypeToken address:",
      deployedContracts.HypeToken.address
    );

    if (!account) {
      console.log("DEBUG: Nenhuma conta conectada");
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    console.log("DEBUG: Loading definido como true");

    try {
      console.log("DEBUG: Criando contrato HypeToken");
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });
      console.log("DEBUG: Contrato criado com sucesso");

      console.log("DEBUG: Chamando função mint");
      console.log(
        "DEBUG: Parâmetros - account:",
        account,
        "amount:",
        parseEther("1000")
      );

      const hash = await hypeTokenContract.write.mint(
        [account as `0x${string}`, parseEther("1000")],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("DEBUG: Mint realizado com sucesso. Hash:", hash);
      console.log("[Sucesso] 1000 HYPE tokens foram mintados para ...");

      console.log("DEBUG: Atualizando saldos");
      await updateBalances(account);
      console.log("DEBUG: Saldos atualizados");
    } catch (error) {
      console.error("DEBUG: Erro ao mintar tokens:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
    } finally {
      console.log("DEBUG: Definindo loading como false");
      setLoading(false);
    }
  };

  const stakeTokens = async () => {
    if (!account || !stakeAmount) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      const hash = await hypeTokenContract.write.stake({
        value: parseEther(stakeAmount),
        account: account as `0x${string}`,
      });

      console.log(hash);

      console.log("[Sucesso] 1000 HYPE tokens foram stakados. Hash: ...");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao stakar tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const unstakeTokens = async () => {
    if (!account || !unstakeAmount) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      const hash = await hypeTokenContract.write.unstake(
        [parseEther(unstakeAmount)],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] 1000 HYPE tokens foram unstakados. Hash: ...");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao unstakar tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const transferTokens = async () => {
    if (!account || !transferTo || !transferAmount) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      const hash = await hypeTokenContract.write.transfer(
        [transferTo as `0x${string}`, parseEther(transferAmount)],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] 1000 HYPE tokens foram transferidos para ...");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao transferir tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHypeTokenOwner = async () => {
    try {
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: publicClient,
      });

      const owner = await hypeTokenContract.read.owner();
      setHypeTokenOwner(owner as string);

      console.log("[Sucesso] Owner:", owner);
    } catch (error) {
      console.error("Erro ao buscar owner:", error);
    }
  };

  const getTokenInfo = async () => {
    try {
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: publicClient,
      });

      const [name, symbol, totalSupply, decimals] = await Promise.all([
        hypeTokenContract.read.name(),
        hypeTokenContract.read.symbol(),
        hypeTokenContract.read.totalSupply(),
        hypeTokenContract.read.decimals(),
      ]);

      setTokenInfo({
        name: name as string,
        symbol: symbol as string,
        totalSupply: formatEther(totalSupply as bigint),
        decimals: decimals as number,
      });

      console.log("[Sucesso] Token:", name, "(" + symbol + ")", "- Total Supply:", formatEther(totalSupply as bigint));
    } catch (error) {
      console.error("Erro ao buscar informações do token:", error);
    }
  };

  // Funções do Oracle Refatorado
  const getMatchData = async () => {
    if (!hypeId) {
      return;
    }

    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: publicClient,
      });

      console.log("DEBUG: Chamando getMatch para hypeId:", hypeId);
      
      let data;
      try {
        // Tentar usar a função getMatch primeiro
        data = await oracleContract.read.getMatch([hypeId as `0x${string}`]);
        console.log("DEBUG: getMatch funcionou, dados:", data);
      } catch (getMatchError) {
        console.log("DEBUG: getMatch falhou, tentando matchHypes:", getMatchError);
        // Fallback para matchHypes se getMatch não existir
        data = await oracleContract.read.matchHypes([hypeId as `0x${string}`]);
        console.log("DEBUG: matchHypes funcionou");
      }
      
      // Interpretar os dados corretamente baseado na estrutura do contrato
      const [hypeA, hypeB, goalsA, goalsB, start, end, scheduledTime, status, nameA, nameB, hashtag] = data;
      
      console.log("DEBUG: Dados interpretados:", {
        hypeA: hypeA.toString(),
        hypeB: hypeB.toString(),
        goalsA: goalsA.toString(),
        goalsB: goalsB.toString(),
        start: start.toString(),
        end: end.toString(),
        scheduledTime: scheduledTime.toString(),
        status: status.toString(),
        hashtag: hashtag.toString(),
        nameA: nameA.toString(),
        nameB: nameB.toString()
      });
      
      setMatchData({
        hypeA: hypeA.toString(),
        hypeB: hypeB.toString(),
        goalsA: goalsA.toString(),
        goalsB: goalsB.toString(),
        start: start > 0 ? new Date(Number(start) * 1000).toLocaleString() : "Não iniciado",
        end: end > 0 ? new Date(Number(end) * 1000).toLocaleString() : "Não definido",
        scheduledTime: scheduledTime > 0 ? new Date(Number(scheduledTime) * 1000).toLocaleString() : "Não agendado",
        status: status.toString(),
        hashtag: hashtag.toString(),
        nameA: nameA.toString(),
        nameB: nameB.toString()
      });

      console.log("[Sucesso] Dados do Match Carregados");
    } catch (error) {
      console.error("Erro ao buscar dados do match:", error);
    }
  };

  const getHype = async () => {
    if (!hypeId) {
      return;
    }

    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: publicClient,
      });

      const data = await oracleContract.read.getHype([hypeId as `0x${string}`]);
      const [hypeA, hypeB, status] = data;
      
      console.table({
        hypeA: hypeA.toString(),
        hypeB: hypeB.toString(),
        status: getStatusText(status.toString()),
        statusRaw: status.toString(),
      });
      setMatchData({
        hypeA: hypeA.toString(),
        hypeB: hypeB.toString(),
        status: status.toString(),
      });

      console.log("[Sucesso] Hype Carregado");
    } catch (error) {
      console.error("Erro ao buscar hype:", error);
    }
  };

  const getMatch = async () => {
    // Usar getMatchData como fallback já que getMatch não existe no ABI atual
    await getMatchData();
  };

  const matchExists = async () => {
    if (!hypeId) {
      return;
    }

    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: publicClient,
      });

      let exists;
      try {
        // Tentar usar a função matchExists primeiro
        exists = await oracleContract.read.matchExists([hypeId as `0x${string}`]);
        console.log("DEBUG: matchExists funcionou:", exists);
      } catch (matchExistsError) {
        console.log("DEBUG: matchExists falhou, verificando manualmente:", matchExistsError);
        // Fallback: verificar se scheduledTime > 0
        const data = await oracleContract.read.matchHypes([hypeId as `0x${string}`]);
        exists = Number(data[6]) > 0; // scheduledTime
        console.log("DEBUG: Verificação manual:", exists);
      }

      console.log("[Sucesso] Match:", hypeId, ":", exists ? "Encontrado" : "Não encontrado");
    } catch (error) {
      console.error("Erro ao verificar existência do match:", error);
    }
  };

  // Etapa 0: Criar Jogo
  const scheduleMatch = async () => {
    if (!account || !hypeId || !scheduledTime || !teamAAbbreviation || !teamBAbbreviation || !hashtag) {
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }
    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });
    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });
      const hash = await oracleContract.write.scheduleMatch(
        [
          hypeId as `0x${string}`,
          BigInt(scheduledTime),
          teamAAbbreviation,
          teamBAbbreviation,
          hashtag
        ],
        {
          account: account as `0x${string}`,
        }
      );
      console.log("[Sucesso] Match Criado!");
      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao criar match:", error);
    } finally {
      setLoading(false);
    }
  };

  // Etapa 1: Alimentar com Hype
  const updateHype = async () => {
    if (!account || !hypeId || !hypeA || !hypeB) {
      return;
    }

    if (Number(hypeA) + Number(hypeB) !== 100) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });

      const hash = await oracleContract.write.updateHype(
        [hypeId as `0x${string}`, BigInt(hypeA), BigInt(hypeB)],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Hype Atualizado!");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao atualizar hype:", error);
    } finally {
      setLoading(false);
    }
  };

  // Etapa 2: Abrir para Apostas
  const openToBets = async () => {
    if (!account || !hypeId) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });

      const hash = await oracleContract.write.openToBets(
        [hypeId as `0x${string}`],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Apostas Abertas!");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao abrir apostas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Etapa 3: Fechar Apostas
  const closeBets = async () => {
    if (!account || !hypeId) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });

      const hash = await oracleContract.write.closeBets(
        [hypeId as `0x${string}`],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Apostas Fechadas!");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao fechar apostas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Etapa 4: Atualizar Placar
  const updateScore = async () => {
    if (!account || !hypeId || !goalsA || !goalsB) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });

      const hash = await oracleContract.write.updateScore(
        [hypeId as `0x${string}`, Number(goalsA), Number(goalsB)],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Placar Atualizado!");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao atualizar placar:", error);
    } finally {
      setLoading(false);
    }
  };

  // Etapa 5: Finalizar Jogo
  const finishMatch = async () => {
    if (!account || !hypeId) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });

      const hash = await oracleContract.write.finishMatch(
        [hypeId as `0x${string}`],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Jogo Finalizado!");

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao finalizar jogo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funções do Funify
  const getOdds = async () => {
    if (!hypeId) {
      return;
    }

    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.getOdds([hypeId as `0x${string}`]);
      setOdds({
        oddsA: formatEther(data[0]),
        oddsB: formatEther(data[1]),
      });

      console.log("[Sucesso] Odds carregadas");
    } catch (error) {
      console.error("Erro ao buscar odds:", error);
    }
  };

  const getPrizePools = async () => {
    if (!hypeId) {
      return;
    }

    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.getPrizePools([
        hypeId as `0x${string}`,
      ]);
      setPrizePools({
        poolA: formatEther(data[0]),
        poolB: formatEther(data[1]),
        houseCut: formatEther(data[2]),
      });

      console.log("[Sucesso] Prize pools carregadas");
    } catch (error) {
      console.error("Erro ao buscar prize pools:", error);
    }
  };

  const placeBet = async () => {
    if (!account || !hypeId || !betAmount) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: walletClient,
      });

      const hash = await funifyContract.write.placeBet(
        [hypeId as `0x${string}`, teamA, parseEther(betAmount)],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Aposta realizada! Hash:", hash);

      await updateBalances(account);
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao fazer aposta:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const claimPrize = async () => {
    if (!account || !hypeId) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: walletClient,
      });

      const hash = await funifyContract.write.claimPrize(
        [hypeId as `0x${string}`],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Prêmio reclamado! Hash:", hash);

      await updateBalances(account);
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao reclamar prêmio:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Funções adicionais do Funify
  const getUserBet = async () => {
    if (!account || !hypeId) {
      return;
    }

    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.bets([
        hypeId as `0x${string}`,
        account as `0x${string}`,
      ]);

      setUserBet({
        amount: formatEther(data[0]),
        teamA: data[1],
      });

      console.log("[Sucesso] Aposta do Usuário");
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao buscar aposta do usuário:", error);
      }
    }
  };

  const getMatchStats = async () => {
    if (!hypeId) {
      return;
    }

    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.getMatchStats([hypeId as `0x${string}`]);

      setMatchStats({
        totalBetsA: formatEther(data[0]),
        totalBetsB: formatEther(data[1]),
        totalPool: formatEther(data[2]),
        houseCut: formatEther(data[3]),
      });

      console.log("[Sucesso] Estatísticas do Match");
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao buscar estatísticas do match:", error);
      }
    }
  };

  const checkClaimStatus = async () => {
    if (!account || !hypeId) {
      return;
    }

    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.canClaimPrize([
        hypeId as `0x${string}`,
        account as `0x${string}`,
      ]);

      setClaimStatus({
        canClaim: data[0],
        reason: data[1],
      });

      console.log("[Sucesso] Pode Reclamar:", data[0]);
      console.log("[Sucesso] Motivo:", data[1]);
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao verificar status de claim:", error);
      }
    }
  };

  const getContractStats = async () => {
    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.getContractStats();

      setContractStats({
        totalMatches: data[0].toString(),
        totalBets: data[1].toString(),
        totalHouseProfit: formatEther(data[2]),
        tokenAddress: data[3],
        oracleAddress: data[4],
        contractOwner: data[5],
      });

      console.log("[Sucesso] Estatísticas do Contrato");
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao buscar estatísticas do contrato:", error);
      }
    }
  };

  const emergencyWithdraw = async () => {
    if (!account) {
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      const hash = await hypeTokenContract.write.emergencyWithdraw({
        account: account as `0x${string}`,
      });

      console.log("[Sucesso] Emergency Withdraw Realizado!");

      await updateBalances(account);
    } catch (error) {
      const friendly = getFriendlyErrorMessage(error);
      if (friendly) {
        console.error("[Erro Funify]", friendly);
      } else {
        console.error("Erro ao fazer emergency withdraw:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para dar approve do HypeToken para o contrato Funify
  const approveHypeToken = async () => {
    if (!account || !betAmount) {
      console.log("DEBUG: Account ou betAmount não fornecidos");
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("DEBUG: Wallet não disponível");
      return;
    }

    const walletClient = createWalletClient({
      chain: spicy,
      transport: custom(window.ethereum as any),
    });

    setLoading(true);
    try {
      console.log("DEBUG: Criando contrato HypeToken para approve");
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      console.log("DEBUG: Chamando approve");
      console.log("DEBUG: Parâmetros - spender:", deployedContracts.Funify.address, "amount:", parseEther(betAmount));

      const hash = await hypeTokenContract.write.approve(
        [deployedContracts.Funify.address as `0x${string}`, parseEther(betAmount)],
        {
          account: account as `0x${string}`,
        }
      );

      console.log("[Sucesso] Approve realizado! Hash:", hash);
      console.log(`[Sucesso] ${betAmount} HYPE tokens aprovados para o contrato Funify`);

      await updateBalances(account);
      // Atualizar allowance após o approve
      await getAllowance();
    } catch (error) {
      console.error("DEBUG: Erro ao dar approve:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar o allowance do HypeToken para o contrato Funify
  const getAllowance = async () => {
    if (!account) {
      console.log("DEBUG: Nenhuma conta conectada para buscar allowance");
      return;
    }

    try {
      console.log("DEBUG: Buscando allowance para conta:", account);
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: publicClient,
      });

      const allowanceValue = await hypeTokenContract.read.allowance([
        account as `0x${string}`,
        deployedContracts.Funify.address as `0x${string}`,
      ]);

      console.log("DEBUG: Allowance encontrado:", allowanceValue);
      setAllowance(formatEther(allowanceValue as bigint));
      console.log("DEBUG: Allowance formatado:", formatEther(allowanceValue as bigint));
    } catch (error) {
      console.error("DEBUG: Erro ao buscar allowance:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
    }
  };

  // Função para buscar todos os hypeIds
  const getAllHypeIds = async () => {
    if (!account) {
      console.log("DEBUG: Nenhuma conta conectada para buscar hypeIds");
      return;
    }

    setLoading(true);
    try {
      console.log("DEBUG: Buscando todos os hypeIds");
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: publicClient,
      });

      const hypeIdsArray = await oracleContract.read.getAllHypeIds();
      console.log("DEBUG: HypeIds encontrados:", hypeIdsArray);
      
      // Converter bytes4 para string hex
      const formattedHypeIds = (hypeIdsArray as string[]).map(id => id);
      setHypeIds(formattedHypeIds);
      console.log("DEBUG: HypeIds formatados:", formattedHypeIds);
    } catch (error) {
      console.error("DEBUG: Erro ao buscar hypeIds:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      updateBalances(account);
      getAllowance();
      getAllHypeIds();
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interação com Contratos
          </h1>
          <p className="text-gray-600">
            Interaja com todos os contratos deployados na rede anvil
          </p>
        </div>

        {!account ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Conecte sua Carteira
              </h2>
              <p className="text-gray-600 mb-6">
                Para interagir com os contratos, você precisa conectar sua
                carteira primeiro.
              </p>
              <Button
                onClick={connectWallet}
                className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Conectar Carteira
              </Button>
            </div>
          </div>
        ) : (
          <>
            <WalletInfo
              account={account}
              balance={balance}
              hypeTokenBalance={hypeTokenBalance}
              onConnect={connectWallet}
            />

            <ContractTabs
              loading={loading}
              account={account}
              hypeId={hypeId}
              scheduledTime={scheduledTime}
              hypeA={hypeA}
              hypeB={hypeB}
              goalsA={goalsA}
              goalsB={goalsB}
              stakeAmount={stakeAmount}
              unstakeAmount={unstakeAmount}
              transferAmount={transferAmount}
              transferTo={transferTo}
              betAmount={betAmount}
              teamA={teamA}
              matchData={matchData}
              odds={odds}
              prizePools={prizePools}
              hypeTokenOwner={hypeTokenOwner}
              tokenInfo={tokenInfo}
              userBet={userBet}
              matchStats={matchStats}
              claimStatus={claimStatus}
              contractStats={contractStats}
              allowance={allowance}
              hypeIds={hypeIds}
              onHypeIdChange={setHypeId}
              onScheduledTimeChange={setScheduledTime}
              onHypeAChange={setHypeA}
              onHypeBChange={setHypeB}
              onGoalsAChange={setGoalsA}
              onGoalsBChange={setGoalsB}
              onStakeAmountChange={setStakeAmount}
              onUnstakeAmountChange={setUnstakeAmount}
              onTransferAmountChange={setTransferAmount}
              onTransferToChange={setTransferTo}
              onBetAmountChange={setBetAmount}
              onTeamAChange={setTeamA}
              onGetOwner={getHypeTokenOwner}
              onGetTokenInfo={getTokenInfo}
              onMint={mintTokens}
              onStake={stakeTokens}
              onUnstake={unstakeTokens}
              onTransfer={transferTokens}
              onGetMatchData={getMatchData}
              onGetHype={getHype}
              onGetMatch={getMatch}
              onMatchExists={matchExists}
              onScheduleMatch={scheduleMatch}
              onUpdateHype={updateHype}
              onOpenToBets={openToBets}
              onCloseBets={closeBets}
              onUpdateScore={updateScore}
              onFinishMatch={finishMatch}
              onGetOdds={getOdds}
              onGetPrizePools={getPrizePools}
              onPlaceBet={placeBet}
              onClaimPrize={claimPrize}
              onEmergencyWithdraw={emergencyWithdraw}
              onGetUserBet={getUserBet}
              onGetMatchStats={getMatchStats}
              onCheckClaimStatus={checkClaimStatus}
              onGetContractStats={getContractStats}
              onApproveHypeToken={approveHypeToken}
              onGetAllHypeIds={getAllHypeIds}
              hashtag={hashtag}
              teamAAbbreviation={teamAAbbreviation}
              teamBAbbreviation={teamBAbbreviation}
              onHashtagChange={setHashtag}
              onTeamAAbbreviationChange={setTeamAAbbreviation}
              onTeamBAbbreviationChange={setTeamBAbbreviation}
            />
          </>
        )}
      </div>
    </div>
  );
}
