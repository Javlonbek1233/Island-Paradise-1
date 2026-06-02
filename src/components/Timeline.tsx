/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/castlesData';
import { Calendar, Shield, Swords, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'siege' | 'construction' | 'dynasty' | 'secret'>('all');

  const filteredEvents = activeFilter === 'all' 
    ? TIMELINE_EVENTS 
    : TIMELINE_EVENTS.filter(e => e.category === activeFilter);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'siege':
        return <Swords className="w-4.5 h-4.5 text-red-500" />;
      case 'construction':
        return <BookOpen className="w-4.5 h-4.5 text-blue-400" />;
      case 'dynasty':
        return <Shield className="w-4.5 h-4.5 text-amber-500" />;
      default:
        return <Sparkles className="w-4.5 h-4.5 text-emerald-400" />;
    }
  };

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'siege':
        return 'border-red-500/30 text-red-400 bg-red-950/25';
      case 'construction':
        return 'border-blue-400/30 text-blue-300 bg-blue-950/25';
      case 'dynasty':
        return 'border-amber-500/30 text-amber-400 bg-amber-950/25';
      default:
        return 'border-emerald-400/30 text-emerald-400 bg-emerald-950/25';
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-zinc-950 p-6 shadow-2xl id_timeline_block">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Epoch Chronicles</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-amber-100 tracking-wide">
            Medieval Milestones
          </h2>
          <p className="text-xs text-zinc-400">
            A chronological timeline detailing siege tactics, dynastic shifts, and structural revolutions.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800" id="timeline-filters">
          {(['all', 'siege', 'construction', 'dynasty', 'secret'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-[11px] font-mono rounded-md uppercase tracking-wide transition-all ${
                activeFilter === filter
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
              id={`timeline-filter-${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Interactive Flow */}
      <div className="relative border-l border-zinc-800 ml-4 md:ml-32 py-4 space-y-8" id="events-flow-list">
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="relative group pl-6 md:pl-8" id={`timeline-event-${event.id}`}>
            
            {/* Absolute Year Display (Desktop left gutter layout) */}
            <div className="absolute hidden md:block -left-36 top-1.5 w-24 text-right">
              <span className="font-serif text-lg font-black text-amber-500/90 tracking-wide">
                {event.year} AD
              </span>
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                Chronicle
              </p>
            </div>

            {/* Connecting dot node */}
            <div className="absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-amber-500 flex items-center justify-center shadow-lg group-hover:bg-amber-500 transition-all duration-300">
              <div className="w-1 h-1 rounded-full bg-amber-200"></div>
            </div>

            {/* Main Event Card */}
            <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 p-5 hover:border-zinc-700 transition-all duration-300">
              {/* Top info and badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="md:hidden text-amber-400 font-serif font-black text-sm">
                    {event.year} AD — 
                  </span>
                  <h4 className="font-serif text-base font-bold text-amber-100 tracking-wide">
                    {event.eventName}
                  </h4>
                </div>

                <div className={`self-start px-2 py-0.5 rounded border text-[9px] font-mono flex items-center gap-1.5 uppercase tracking-wider ${getCategoryStyle(event.category)}`}>
                  {getCategoryIcon(event.category)}
                  {event.category}
                </div>
              </div>

              {/* Event Description */}
              <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3 pl-1">
                {event.description}
              </p>

              {/* Key figure citation */}
              <div className="flex items-center gap-2 pl-1 border-t border-zinc-900/80 pt-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Key Figure:</span>
                <span className="text-[11px] font-serif font-bold text-amber-200/90">
                  {event.keyFigure}
                </span>
              </div>
            </div>

          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-10">
            <p className="text-sm font-mono text-zinc-500">No milestone records fit this category.</p>
          </div>
        )}
      </div>

    </div>
  );
}
