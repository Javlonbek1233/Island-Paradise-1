/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CASTLES_DATA } from './data/castlesData';
import ThreeTour from './components/ThreeTour';
import InteractiveMap from './components/InteractiveMap';
import KnightEncyclopedia from './components/KnightEncyclopedia';
import Timeline from './components/Timeline';
import BookingSystem from './components/BookingSystem';
import TreasureQuestView from './components/TreasureQuest';
import { 
  ShieldAlert, 
  Map, 
  Swords, 
  Calendar, 
  Sparkles, 
  Gem, 
  Compass, 
  Clock, 
  Anchor, 
  Heart, 
  BookOpen, 
  ChevronRight, 
  User, 
  Info 
} from 'lucide-react';

export default function App() {
  const [selectedCastleId, setSelectedCastleId] = useState<string>('bran');
  const [activeTab, setActiveTab] = useState<'explore' | 'map' | 'knights' | 'quests' | 'booking'>('explore');

  const selectedCastle = CASTLES_DATA.find(c => c.id === selectedCastleId) || CASTLES_DATA[0];

  const handleBookCastle = (castleId: string) => {
    setSelectedCastleId(castleId);
    setActiveTab('booking');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black pb-16 id_main_portal_root relative overflow-hidden">
      
      {/* Editorial Cinematic Map Light Leak Backsplash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-0 right-0 w-[80%] h-[700px] opacity-35 mix-blend-screen" 
             style={{ backgroundImage: 'radial-gradient(circle at 75% 20%, #2a221a 0%, transparent 65%)' }}></div>
        <div className="absolute top-[350px] left-[-200px] w-[500px] h-[500px] opacity-15 mix-blend-screen"
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)' }}></div>
      </div>

      {/* Symmetric Vertical Rail Labels from Editorial Design Spec */}
      <div className="fixed right-6 top-[40%] -translate-y-1/2 hidden xl:flex items-center gap-4 rotate-90 origin-right z-30 select-none pointer-events-none opacity-40">
        <div className="h-px w-20 bg-amber-500/30"></div>
        <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 font-sans font-light whitespace-nowrap">CastleVerse Exploration Protocol v4.5</span>
      </div>

      <div className="fixed left-6 top-[40%] -translate-y-1/2 hidden xl:flex items-center gap-4 -rotate-90 origin-left z-30 select-none pointer-events-none opacity-40">
        <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 font-sans font-light whitespace-nowrap">Sovereign Historical Archives</span>
        <div className="h-px w-20 bg-amber-500/30"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        
        {/* CINEMATIC DOCUMENTARY HEADER */}
        <header className="border-b border-amber-500/20 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-mono text-amber-500 tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              Sovereign Digital Expedition
            </div>
            <h1 className="font-serif tracking-[0.2em] font-black italic gold-gradient-text text-3xl sm:text-4xl select-none uppercase">
              CastleVerse
            </h1>
            <p className="text-xs text-zinc-400 font-mono tracking-wide">
              Documentary Annals & Interactive Reliquary Archive
            </p>
          </div>

          {/* Active stats badge right side */}
          <div className="flex gap-4 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/80 text-[11px] font-mono select-none">
            <div className="text-center sm:text-left">
              <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Unveiled Realms</span>
              <span className="font-serif font-bold text-amber-300">5 Citadels</span>
            </div>
            <div className="w-px h-8 bg-zinc-800"></div>
            <div className="text-center sm:text-left">
              <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Historical System</span>
              <span className="font-bold text-amber-400">1066 - 1886 AD</span>
            </div>
          </div>
        </header>

        {/* METRO HUD NAVIGATION MENU TABS */}
        <nav className="flex flex-wrap gap-1.5 p-1 bg-zinc-950/90 rounded-2xl border border-zinc-900 mb-8 sticky top-4 z-40 backdrop-blur-md shadow-2xl overflow-x-auto" id="main-navigation">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 sm:flex-none py-3 px-5 text-left rounded-xl transition-all font-serif flex items-center justify-center sm:justify-start gap-2.5 text-xs uppercase tracking-widest border font-semibold min-w-[130px] ${
              activeTab === 'explore'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 gold-glow'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
            id="nav-tab-explore"
          >
            <Compass className="w-4 h-4 shrink-0" />
            Exploration Hub
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 sm:flex-none py-3 px-5 text-left rounded-xl transition-all font-serif flex items-center justify-center sm:justify-start gap-2.5 text-xs uppercase tracking-widest border font-semibold min-w-[130px] ${
              activeTab === 'map'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 gold-glow'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
            id="nav-tab-map"
          >
            <Map className="w-4 h-4 shrink-0" />
            Interactive Map
          </button>

          <button
            onClick={() => setActiveTab('knights')}
            className={`flex-1 sm:flex-none py-3 px-5 text-left rounded-xl transition-all font-serif flex items-center justify-center sm:justify-start gap-2.5 text-xs uppercase tracking-widest border font-semibold min-w-[130px] ${
              activeTab === 'knights'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 gold-glow'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
            id="nav-tab-knights"
          >
            <Swords className="w-4 h-4 shrink-0" />
            Knight Archives
          </button>

          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 sm:flex-none py-3 px-5 text-left rounded-xl transition-all font-serif flex items-center justify-center sm:justify-start gap-2.5 text-xs uppercase tracking-widest border font-semibold min-w-[130px] ${
              activeTab === 'quests'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 gold-glow'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
            id="nav-tab-quests"
          >
            <Gem className="w-4 h-4 shrink-0 text-amber-500" />
            Treasure Vaults
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className={`flex-1 sm:flex-none py-3 px-5 text-left rounded-xl transition-all font-serif flex items-center justify-center sm:justify-start gap-2.5 text-xs uppercase tracking-widest border font-semibold min-w-[130px] ${
              activeTab === 'booking'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 gold-glow'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
            id="nav-tab-booking"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            Sanctuary Booking
          </button>
        </nav>

        {/* COMPONENT ROUTER VIEWS */}
        <main className="relative min-h-[500px]">
          
          {/* VIEW 1: EXPLORATION HUB */}
          {activeTab === 'explore' && (
            <div className="space-y-8" id="explore-view-section">
              
              {/* Castle Selection Slides Card Grid */}
              <div className="space-y-3">
                <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">
                  Legendary Sovereignties (Select to explore)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3" id="castles-carousel">
                  {CASTLES_DATA.map((castle) => {
                    const isActive = castle.id === selectedCastleId;
                    return (
                      <button
                        key={castle.id}
                        onClick={() => setSelectedCastleId(castle.id)}
                        className={`group relative h-28 sm:h-36 rounded-xl overflow-hidden text-left border transition-all duration-300 transform ${
                          isActive
                            ? 'border-amber-500 ring-2 ring-amber-500/10 scale-[1.02] shadow-xl'
                            : 'border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100 hover:scale-[1.01]'
                        }`}
                        id={`castle-card-${castle.id}`}
                      >
                        {/* Img cover */}
                        <img
                          src={castle.image}
                          alt={castle.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Shadow mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/30"></div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                          <span className="text-[8px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                            {castle.country}
                          </span>
                          <h4 className="font-serif text-[11px] sm:text-[13px] font-black text-amber-100 tracking-wide line-clamp-1">
                            {castle.name}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIVE CASTLE IMMERSIVE SHOWCASE SHEET */}
              <div className="gold-border rounded-2xl overflow-hidden bg-zinc-950/90 shadow-2xl relative" id="active-castle-sheet">
                
                {/* Hero Backsplash Banner */}
                <div className="relative h-[250px] sm:h-[350px] overflow-hidden">
                  <img
                    src={selectedCastle.bannerImage}
                    alt={selectedCastle.name}
                    className="w-full h-full object-cover object-center opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

                  {/* Overlaid Title metadata */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-[9px] font-mono font-bold uppercase tracking-wider">
                        {selectedCastle.status}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                        Est. {selectedCastle.yearBuilt} AD
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-5xl font-black text-amber-500 tracking-wide gold-glow uppercase">
                      {selectedCastle.name}
                    </h2>

                    <p className="font-serif text-xs sm:text-sm text-zinc-300 italic max-w-2xl font-semibold pl-1 leading-normal">
                      &ldquo;{selectedCastle.narrativeTone}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Grid stats & details section */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-zinc-900">
                  
                  {/* Left Column: Abstract summary, stats lists */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-1.5 border-b border-zinc-900 pb-4">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-500" />
                        Citadel Dossier
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {selectedCastle.description}
                      </p>
                    </div>

                    {/* Architectural Style */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Structural design</span>
                      <span className="font-serif text-xs font-bold text-amber-200 block">{selectedCastle.architecturalStyle}</span>
                    </div>

                    {/* Geomorphic Location */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Location</span>
                      <span className="text-xs font-serif text-zinc-300 block">📍 {selectedCastle.location}, {selectedCastle.country}</span>
                    </div>

                    {/* Dynamic features listing checklist */}
                    <div className="space-y-2 pb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Key Tactical Defenses</span>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedCastle.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="p-2 rounded bg-zinc-900/60 border border-zinc-900 text-[10px] font-mono font-bold text-zinc-400"
                          >
                            🏰 {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action button triggers staying reservation stay */}
                    <button
                      onClick={() => handleBookCastle(selectedCastle.id)}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-serif font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/10 hover:scale-[1.01]"
                      id="btn-book-citadel"
                    >
                      📜 Reserve Sanctuary Stay
                    </button>
                  </div>

                  {/* Right Column: Immersive 3D Tour and stories */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <h3 className="font-serif text-base text-amber-100 font-bold mb-3 flex items-center gap-2">
                        <Gem className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                        Embark on a Tactical 3D Tour
                      </h3>
                      {/* Mount our procedurally complete Three.js castle landscape */}
                      <ThreeTour castleId={selectedCastle.id} />
                    </div>

                    {/* Epic Scroll book narrative of history */}
                    <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
                        <BookOpen className="w-4.5 h-4.5 text-amber-500" />
                        <h4 className="font-serif text-base font-bold text-amber-100 tracking-wide">
                          Historical Chronicle Literature
                        </h4>
                      </div>

                      <div className="space-y-4 text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans max-h-[220px] overflow-y-auto pr-2">
                        <p className="font-serif text-sm font-semibold text-amber-200">
                          {selectedCastle.storySummary}
                        </p>
                        {selectedCastle.fullStory.map((para, pIdx) => (
                          <p key={pIdx} className="indent-4">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* VIEW 2: MAP & TIMELINES */}
          {activeTab === 'map' && (
            <div className="space-y-10" id="map-timeline-view-section">
              <InteractiveMap 
                selectedCastleId={selectedCastleId} 
                onSelectCastle={(id) => {
                  setSelectedCastleId(id);
                  // Trigger transition explore view inside state
                  setActiveTab('explore');
                }} 
              />
              <Timeline />
            </div>
          )}

          {/* VIEW 3: KNIGHT ENCYCLOPEDIA */}
          {activeTab === 'knights' && (
            <div id="knights-view-section">
              <KnightEncyclopedia />
            </div>
          )}

          {/* VIEW 4: TREASURE QUESTS */}
          {activeTab === 'quests' && (
            <div id="quests-view-section">
              <TreasureQuestView />
            </div>
          )}

          {/* VIEW 5: RESERVATORY BOOKING */}
          {activeTab === 'booking' && (
            <div id="bookings-view-section">
              <BookingSystem initialCastleId={selectedCastleId} />
            </div>
          )}

        </main>

        {/* METEO BRUTALIST GRID FOOTER DECREES */}
        <footer className="mt-16 border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 select-none">
          <p>© {new Date().getFullYear()} CastleVerse. Recorded in digital ink by Google AI Studio.</p>
          <div className="flex gap-4">
            <span>Sovereign Security Sealed</span>
            <span>Estuary Code: C_V_V2</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
