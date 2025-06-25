"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  createPublicClient,
  http,
  parseEther,
  formatEther,
  createWalletClient,
  custom,
  getContract,
} from "viem";
import { anvil } from "viem/chains";
import deployedContracts from "@/lib/deployedContracts";
import { getStatusText } from "@/lib/utils";
import WalletInfo from "@/components/web3/WalletInfo";
import ContractTabs from "@/components/web3/ContractTabs";
import { Button } from "@/components/ui/button";

// Configuração do cliente público
const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
});

// Configuração do cliente de carteira
const walletClient = createWalletClient({
  chain: anvil,
  transport: custom(window.ethereum as any),
});

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
  const { toast } = useToast();

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
        toast({
          title: "Erro",
          description: "MetaMask não encontrado!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("DEBUG: Erro ao conectar carteira:", error);
      console.error("DEBUG: Tipo do erro:", typeof error);
      console.error(
        "DEBUG: Mensagem do erro:",
        error instanceof Error ? error.message : error
      );
      toast({
        title: "Erro",
        description: "Falha ao conectar carteira",
        variant: "destructive",
      });
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
      toast({
        title: "Erro",
        description: "Conecte sua carteira primeiro",
        variant: "destructive",
      });
      return;
    }

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
      toast({
        title: "🎉 Tokens Mintados!",
        description: `1000 HYPE tokens foram mintados para ${account.slice(
          0,
          6
        )}...${account.slice(-4)}`,
      });

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
      toast({
        title: "❌ Erro ao Mintar",
        description:
          "Falha ao mintar tokens. Verifique se você é o owner do contrato.",
        variant: "destructive",
      });
    } finally {
      console.log("DEBUG: Definindo loading como false");
      setLoading(false);
    }
  };

  const stakeTokens = async () => {
    if (!account || !stakeAmount) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um valor para stake",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "💰 Stake Realizado!",
        description: `${stakeAmount} CHZ foram stakados. Hash: ${hash.slice(
          0,
          10
        )}...`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao stakar tokens:", error);
      toast({
        title: "❌ Erro no Stake",
        description: "Falha ao stakar tokens. Verifique seu saldo de CHZ.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const unstakeTokens = async () => {
    if (!account || !unstakeAmount) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um valor para unstake",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "🔄 Unstake Realizado!",
        description: `${unstakeAmount} HYPE foram unstakados. Hash: ${hash.slice(
          0,
          10
        )}...`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao unstakar tokens:", error);
      toast({
        title: "❌ Erro no Unstake",
        description:
          "Falha ao unstakar tokens. Verifique seu saldo de HYPE stakado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const transferTokens = async () => {
    if (!account || !transferTo || !transferAmount) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Preencha todos os campos para transferir",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "📤 Transferência Realizada!",
        description: `${transferAmount} HYPE transferidos para ${transferTo.slice(
          0,
          6
        )}...${transferTo.slice(-4)}`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao transferir tokens:", error);
      toast({
        title: "❌ Erro na Transferência",
        description:
          "Falha ao transferir tokens. Verifique seu saldo e o endereço de destino.",
        variant: "destructive",
      });
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

      toast({
        title: "Sucesso",
        description: `Owner: ${owner}`,
      });
    } catch (error) {
      console.error("Erro ao buscar owner:", error);
      toast({
        title: "Erro",
        description: "Falha ao buscar owner",
        variant: "destructive",
      });
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

      toast({
        title: "Sucesso",
        description: `Token: ${name} (${symbol}) - Total Supply: ${formatEther(
          totalSupply as bigint
        )}`,
      });
    } catch (error) {
      console.error("Erro ao buscar informações do token:", error);
      toast({
        title: "Erro",
        description: "Falha ao buscar informações do token",
        variant: "destructive",
      });
    }
  };

  // Funções do Oracle Refatorado
  const getMatchData = async () => {
    if (!hypeId) {
      toast({
        title: "❌ Hype ID Obrigatório",
        description: "Insira um Hype ID para buscar dados do match",
        variant: "destructive",
      });
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
        console.log("DEBUG: matchHypes funcionou, dados:", data);
      }
      
      console.log("DEBUG: Dados retornados pelo contrato:", data);
      
      // Interpretar os dados corretamente baseado na estrutura do contrato
      const [hypeA, hypeB, goalsA, goalsB, start, end, scheduledTime, status] = data;
      
      console.log("DEBUG: Dados interpretados:", {
        hypeA: hypeA.toString(),
        hypeB: hypeB.toString(),
        goalsA: goalsA.toString(),
        goalsB: goalsB.toString(),
        start: start.toString(),
        end: end.toString(),
        scheduledTime: scheduledTime.toString(),
        status: status.toString(),
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
      });

      toast({
        title: "📊 Dados do Match Carregados",
        description: `Match ${hypeId} - Hype A: ${hypeA}, Hype B: ${hypeB}, Status: ${getStatusText(status.toString())}`,
      });
    } catch (error) {
      console.error("Erro ao buscar dados do match:", error);
      toast({
        title: "❌ Erro ao Buscar Match",
        description: "Falha ao buscar dados do match. Verifique o Hype ID.",
        variant: "destructive",
      });
    }
  };

  const getHype = async () => {
    if (!hypeId) {
      toast({
        title: "❌ Hype ID Obrigatório",
        description: "Insira um Hype ID para buscar hype",
        variant: "destructive",
      });
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

      toast({
        title: "🔥 Hype Carregado",
        description: `Hype A: ${hypeA}, Hype B: ${hypeB}, Status: ${getStatusText(status.toString())}`,
      });
    } catch (error) {
      console.error("Erro ao buscar hype:", error);
      toast({
        title: "❌ Erro ao Buscar Hype",
        description: "Falha ao buscar hype. Verifique o Hype ID.",
        variant: "destructive",
      });
    }
  };

  const getMatch = async () => {
    // Usar getMatchData como fallback já que getMatch não existe no ABI atual
    await getMatchData();
  };

  const matchExists = async () => {
    if (!hypeId) {
      toast({
        title: "❌ Hype ID Obrigatório",
        description: "Insira um Hype ID para verificar existência",
        variant: "destructive",
      });
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

      toast({
        title: exists ? "✅ Match Existe" : "❌ Match Não Existe",
        description: `Match ${hypeId}: ${
          exists ? "Encontrado" : "Não encontrado"
        }`,
      });
    } catch (error) {
      console.error("Erro ao verificar existência do match:", error);
      toast({
        title: "❌ Erro ao Verificar",
        description: "Falha ao verificar existência do match.",
        variant: "destructive",
      });
    }
  };

  // Etapa 0: Criar Jogo
  const scheduleMatch = async () => {
    if (!account || !hypeId || !scheduledTime) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Preencha todos os campos para criar o match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });

      const hash = await oracleContract.write.scheduleMatch(
        [hypeId as `0x${string}`, BigInt(scheduledTime)],
        {
          account: account as `0x${string}`,
        }
      );

      toast({
        title: "📅 Match Criado!",
        description: `Match ${hypeId} agendado com sucesso`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao criar match:", error);
      toast({
        title: "❌ Erro ao Criar Match",
        description: "Falha ao criar match. Verifique os parâmetros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Etapa 1: Alimentar com Hype
  const updateHype = async () => {
    if (!account || !hypeId || !hypeA || !hypeB) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Preencha todos os campos para atualizar hype",
        variant: "destructive",
      });
      return;
    }

    if (Number(hypeA) + Number(hypeB) !== 100) {
      toast({
        title: "❌ Hype Inválido",
        description: "Hype A + Hype B deve ser igual a 100",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "📈 Hype Atualizado!",
        description: `Hype A: ${hypeA}%, Hype B: ${hypeB}% para match ${hypeId}`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao atualizar hype:", error);
      toast({
        title: "❌ Erro ao Atualizar Hype",
        description: "Falha ao atualizar hype. Verifique as permissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Etapa 2: Abrir para Apostas
  const openToBets = async () => {
    if (!account || !hypeId) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um Hype ID",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "🎲 Apostas Abertas!",
        description: `Match ${hypeId} aberto para apostas`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao abrir apostas:", error);
      toast({
        title: "❌ Erro ao Abrir Apostas",
        description: "Falha ao abrir apostas. Verifique as permissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Etapa 3: Fechar Apostas
  const closeBets = async () => {
    if (!account || !hypeId) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um Hype ID",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "🔒 Apostas Fechadas!",
        description: `Match ${hypeId} fechado para apostas`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao fechar apostas:", error);
      toast({
        title: "❌ Erro ao Fechar Apostas",
        description: "Falha ao fechar apostas. Verifique as permissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Etapa 4: Atualizar Placar
  const updateScore = async () => {
    if (!account || !hypeId || !goalsA || !goalsB) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Preencha todos os campos para atualizar placar",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "⚽ Placar Atualizado!",
        description: `Resultado: ${goalsA}x${goalsB} para match ${hypeId}`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao atualizar placar:", error);
      toast({
        title: "❌ Erro ao Atualizar Placar",
        description: "Falha ao atualizar placar. Verifique as permissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Etapa 5: Finalizar Jogo
  const finishMatch = async () => {
    if (!account || !hypeId) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um Hype ID",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "🏁 Jogo Finalizado!",
        description: `Match ${hypeId} finalizado com sucesso`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao finalizar jogo:", error);
      toast({
        title: "❌ Erro ao Finalizar Jogo",
        description: "Falha ao finalizar jogo. Verifique as permissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Funções do Funify
  const getOdds = async () => {
    if (!hypeId) {
      toast({
        title: "Erro",
        description: "Insira um Hype ID",
        variant: "destructive",
      });
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

      toast({
        title: "Sucesso",
        description: "Odds carregadas",
      });
    } catch (error) {
      console.error("Erro ao buscar odds:", error);
      toast({
        title: "Erro",
        description: "Falha ao buscar odds",
        variant: "destructive",
      });
    }
  };

  const getPrizePools = async () => {
    if (!hypeId) {
      toast({
        title: "Erro",
        description: "Insira um Hype ID",
        variant: "destructive",
      });
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

      toast({
        title: "Sucesso",
        description: "Prize pools carregadas",
      });
    } catch (error) {
      console.error("Erro ao buscar prize pools:", error);
      toast({
        title: "Erro",
        description: "Falha ao buscar prize pools",
        variant: "destructive",
      });
    }
  };

  const placeBet = async () => {
    if (!account || !hypeId || !betAmount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "Sucesso",
        description: `Aposta realizada! Hash: ${hash}`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao fazer aposta:", error);
      toast({
        title: "Erro",
        description: "Falha ao fazer aposta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const claimPrize = async () => {
    if (!account || !hypeId) {
      toast({
        title: "Erro",
        description: "Conecte sua carteira e insira um Hype ID",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "Sucesso",
        description: `Prêmio reclamado! Hash: ${hash}`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao reclamar prêmio:", error);
      toast({
        title: "Erro",
        description: "Falha ao reclamar prêmio",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Funções adicionais do Funify
  const getUserBet = async () => {
    if (!account || !hypeId) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um Hype ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: publicClient,
      });

      const data = await funifyContract.read.getUserBet([
        hypeId as `0x${string}`,
        account as `0x${string}`,
      ]);

      setUserBet({
        amount: formatEther(data[0]),
        teamA: data[1],
      });

      toast({
        title: "📊 Aposta do Usuário",
        description: `Valor: ${formatEther(data[0])} HYPE, Time: ${data[1] ? 'A' : 'B'}`,
      });
    } catch (error) {
      console.error("Erro ao buscar aposta do usuário:", error);
      toast({
        title: "❌ Erro ao Buscar Aposta",
        description: "Falha ao buscar aposta do usuário.",
        variant: "destructive",
      });
    }
  };

  const getMatchStats = async () => {
    if (!hypeId) {
      toast({
        title: "❌ Hype ID Obrigatório",
        description: "Insira um Hype ID para buscar estatísticas",
        variant: "destructive",
      });
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

      toast({
        title: "📈 Estatísticas do Match",
        description: `Total Pool: ${formatEther(data[2])} HYPE`,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas do match:", error);
      toast({
        title: "❌ Erro ao Buscar Estatísticas",
        description: "Falha ao buscar estatísticas do match.",
        variant: "destructive",
      });
    }
  };

  const checkClaimStatus = async () => {
    if (!account || !hypeId) {
      toast({
        title: "❌ Campos Obrigatórios",
        description: "Conecte sua carteira e insira um Hype ID",
        variant: "destructive",
      });
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

      toast({
        title: data[0] ? "✅ Pode Reclamar" : "❌ Não Pode Reclamar",
        description: data[1],
      });
    } catch (error) {
      console.error("Erro ao verificar status de claim:", error);
      toast({
        title: "❌ Erro ao Verificar",
        description: "Falha ao verificar status de claim.",
        variant: "destructive",
      });
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

      toast({
        title: "📊 Estatísticas do Contrato",
        description: `Total Matches: ${data[0]}, Total Bets: ${data[1]}`,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas do contrato:", error);
      toast({
        title: "❌ Erro ao Buscar Estatísticas",
        description: "Falha ao buscar estatísticas do contrato.",
        variant: "destructive",
      });
    }
  };

  const emergencyWithdraw = async () => {
    if (!account) {
      toast({
        title: "❌ Carteira Necessária",
        description: "Conecte sua carteira primeiro",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "🚨 Emergency Withdraw Realizado!",
        description: `Emergency withdraw executado. Hash: ${hash.slice(
          0,
          10
        )}...`,
      });

      await updateBalances(account);
    } catch (error) {
      console.error("Erro ao fazer emergency withdraw:", error);
      toast({
        title: "❌ Erro no Emergency Withdraw",
        description:
          "Falha ao fazer emergency withdraw. Verifique as permissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      updateBalances(account);
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
            />
          </>
        )}
      </div>
    </div>
  );
}
