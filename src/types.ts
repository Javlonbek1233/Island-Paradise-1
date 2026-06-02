/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoomOption {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  image: string;
}

export interface Castle {
  id: string;
  name: string;
  location: string;
  country: string;
  yearBuilt: number;
  status: string; // e.g., "Meticulously Preserved", "Enigmatic Ruin"
  architecturalStyle: string;
  description: string;
  narrativeTone: string; // e.g., "A fortress born of bloody sieges..."
  image: string;
  bannerImage: string;
  storySummary: string;
  fullStory: string[]; // split into cinematic paragraphs
  mapX: number; // percentage width on interactive map
  mapY: number; // percentage height on interactive map
  features: string[];
  roomOptions: RoomOption[];
  hiddenTreasureHint: string;
}

export interface Knight {
  id: string;
  name: string;
  title: string;
  bio: string;
  region: string;
  weapons: string[];
  emblem: string; // lucide icon name or emoji representation
  shieldColor: string; // tailwind color prefix, e.g., "bg-red-950"
  allegiance: string;
  stats: {
    strength: number; // 1-100
    defense: number; // 1-100
    honor: number; // 1-100
    tactics: number; // 1-100
  };
}

export interface TimelineEvent {
  id: string;
  year: number;
  eventName: string;
  description: string;
  keyFigure: string;
  category: 'siege' | 'construction' | 'dynasty' | 'secret';
}

export interface Riddle {
  question: string;
  options: string[];
  answerIndex: number;
  hint: string;
}

export interface TreasureQuest {
  id: string;
  castleId: string;
  castleName: string;
  title: string;
  description: string;
  riddles: Riddle[];
  rewardTitle: string;
  goldReward: number;
}

export interface Booking {
  id: string;
  castleId: string;
  castleName: string;
  roomOptionId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  userName: string;
  userEmail: string;
  banquetUpgrade: boolean;
  extraOptions: string[];
  bookingDate: string;
}
