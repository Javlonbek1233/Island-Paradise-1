/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KNIGHTS_DATA } from '../data/castlesData';
import { Knight } from '../types';
import { Shield, Award, Swords, Compass, CircleDot, Flame, Sparkles } from 'lucide-react';

export default function KnightEncyclopedia() {
  const [selectedKnightId, setSelectedKnightId] = useState<string>(KNIGHTS_DATA[0].id);
  const activeKnight = KNIGHTS_DATA.find(k => k.id === selectedKnightId) || KNIGHTS_DATA[0];

  return (
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-zinc-950 p-6 shadow-2xl id_knight_encyclopedia_block">
      
      {/* Display Headers */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Swords className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Imperial Archives Dossier</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-amber-100 tracking-wide">
          Knight Encyclopedia
        </h2>
        <p className="text-xs text-zinc-400">
          Unveil legendary champions and elite combatants who shaped the boundaries of medieval kingdoms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Selection list of Knights */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1 mb-1">
            Choose Champion
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2" id="knights-selector-list">
            {KNIGHTS_DATA.map((knight) => {
              const isSelected = knight.id === selectedKnightId;
              return (
                <button
                  key={knight.id}
                  onClick={() => setSelectedKnightId(knight.id)}
                  className={`group relative p-3 text-left rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 gold-glow'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                  id={`knight-btn-${knight.id}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold border ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                      : 'bg-zinc-950 border-zinc-700 text-zinc-500 group-hover:text-amber-400'
                  }`}>
                    {knight.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-serif text-[13px] font-bold tracking-wide truncate">
                      {knight.name}
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-500 truncate group-hover:text-zinc-400">
                      {knight.title}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick didactic box */}
          <div className="hidden lg:block mt-2 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed font-sans">
            <span className="text-amber-400 font-semibold font-serif">The Chivalric Code:</span> Knights vowed to safeguard the vulnerable, honor the crown, speak only truth, and face enemy swords with courage.
          </div>
        </div>

        {/* Right column: Immersive dossier panel */}
        <div className="lg:col-span-7 bg-zinc-900/30 rounded-xl border border-zinc-800/80 p-5 flex flex-col justify-between">
          
          {/* Top segment: Title and Crest */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-zinc-800 mb-4">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-300 uppercase tracking-widest">
                  {activeKnight.region}
                </span>
                <h3 className="font-serif text-xl font-bold text-amber-100 tracking-wide mt-1.5">
                  {activeKnight.name}
                </h3>
                <p className="text-xs font-mono text-zinc-500">
                  Allegiance: <span className="text-zinc-300">{activeKnight.allegiance}</span>
                </p>
              </div>

              {/* Visual mini-shield banner */}
              <div className={`p-2 rounded-lg border ${activeKnight.shieldColor} h-11 w-11 flex items-center justify-center font-bold text-amber-100 shadow-inner`}>
                <Shield className="w-5 h-5" />
              </div>
            </div>

            {/* Narrative Bio */}
            <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-5 italic">
              &ldquo;{activeKnight.bio}&rdquo;
            </p>

            {/* Signature Arsenal */}
            <div className="mb-5">
              <h5 className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <CircleDot className="w-3 h-3 text-amber-500 animate-pulse" />
Signature Arsenal
              </h5>
              <div className="flex flex-wrap gap-2">
                {activeKnight.weapons.map((weapon, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                  >
                    🗡️ {weapon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom segment: Combat metrics */}
          <div className="bg-zinc-950/80 p-4 rounded-lg border border-zinc-800">
            <h5 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Combat Power Indices
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="scores-meters">
              {Object.entries(activeKnight.stats).map(([statName, val]) => (
                <div key={statName} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="capitalize font-serif text-zinc-400">{statName}</span>
                    <span className="font-mono text-amber-400 font-bold">{val}%</span>
                  </div>
                  {/* Outer meter */}
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    {/* Inner meter filled */}
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
