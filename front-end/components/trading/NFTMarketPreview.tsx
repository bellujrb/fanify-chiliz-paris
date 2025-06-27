import React from 'react';
import { Nfc, ArrowRightLeft, Users, ShieldCheck, TrendingUp } from 'lucide-react';

const NFTMarketPreview: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-10 shadow-2xl border border-brand-100 flex flex-col items-center w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-tr from-brand-500 to-brand-600 p-4 rounded-full shadow-lg mb-4">
          <Nfc className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-brand-700 mb-2 text-center">Secondary Market</h2>
        <p className="text-brand-600 text-lg text-center max-w-2xl">
          Coming soon: every bet you place will generate a <span className="font-bold">unique NFT</span> that records:
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center mb-8">
        {/* NFT Card Visual */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white border-2 border-brand-200 rounded-2xl shadow-xl p-6 w-72 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow">Bet NFT</div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <TrendingUp className="w-8 h-8 text-brand-600 mb-2" />
              <div className="text-lg font-bold text-brand-700">PSG vs Real Madrid</div>
              <div className="flex gap-2 text-sm text-brand-500">
                <span className="bg-brand-50 px-2 py-1 rounded">Team: <b>PSG</b></span>
                <span className="bg-brand-50 px-2 py-1 rounded">Hype: <b>62</b></span>
              </div>
              <div className="text-sm text-gray-500 mt-2">Odds at the time: <span className="font-bold text-brand-600">1.4</span></div>
              <div className="text-xs text-gray-400 mt-4">#ID: 0xA1B2...C3D4</div>
            </div>
          </div>
        </div>
        {/* Explanation */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-600" />
            <span className="text-brand-700 font-semibold">Immutable Record</span>
          </div>
          <div className="text-gray-600 text-base ml-9">Your bet is registered on the blockchain as an NFT, ensuring authenticity and security.</div>
          <div className="flex items-center gap-3 mt-4">
            <ArrowRightLeft className="w-6 h-6 text-brand-600" />
            <span className="text-brand-700 font-semibold">Secondary Market</span>
          </div>
          <div className="text-gray-600 text-base ml-9">Trade your bets with other users at any time during the match.</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center mb-6">
        {/* Seller Card */}
        <div className="flex-1 bg-gradient-to-br from-brand-100 to-white border border-brand-200 rounded-2xl p-6 shadow text-center">
          <h3 className="font-semibold text-lg text-brand-700 mb-2 flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-brand-500" /> Seller's Advantage
          </h3>
          <p className="text-brand-600 mb-2">Receive a lower amount immediately, but eliminate the risk of the game turning and losing everything.</p>
          <button disabled className="mt-4 px-4 py-2 rounded bg-brand-200 text-brand-900 font-semibold opacity-60 cursor-not-allowed">Sell NFT (coming soon)</button>
        </div>
        {/* Buyer Card */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-6 shadow text-center">
          <h3 className="font-semibold text-lg text-blue-700 mb-2 flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-blue-400" /> Buyer's Advantage
          </h3>
          <p className="text-blue-700 mb-2">Take the risk and get the chance to:<br/>1. Enter after the match has started<br/>2. Buy a bet that is already favorable, if the result remains until the end.</p>
          <button disabled className="mt-4 px-4 py-2 rounded bg-blue-200 text-blue-900 font-semibold opacity-60 cursor-not-allowed">Buy NFT (coming soon)</button>
        </div>
      </div>
      <div className="mt-4 text-brand-400 text-sm text-center">* This feature is under development. Stay tuned!</div>
    </div>
  );
};

export default NFTMarketPreview; 