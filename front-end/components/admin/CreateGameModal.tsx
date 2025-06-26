import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { createWalletClient, createPublicClient, custom, http, getContract } from 'viem';
import { anvil } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';

interface CreateGameModalProps {
  onGameCreated?: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ onGameCreated }) => {
  const [open, setOpen] = useState(false);
  const [hypeId, setHypeId] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Helper para converter data/hora para timestamp unix
  function toUnixTimestamp(dateStr: string) {
    if (!dateStr) return 0;
    // Espera formato yyyy-MM-ddTHH:mm (input type="datetime-local")
    return Math.floor(new Date(dateStr).getTime() / 1000);
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    console.log('DEBUG: Iniciando handleCreate...');
    
    if (!hypeId || !scheduledTime || !teamA || !teamB) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Verificar se ethereum está disponível
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask not found. Please install MetaMask.');
      return;
    }
    
    setLoading(true);
    try {
      console.log('DEBUG: Iniciando criação de jogo...');
      console.log('DEBUG: HypeId:', hypeId);
      console.log('DEBUG: ScheduledTime:', scheduledTime);
      console.log('DEBUG: TeamA:', teamA);
      console.log('DEBUG: TeamB:', teamB);
      
      // Pega conta conectada
      console.log('DEBUG: Solicitando contas...');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log('DEBUG: Conta conectada:', account);
      
      console.log('DEBUG: Criando wallet client...');
      const walletClient = createWalletClient({
        chain: anvil,
        transport: custom(window.ethereum as any),
      });
      
      console.log('DEBUG: Criando contrato Oracle...');
      console.log('DEBUG: Endereço do Oracle:', deployedContracts.Oracle.address);
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });
      
      console.log('DEBUG: Convertendo timestamp...');
      const unixTime = toUnixTimestamp(scheduledTime);
      console.log('DEBUG: Unix timestamp:', unixTime);
      console.log('DEBUG: BigInt timestamp:', BigInt(unixTime));
      
      console.log('DEBUG: Chamando scheduleMatch...');
      console.log('DEBUG: Parâmetros:', [hypeId as `0x${string}`, BigInt(unixTime), teamA, teamB]);
      
      // Chamada direta da função, igual ao web3/page.tsx
      const hash = await oracleContract.write.scheduleMatch([
        hypeId as `0x${string}`,
        BigInt(unixTime),
        teamA,
        teamB,
      ], { account: account as `0x${string}` });
      
      console.log('DEBUG: Transação enviada com sucesso! Hash:', hash);
      
      setSuccess(true);
      setHypeId('');
      setScheduledTime('');
      setTeamA('');
      setTeamB('');
      setOpen(false);
      if (onGameCreated) onGameCreated();
    } catch (err: any) {
      console.error('DEBUG: Erro detalhado:', err);
      console.error('DEBUG: Tipo do erro:', typeof err);
      console.error('DEBUG: Mensagem do erro:', err?.message);
      console.error('DEBUG: Stack trace:', err?.stack);
      
      let errorMessage = 'Error creating game';
      if (err?.message?.includes('User rejected')) {
        errorMessage = 'Transaction rejected by user.';
      } else if (err?.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for gas.';
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      console.log('DEBUG: Finalizando loading...');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">+ Create New Game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Game (Scheduled)</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule a new game on the smart contract.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hype ID (0x...)</label>
            <Input value={hypeId} onChange={e => setHypeId(e.target.value)} placeholder="0x1231412" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Game Date & Time</label>
            <div className="flex items-center gap-2">
              <Input
                type="datetime-local"
                value={scheduledTime}
                onChange={e => setScheduledTime(e.target.value)}
                required
              />
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Team A (Abbreviation)</label>
            <Input value={teamA} onChange={e => setTeamA(e.target.value)} placeholder="PSG" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Team B (Abbreviation)</label>
            <Input value={teamB} onChange={e => setTeamB(e.target.value)} placeholder="RMA" required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Game created successfully!</div>}
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Scheduling...' : 'Schedule Match'}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGameModal; 