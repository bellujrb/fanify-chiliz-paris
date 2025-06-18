'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelBody,
  FloatingPanelButton
} from '@/components/ui/floating-panel';
import { ChevronDown, Plus, Check } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface Athlete {
  id: string;
  name: string;
  sport: string;
  team: string;
  fanTokenSymbol: string;
  fanTokenPrice: string;
  fanTokenChange: string;
  avatar: string;
  myTokens: number;
  myRank: number;
  isOwned?: boolean;
}

interface AthleteSelectorProps {
  athletes: Athlete[];
  selectedAthlete: string;
  onSelectAthlete: (athleteId: string) => void;
}

const AthleteSelector: React.FC<AthleteSelectorProps> = ({
  athletes,
  selectedAthlete,
  onSelectAthlete
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAthleteToAdd, setSelectedAthleteToAdd] = useState<Athlete | null>(null);

  // Athletes that the user owns (initially only Neymar)
  const ownedAthletes = athletes.filter(athlete => athlete.id === 'neymar');

  // Athletes available to add
  const availableAthletes = athletes.filter(athlete => athlete.id !== 'neymar');

  const currentAthlete = ownedAthletes.find(a => a.id === selectedAthlete) || ownedAthletes[0];

  const handleAddAthlete = (athlete: Athlete) => {
    setSelectedAthleteToAdd(athlete);
    setShowAddModal(true);
  };

  const confirmAddAthlete = () => {
    if (selectedAthleteToAdd) {
      // Aqui você adicionaria a lógica para adicionar o atleta à carteira
      console.log(`Adding ${selectedAthleteToAdd.name} to wallet`);
      setShowAddModal(false);
      setSelectedAthleteToAdd(null);
    }
  };

  // Função para gerar o @ do atleta
  const getAthleteUsername = (athlete: Athlete) => {
    switch (athlete.id) {
      case 'neymar':
        return '@neymarjr';
      case 'messi':
        return '@leomessi';
      case 'lebron':
        return '@kingjames';
      default:
        return `@${athlete.name.toLowerCase().replace(' ', '')}`;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900">My Athletes</h2>
          {/* Floating Panel Selector restored here */}
          <FloatingPanelRoot>
            <FloatingPanelTrigger
              title="Select Athlete"
              className="flex items-center space-x-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500/40 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="text-left">
                <div className="text-sm text-gray-600">{getAthleteUsername(currentAthlete)}</div>
              </div>
            </FloatingPanelTrigger>
            <FloatingPanelContent className="w-80">
              <FloatingPanelBody>
                <div className="space-y-2">
                  {/* Owned Athletes */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">My Athletes</h4>
                    {ownedAthletes.map((athlete) => (
                      <FloatingPanelButton
                        key={athlete.id}
                        onClick={() => onSelectAthlete(athlete.id)}
                        className={`w-full p-3 rounded-xl transition-all duration-200 ${selectedAthlete === athlete.id
                            ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
                            : 'hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-red-600 rounded-xl flex items-center justify-center text-white">
                            {athlete.avatar}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{athlete.name}</div>
                            <div className="text-sm text-gray-600">{getAthleteUsername(athlete)} • {athlete.sport}</div>
                          </div>
                          {selectedAthlete === athlete.id && (
                            <Check className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                      </FloatingPanelButton>
                    ))}
                  </div>
                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>
                  {/* Available Athletes */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Add Athlete</h4>
                    {availableAthletes.map((athlete) => (
                      <FloatingPanelButton
                        key={athlete.id}
                        onClick={() => handleAddAthlete(athlete)}
                        className="w-full p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center text-white opacity-60">
                            {athlete.avatar}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{athlete.name}</div>
                            <div className="text-sm text-gray-600">{getAthleteUsername(athlete)} • {athlete.sport}</div>
                          </div>
                          <Plus className="w-4 h-4 text-gray-400" />
                        </div>
                      </FloatingPanelButton>
                    ))}
                  </div>
                </div>
              </FloatingPanelBody>
            </FloatingPanelContent>
          </FloatingPanelRoot>
        </div>
        {/* Space here */}
      </div>

      {/* Modal de Confirmação */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              Add to Wallet
            </DialogTitle>
          </DialogHeader>

          {selectedAthleteToAdd && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                  {selectedAthleteToAdd.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedAthleteToAdd.name}</h3>
                  <p className="text-gray-600">{getAthleteUsername(selectedAthleteToAdd)} • {selectedAthleteToAdd.sport}</p>
                </div>
              </div>

              <div className="bg-white border border-purple-200/50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What you get:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Access to points and ranking system</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">Possibility to earn Fan Tokens</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Exclusive NFTs and monthly rewards</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmAddAthlete}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white"
                >
                  Add to Wallet
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AthleteSelector;