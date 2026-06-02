/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CASTLES_DATA } from '../data/castlesData';
import { Castle } from '../types';
import { Compass, Shield, MapPin, Sparkles, Navigation, Layers } from 'lucide-react';

interface InteractiveMapProps {
  selectedCastleId: string;
  onSelectCastle: (id: string) => void;
}

export default function InteractiveMap({ selectedCastleId, onSelectCastle }: InteractiveMapProps) {
  const [hoveredCastle, setHoveredCastle] = useState<Castle | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-zinc-950 p-6 shadow-2xl id_interactive_map_block">
      {/* Cinematic Map Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global Cartography Guild</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-amber-100 tracking-wide">
            Interactive Realm Map
          </h2>
          <p className="text-xs text-zinc-400">
            Select a coordinates beacon to focus the cinematic scanner and view historical timelines.
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-zinc-300">Active Beacon</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="text-zinc-500">Uncharted Guard</span>
          </div>
        </div>
      </div>

      {/* Medieval Map Grid Board */}
      <div className="relative w-full h-[380px] rounded-xl border border-zinc-800 bg-[#09090b] overflow-hidden flex items-center justify-center">
        
        {/* Procedural Grid Lines (Tactical Map aesthetic) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"></div>
        
        {/* Cinematic Map Accents */}
        <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-600 border border-zinc-900 px-2 py-1 select-none pointer-events-none">
          SYS_SECTOR: RED_SEA_04 // REG_N: 104.9
        </div>

        <div className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-600 text-right select-none pointer-events-none">
          LAT: 52° 12\' 18&quot; N <br />
          LON: 13° 24\' 15&quot; E
        </div>

        {/* Vintage Windrose Graphic in center-background */}
        <div className="absolute pointer-events-none opacity-5 w-72 h-72 rounded-full border-4 border-amber-500 flex items-center justify-center animate-[spin_100s_linear_infinite]">
          <Compass className="w-64 h-64 text-amber-500" />
        </div>

        {/* Continent Outlines represented as elegant ambient curves (Stylized Abstract Map) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Abstract landmass representation paths */}
          <path d="M 5 20 Q 20 15 35 30 T 60 10 T 80 40 T 95 30" fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="2" />
          <path d="M 10 50 Q 25 75 40 60 T 70 85 T 90 70" fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="3" />
          {/* Latitude lines */}
          <line x1="0" y1="30" x2="100" y2="30" stroke="#27272a" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#27272a" strokeWidth="0.5" />
          {/* Longitude lines */}
          <line x1="33" y1="0" x2="33" y2="100" stroke="#27272a" strokeWidth="0.5" />
          <line x1="66" y1="0" x2="66" y2="100" stroke="#27272a" strokeWidth="0.5" />
        </svg>

        {/* Dotted travel/military trade route lines between standard nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 38 34 Q 34 38 30 42" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3" />
          <path d="M 30 42 Q 38 45 47 48" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3" />
          <path d="M 47 48 Q 59 50 72 52" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3" />
          <path d="M 72 52 Q 81 57 90 62" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3" />
        </svg>

        {/* Render Castle Beacon Pins on Coordinates */}
        {CASTLES_DATA.map((castle) => {
          const isSelected = castle.id === selectedCastleId;
          return (
            <div
              key={castle.id}
              className="absolute"
              style={{ left: `${castle.mapX}%`, top: `${castle.mapY}%` }}
              id={`map-pin-container-${castle.id}`}
            >
              <button
                className="relative -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                onClick={() => onSelectCastle(castle.id)}
                onMouseEnter={() => setHoveredCastle(castle)}
                onMouseLeave={() => setHoveredCastle(null)}
                id={`map-pin-${castle.id}`}
              >
                {/* Expand pulsation rings when selected */}
                {isSelected && (
                  <>
                    <span className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping"></span>
                    <span className="absolute -inset-6 rounded-full bg-amber-500/10 animate-pulse"></span>
                  </>
                )}

                {/* Pin layout */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-500 border-amber-300 text-black scale-125 shadow-lg shadow-amber-500/30'
                      : 'bg-zinc-900 border-zinc-700 text-amber-500/90 group-hover:border-amber-400 group-hover:text-amber-400 group-hover:scale-110'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                </div>

                {/* Clean inline name tag */}
                <div className="absolute left-7 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-zinc-800 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 font-semibold tracking-wide whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                  {castle.name}
                </div>
              </button>
            </div>
          );
        })}

        {/* Pop-up Overlay for hovered Castle metadata */}
        <AnimatePresence>
          {hoveredCastle && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-zinc-950/95 border border-amber-500/30 p-4 rounded-lg backdrop-blur-md shadow-2xl pointer-events-none z-10"
              id="map-hover-details"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[9px] font-mono text-amber-400 uppercase tracking-widest mb-0.5">
                    {hoveredCastle.country}
                  </div>
                  <h4 className="font-serif text-base text-amber-100 font-bold">
                    {hoveredCastle.name}
                  </h4>
                </div>
                <div className="text-right text-[10px] font-mono text-zinc-500">
                  Est. {hoveredCastle.yearBuilt} AD
                </div>
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed font-sans mb-3 line-clamp-2">
                {hoveredCastle.description}
              </p>

              <div className="flex justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-900 pt-2.5">
                <div>Style: <span className="text-amber-400/90">{hoveredCastle.architecturalStyle}</span></div>
                <div className="text-amber-400 font-bold flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-amber-400" />
                  Explore
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
