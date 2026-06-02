/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CASTLES_DATA } from '../data/castlesData';
import { Booking, RoomOption, Castle } from '../types';
import { Calendar, User, Mail, Sparkles, Receipt, CheckCircle, Shield, Award, Trash } from 'lucide-react';

interface BookingSystemProps {
  initialCastleId?: string;
}

export default function BookingSystem({ initialCastleId }: BookingSystemProps) {
  // Load initial castle
  const [selectedCastleId, setSelectedCastleId] = useState<string>(initialCastleId || CASTLES_DATA[0].id);
  const selectedCastle = CASTLES_DATA.find(c => c.id === selectedCastleId) || CASTLES_DATA[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(selectedCastle.roomOptions[0]?.id || '');
  const selectedRoom = selectedCastle.roomOptions.find(r => r.id === selectedRoomId) || selectedCastle.roomOptions[0];

  // Form Fields
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('2026-07-15');
  const [checkOut, setCheckOut] = useState<string>('2026-07-20');
  const [guests, setGuests] = useState<number>(2);
  const [banquetUpgrade, setBanquetUpgrade] = useState<boolean>(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // List of active bookings
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [currentBookingCertificate, setCurrentBookingCertificate] = useState<Booking | null>(null);

  // Extras configuration
  const extrasList = [
    { id: 'jester', name: 'Royal Court Jester Concert', price: 150 },
    { id: 'archery', name: 'Master-Level Archery Tutorial', price: 200 },
    { id: 'guard', name: 'Private Knight-Guardian Escort', price: 350 },
  ];

  // Synchronize room when castle changes
  useEffect(() => {
    if (selectedCastle.roomOptions.length > 0) {
      setSelectedRoomId(selectedCastle.roomOptions[0].id);
    }
  }, [selectedCastleId]);

  // Load existing bookings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('castleverse_bookings');
    if (saved) {
      try {
        setBookingsList(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleExtraToggle = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(prev => prev.filter(item => item !== id));
    } else {
      setSelectedExtras(prev => [...prev, id]);
    }
  };

  // Pricing math
  const days = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) || 1;
  const roomCost = (selectedRoom?.pricePerNight || 300) * days;
  const banquetCost = banquetUpgrade ? 120 * guests * days : 0;
  const extrasCost = selectedExtras.reduce((sum, extraId) => {
    const extra = extrasList.find(e => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);
  const grandTotal = roomCost + banquetCost + extrasCost;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      setFormError('Kindly declare your name and electronic pigeon address.');
      return;
    }
    setFormError('');

    const newBooking: Booking = {
      id: 'book-' + Date.now(),
      castleId: selectedCastle.id,
      castleName: selectedCastle.name,
      roomOptionId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      guests,
      totalAmount: grandTotal,
      userName,
      userEmail,
      banquetUpgrade,
      extraOptions: selectedExtras,
      bookingDate: new Date().toISOString().split('T')[0]
    };

    const updated = [newBooking, ...bookingsList];
    setBookingsList(updated);
    localStorage.setItem('castleverse_bookings', JSON.stringify(updated));
    setCurrentBookingCertificate(newBooking);

    // Reset extras
    setSelectedExtras([]);
    setBanquetUpgrade(false);
  };

  const handleDeleteBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = bookingsList.filter(b => b.id !== id);
    setBookingsList(filtered);
    localStorage.setItem('castleverse_bookings', JSON.stringify(filtered));
    if (currentBookingCertificate?.id === id) {
      setCurrentBookingCertificate(null);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-zinc-950 p-6 shadow-2xl id_booking_system_block" id="booking-system-root">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Royal Quartermasters Lodging Ledger</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-amber-100 tracking-wide">
          Fortress Reservatory
        </h2>
        <p className="text-xs text-zinc-400">
          Seal a royal treaty to overnight inside the high stone citadels. Complete with bespoke chambers and courtly banquet banquets.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left stay configuration columns */}
        <div className="xl:col-span-7 space-y-6">
          <form onSubmit={handleBookingSubmit} className="space-y-5" id="booking-reserve-form">
            
            {/* Step 1: select castle & room */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Target Fortress</label>
                <select
                  value={selectedCastleId}
                  onChange={(e) => setSelectedCastleId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-serif"
                  id="select_castle"
                >
                  {CASTLES_DATA.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.location})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Sanctuary Chambers</label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-serif"
                  id="select_room"
                >
                  {selectedCastle.roomOptions.map(r => (
                    <option key={r.id} value={r.id}>{r.name} — ${r.pricePerNight}/night</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room mini specs */}
            {selectedRoom && (
              <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-900 text-xs text-zinc-400">
                <span className="font-semibold text-amber-300 font-serif block mb-0.5">{selectedRoom.name}</span>
                {selectedRoom.description} (Accommodates {selectedRoom.capacity} nobles).
              </div>
            )}

            {/* Step 2: Noble Identity Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Noble Patron Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-600" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord William of Conwy"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-10 bg-zinc-900 border border-zinc-800 placeholder-zinc-600 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-serif"
                    id="input_noble_name"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Noble Email Pigeon</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-600" />
                  <input
                    type="email"
                    required
                    placeholder="lord.william@realm.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-10 bg-zinc-900 border border-zinc-800 placeholder-zinc-600 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-sans"
                    id="input_noble_email"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Dates and headcount */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Check In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-mono"
                  id="date_checkin"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Check Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-mono"
                  id="date_checkout"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Garrison (Guests)</label>
                <input
                  type="number"
                  min="1"
                  max={selectedRoom?.capacity || 4}
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-2.5 outline-none focus:border-amber-500 font-mono"
                  id="input_guests"
                />
              </div>
            </div>

            {/* Step 4: Banquet option */}
            <div className="p-4 bg-amber-950/10 border border-amber-500/10 rounded-xl flex items-start gap-3">
              <input
                type="checkbox"
                id="banquetUpgrade"
                checked={banquetUpgrade}
                onChange={(e) => setBanquetUpgrade(e.target.checked)}
                className="w-4 h-4 rounded border-amber-500 bg-zinc-900 mt-0.5 accent-amber-500"
              />
              <div>
                <label htmlFor="banquetUpgrade" className="font-serif text-xs font-bold text-amber-200 cursor-pointer flex items-center gap-1.5">
                  🍲 Royal Banquet Feast Upgrade
                  <span className="text-[9px] font-mono font-normal text-amber-400/85">+$120 per head/night</span>
                </label>
                <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                  Provides standard nightly wine and roast goose menus, spit-roasted delicacies, and priority seating in the Castle’s Imperial Great Hall.
                </p>
              </div>
            </div>

            {/* Step 5: Royal Extras */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Exquisite Pursuits (Extras)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {extrasList.map(item => {
                  const hasExtra = selectedExtras.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleExtraToggle(item.id)}
                      className={`text-left p-3.5 rounded-lg border transition-all duration-300 flex flex-col justify-between h-[85px] ${
                        hasExtra
                          ? 'bg-amber-950/20 border-amber-500 text-amber-200'
                          : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                      }`}
                      id={`extra-btn-${item.id}`}
                    >
                      <span className="text-[11px] font-serif font-bold tracking-wide leading-tight">{item.name}</span>
                      <span className="text-[10px] font-mono text-amber-400">+${item.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/20 border border-red-500/40 text-red-300 text-[11px] rounded-lg font-mono text-center animate-pulse">
                🛡️ {formError}
              </div>
            )}

            {/* Summation panel & trigger */}
            <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800 flex flex-wrap justify-between items-center gap-4">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Estimated Cost</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl text-amber-400 font-bold">${grandTotal}</span>
                  <span className="text-[11px] text-zinc-500 font-mono">for {days} Nights</span>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-serif font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                id="btn_submit_booking"
              >
                📜 Seal Charter Stay
              </button>
            </div>

          </form>
        </div>

        {/* Right Columns: Active certificate rendering or booked list history */}
        <div className="xl:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Section: Dynamic Noble staying certificate */}
          <div className="flex-1 bg-yellow-950/5 border border-amber-500/10 p-5 rounded-2xl flex flex-col items-center justify-center min-h-[380px] text-center relative">
            
            {currentBookingCertificate ? (
              <div className="w-full relative gold-border p-6 rounded-lg text-left" id="active-certificate-view">
                
                {/* Scroll styling background glow */}
                <div className="absolute inset-0 bg-amber-500/[0.01] pointer-events-none"></div>

                <div className="flex justify-between items-start border-b border-amber-500/20 pb-4 mb-4">
                  <div>
                    <span className="text-[9px] font-mono text-amber-500 tracking-widest uppercase block">Lodging Sovereign Charter</span>
                    <h4 className="font-serif text-lg font-black text-amber-100 uppercase tracking-wide">
                      Stay Certified
                    </h4>
                  </div>

                  {/* Medieval crest */}
                  <Shield className="w-8 h-8 text-amber-500" />
                </div>

                <div className="space-y-3 text-xs leading-relaxed font-serif text-zinc-300">
                  <p>
                    By Royal Order, let it be known that <span className="text-amber-300 font-bold underline decoration-amber-500/40">{currentBookingCertificate.userName}</span> has signed a peace treaty to claim sanctuary in the chambers of:
                  </p>

                  <div className="p-3 bg-black/60 rounded border border-zinc-900">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">Fortress Location</span>
                    <span className="text-sm font-bold text-amber-200">{currentBookingCertificate.castleName}</span>
                    <span className="font-mono text-[10px] text-zinc-400 block mt-1">Chamber: {currentBookingCertificate.roomName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                    <div>
                      <span className="text-[9px] uppercase text-zinc-600 block">Check In</span>
                      {currentBookingCertificate.checkIn}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-zinc-600 block">Check Out</span>
                      {currentBookingCertificate.checkOut}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400 pt-1">
                    <div>
                      <span className="text-[9px] uppercase text-zinc-600 block">Headcount</span>
                      {currentBookingCertificate.guests} Nobles
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-zinc-600 block">Upgrade Feast</span>
                      {currentBookingCertificate.banquetUpgrade ? '🍲 Royal Banquet VIP' : 'None'}
                    </div>
                  </div>

                  <div className="flex border-t border-dashed border-amber-500/20 pt-4 justify-between items-center mt-4">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Treasury Secured</span>
                      <span className="text-sm font-mono font-bold text-amber-400 text-lg">${currentBookingCertificate.totalAmount} Gold</span>
                    </div>

                    {/* Wax Stamp */}
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-900 border-2 border-red-700 flex items-center justify-center text-red-100 font-mono text-[8px] font-bold shadow-lg shadow-red-950 rotate-12">
                        SEALED
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => window.print()}
                    className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline"
                  >
                    Print Royal Decree
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-zinc-600 flex flex-col items-center">
                <Award className="w-12 h-12 text-zinc-800 mb-2.5" />
                <p className="font-serif text-[13px] font-bold tracking-wide text-zinc-400">Lodging Charter Empty</p>
                <p className="text-[11px] max-w-xs text-zinc-500 px-4 mt-1 font-sans">
                  Seal the reservation form to generate a customized digital wax-stamped staying decree certificate.
                </p>
              </div>
            )}
          </div>

          {/* Ledger History List */}
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-2xl p-4">
            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-between">
              <span>Sovereign Ledger ({bookingsList.length})</span>
              <span className="text-[9px] text-zinc-600 font-normal">Active stay listings</span>
            </h4>

            {bookingsList.length === 0 ? (
              <p className="text-[11px] font-mono text-zinc-600 italic text-center py-4">
                No bookings historically filed.
              </p>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1" id="saved-bookings-ledger">
                {bookingsList.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setCurrentBookingCertificate(b)}
                    className="p-2.5 bg-zinc-950/80 border border-zinc-900 rounded-lg flex justify-between items-center hover:border-amber-500/20 cursor-pointer transition-all"
                  >
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-serif font-bold text-amber-100 block truncate">{b.castleName}</span>
                      <span className="text-[10px] font-mono text-zinc-500 block">{b.checkIn} to {b.checkOut} • {b.guests} nobles</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-amber-400">${b.totalAmount}</span>
                      <button
                        onClick={(e) => handleDeleteBooking(b.id, e)}
                        className="p-1 hover:bg-zinc-900 text-zinc-600 hover:text-red-400 rounded transition-colors"
                        title="Decry Stay"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
