/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Castle, Knight, TimelineEvent, TreasureQuest } from '../types';

export const CASTLES_DATA: Castle[] = [
  {
    id: 'bran',
    name: 'Bran Fortress',
    location: 'Transylvania, Carpathians',
    country: 'Romania',
    yearBuilt: 1388,
    status: 'Enigmatic & Imposing',
    architecturalStyle: 'Transylvanian Gothic',
    description: 'Perched on a razor-sharp cliffside in the heart of Transylvania, this legendary fortress stands shrouded in ancient mountain mists. Famously linked to the myth of Dracula and Vlad the Impaler, its dark hallways, secret staircases, and wooden battlements whisper long-forgotten secrets of blood-slicked battlefields and medieval shadows.',
    narrativeTone: 'A fortress born of bloody border wars and dark gothic legends...',
    image: 'https://images.unsplash.com/photo-501179691627-eebe1c73dee2?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-501179691627-eebe1c73dee2?q=80&w=1600&auto=format&fit=crop',
    storySummary: 'Constructed by the Saxons of Brasov in 1388, Bran was originally built as a strategic military border stronghold to repel the Ottoman Empire. Its complex defense towers and labyrinthine escape passages made it practically impenetrable.',
    fullStory: [
      'In the year 1377, Louis I of Hungary granted the Saxons of Kronstadt (Brasov) the privilege of building a stone citadel at their own expense and using their own labor. Within a decade, Bran Castle rose high above the jagged rocks of the gorge.',
      'The castle served as an offensive and defensive customs station on the mountain pass connecting Transylvania and Wallachia. Vlad the Impaler (Vlad Tepes), the historical prince of Wallachia who inspired Bram Stoker\'s Dracula, marched through the pass several times. Historians state he was eventually captured and imprisoned here for a brief period in the 15th century.',
      'Its eerie towers, dark spiral staircases, and subterranean dungeons became legendary. Visitors can explore the underground torture chambers, the royal bedrooms, and the central courtyard from which secret passages crawl deep into the mountain rock underneath.'
    ],
    mapX: 72,
    mapY: 52,
    features: ['Torture Chamber', 'Secret Escape Tunnel', 'Vampiric Crypt', 'Mountain Battlement'],
    hiddenTreasureHint: 'Look beneath the ancient wishing well in the central courtyard where the moonbeams strike at midnight.',
    roomOptions: [
      {
        id: 'bran-tower',
        name: 'Gothic Watchtower Suite',
        description: 'Sleep at the highest peak of the castle with a 360-degree view of the Transylvanian forest, complete with original wooden beams and a private fireplace.',
        pricePerNight: 450,
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'bran-dungeon',
        name: 'The Secret Chamber',
        description: 'An underground luxury chamber accessible only through a hidden sliding bookcase. Features velvet drapery, stone arches, and candlelight ambiance.',
        pricePerNight: 600,
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'neuschwanstein',
    name: 'Neuschwanstein',
    location: 'Bavarian Alps, Schwangau',
    country: 'Germany',
    yearBuilt: 1886,
    status: 'Meticulously Dreamlike',
    architecturalStyle: 'Romanesque Revival / Fairytale',
    description: 'Commissioned by the reclusive and enigmatic "Mad King" Ludwig II, Neuschwanstein is the ultimate architectural manifestation of romantic medievalism. Nestled atop a jagged peak in the breathtaking Bavarian Alps, its slender white spires and gold-gilded chambers served as the direct inspiration for standard fairy tale palaces across the world.',
    narrativeTone: 'The tragic masterpiece of a king who sought escape in dreams of knights and operas...',
    image: 'https://images.unsplash.com/photo-1461695008884-244cb4543d74?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    storySummary: 'Ludwig II intended Neuschwanstein as his personal mountain refuge, modeled after the legendary operas of Richard Wagner. Sadly, the king only spent 172 days in this castle before his mysterious drowning death.',
    fullStory: [
      'In the mid-19th century, Germany\'s royal castles had lost their strategic military value. King Ludwig II, deeply disillusioned by real-world politics, decided to construct a romanticised ideal of a medieval knight\'s castle where he could retreat into a fantasy of ancient absolute kingship.',
      'He hired theater scenic designers rather than conventional architects to draft the plans, incorporating motifs from Richard Wagner\'s Lohengrin and Tannhäuser operas into the woodwork, murals, and structure of the walls.',
      'Inside, visitors find the jaw-dropping Singer\'s Hall, a majestic gold-leaf Byzantine Throne Room, and even an artificial stalactite grotto with colorful electric illumination, which was highly futuristic for the 1880s.'
    ],
    mapX: 47,
    mapY: 48,
    features: ['Byzantine Throne Room', 'Singer\'s Grand Hall', 'Artificial Grotto', 'Marienbrücke Viewpoint'],
    hiddenTreasureHint: 'Buried in the artificial grotto, hidden behind the mossy stone cascade of the waterfalls.',
    roomOptions: [
      {
        id: 'neu-royal',
        name: 'The King Ludwig II Suite',
        description: 'Exquisite gothic woodwork, hand-woven royal tapestries, and a massive four-poster bed. Live and rest like the legendary visionary monarch himself.',
        pricePerNight: 950,
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'neu-singers',
        name: 'Swan Knight chambers',
        description: 'A luxurious loft appointed with swans, golden accents, and view panels that peer directly over the deep Pöllat Gorge and its ancient suspension bridge.',
        pricePerNight: 700,
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'conwy',
    name: 'Conwy Fortress',
    location: 'North Wales, Conwy County',
    country: 'United Kingdom',
    yearBuilt: 1289,
    status: 'Authentically Indestructible',
    architecturalStyle: 'Concentric Military Gothic',
    description: 'One of the most fearsome and magnificent medieval fortresses in all of Europe. Built by the English King Edward I to enforce his iron grip over Wales, Conwy stands as an absolute masterclass of brutal military architecture. Its eight colossal towers and intact town-wide curtain walls dominate the rugged estuary skyline.',
    narrativeTone: 'An iron ring of stone built to crush rebellions and secure a conquest...',
    image: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=1600&auto=format&fit=crop',
    storySummary: 'Conwy Castle was constructed in a blistering span of four years between 1283 and 1287. With hundreds of master masons involved, it represented the absolute peak of medieval siege defenses.',
    fullStory: [
      'When Edward I invaded North Wales in 1282, he immediately established massive fortresses known as the \"Iron Ring.\" Conwy Castle was the crowning achievements of this engineering campaign, designed by the master medieval architect James of Saint George.',
      'The castle is divided into an Outer and Inner Ward. Its massive walls are calculated to absorb heavy damage, while a series of murder holes, portcullises, and arrow slits made any assault by foot soldiers suicidal.',
      'In 1294, King Edward I was himself besieged inside Conwy during the Welsh rebellion led by Madog ap Llywelyn. Surrounded by fierce enemies and with flood waters rising, the king survived for several weeks on strict rations of salted fish and diluted red wine before relief fleets arrived.'
    ],
    mapX: 38,
    mapY: 34,
    features: ['Eight Massive Siege Towers', 'Royal Great Hall', 'Estuary Drawbridge', 'Iron Murder Holes'],
    hiddenTreasureHint: 'Grip the third iron ring from the right in the damp, mossy dungeons of the King\'s tower.',
    roomOptions: [
      {
        id: 'conwy-keep',
        name: 'The Commander’s War Room',
        description: 'Rustic stone walls, medieval battle shields, large oak war-tables, and visual arches overlooking the Conwy River estuary.',
        pricePerNight: 550,
        capacity: 3,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'mont-saint-michel',
    name: 'Mont-Saint-Michel',
    location: 'Normandy Tidal Island',
    country: 'France',
    yearBuilt: 1023,
    status: 'Tide-Protected Sanctuary',
    architecturalStyle: 'Norman Romanesque & Flamboyant Gothic',
    description: 'A breathtaking island citadel rising majestically out of the vast, shifting sands of the Norman coast. Cut off completely from the mainland twice a day by some of the most dramatic and rapid tides in Europe, this monastic castle stands as an ethereal hybrid of spiritual sanctuary and military fortress.',
    narrativeTone: 'Rising from the high seas like a sanctuary against both tides and English conquerors...',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    storySummary: 'Originally founded in 708 AD as a humble sanctuary by Saint Aubert after an apparition of the Archangel Michael, it evolved into an indestructible fortress abbey that successfully withstood all English siege assaults.',
    fullStory: [
      'During the Hundred Years\' War, the English forces launched successive assaults to conquer this island stronghold. Thanks to its courageous defenders, its tall, massive granite walls, and the lethal, fast-incoming tides, the Mount remained completely unvanquished.',
      'The architecture is a magnificent vertical hierarchy: at the bottom, the fishermen and farmers houses; in the middle, the great defensive fortress walls; and at the top, the massive abbey church reaching toward the heavens.',
      'During the French Revolution, the Abbey was briefly closed and converted into a high-security state prison for political dissidents, earning the grim nickname \"the provincial Bastille\" before being restored in the late 19th century.'
    ],
    mapX: 30,
    mapY: 42,
    features: ['The Merveille Abbey', 'Midnight High Tides', 'West Platform Lookout', 'Archangel Gilded Spire'],
    hiddenTreasureHint: 'Hidden beneath the tide levels: count forty stone steps down from the western high platform.',
    roomOptions: [
      {
        id: 'msm-abbots',
        name: 'The Archangel Sanctuary',
        description: 'High-vaulted stone arches, ancient manuscripts library corner, and floor-to-ceiling windows to watch the roaring Atlantic tides surround the fortress.',
        pricePerNight: 850,
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'himeji',
    name: 'Himeji (White Heron)',
    location: 'Hyogo Prefecture',
    country: 'Japan',
    yearBuilt: 1333,
    status: 'Impeccable & Elegant',
    architecturalStyle: 'Feudal Samurai / Tenshu',
    description: 'Affectionately known as Shirasagi-jo (The White Heron Castle) due to its striking brilliant white exterior resembling a majestic bird taking flight. This sprawling 83-room temple-fortress is the absolute pinnacle of Japanese samurai defense engineering, surviving wars, earthquakes, and WWII firebombings untouched.',
    narrativeTone: 'A pristine labyrinth of defensive masterstrokes, wooden trusses, and samurai codes...',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
    storySummary: 'Himeji is equipped with terrifying defensive options, including spiral maze paths, samurai drop chutes, hidden walls, and over 1,000 loopholes designed for archers and gunpowder gunners.',
    fullStory: [
      'Himeji Castle was originally built as a fort by Akamatsu Norimura in 1333. Over the centuries, it was dramatically expanded by samurai lords, including Toyotomi Hideyoshi and Ikeda Terumasa, who engineered its iconic five-story main keep.',
      'The castle’s defenses are notoriously brutal. The approach to the main keep is a confusing layout of narrow spiral paths that force invaders to march in single-file while exposing their sides to fire from hidden gun slits (Sama).',
      'The white plaster walls are made using custom fireproof materials, safeguarding the massive timber pillars against burning flaming arrows. According to samurai legend, the castle is also guarded from evil spirits by the mythical Okiku\'s Wishing Well.'
    ],
    mapX: 90,
    mapY: 62,
    features: ['Samurai Armoury Ward', 'Tenshu Keep Maze', 'Okiku’s Cursed Well', 'Cherry Blossom Courtyard'],
    hiddenTreasureHint: 'Behind the third family crest cresting the wooden beam in the topmost floor of the Tenshu Keep.',
    roomOptions: [
      {
        id: 'himeji-shogun',
        name: 'The Shogun’s Tatami Suite',
        description: 'Gorgeously laid tatami mats, hand-painted Japanese sliding screens, ancient samurai armor displays, and a private cedar bath.',
        pricePerNight: 1200,
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
];

export const KNIGHTS_DATA: Knight[] = [
  {
    id: 'sir-william-marshal',
    name: 'Sir William Marshal',
    title: 'The Greatest Knight to Ever Live',
    bio: 'Champion of over 500 undefeated tournament jousts, of humble origin, he eventually served as loyal knight-protector and Regent of England to four legendary medieval English Kings. He was described by his peers as the ultimate exemplar of chivalry, courage, and tactical leadership.',
    region: 'England & Normandy',
    weapons: ['Double-Handed Steel Broadsword', 'Jousting Lance'],
    emblem: 'ShieldAlert',
    shieldColor: 'bg-amber-950 border-amber-500',
    allegiance: 'Crown of England',
    stats: { strength: 98, defense: 95, honor: 100, tactics: 92 }
  },
  {
    id: 'jeanne-darc',
    name: 'Jeanne d’Arc',
    title: 'The Maid of Orléans',
    bio: 'A humble French peasant girl who received divine visions of archangels. Guided by pure faith, she rallied the shattered army of France, lifted the brutal siege of Orléans, and turned the tides of the hundred-year war before her tragic sacrifice at the stake.',
    region: 'Kingdom of France',
    weapons: ['Holy Inscribed Longsword', 'Sacred Fleur-de-lis Banner'],
    emblem: 'Sparkles',
    shieldColor: 'bg-blue-950 border-blue-400',
    allegiance: 'French Royal Court',
    stats: { strength: 80, defense: 85, honor: 99, tactics: 94 }
  },
  {
    id: 'richard-the-lionheart',
    name: 'King Richard I',
    title: 'The Lionheart',
    bio: 'A warrior king par excellence, Richard earned his legendary moniker through sheer ferocity and unmatched battlefield leadership during the Third Crusade. He spent only six months of his ten-year reign inside England, preferring the thrill of campaigning and building massive castles.',
    region: 'Aquitaine & England',
    weapons: ['Gilded Crusader War Axe', 'Lion-Embossed Longsword'],
    emblem: 'Swords',
    shieldColor: 'bg-red-950 border-yellow-500',
    allegiance: 'House of Plantagenet',
    stats: { strength: 96, defense: 88, honor: 85, tactics: 91 }
  },
  {
    id: 'tomoe-gozen',
    name: 'Lady Tomoe Gozen',
    title: 'The Legendary Onna-Musha',
    bio: 'An exceptional female samurai master and military commander in late 12th-century Japan. Famously praised for her extraordinary archery accuracy and unmatched swordsmanship, she was said to be worth more than a thousand soldiers and fought in the Genpei War.',
    region: 'Kamakura, Japan',
    weapons: ['Naginata Glaive', 'Kigawa Samurai Yumi Bow'],
    emblem: 'Flame',
    shieldColor: 'bg-emerald-950 border-emerald-400',
    allegiance: 'Clan Minamoto',
    stats: { strength: 94, defense: 92, honor: 95, tactics: 96 }
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'event-1',
    year: 1066,
    eventName: 'Battle of Hastings',
    description: 'William the Conqueror defeats King Harold II, introducing Norman military castle architecture—primarily wooden and stone Motte-and-Bailey systems—to the British landscape.',
    keyFigure: 'William the Conqueror',
    category: 'dynasty'
  },
  {
    id: 'event-2',
    year: 1190,
    eventName: 'The Rise of Concentric Rings',
    description: 'Crusader castle masterbuilders return from the Levant with revolutionary architectural knowledge, pioneering stone concentric rings, double-curtain walls, and rounded siege columns.',
    keyFigure: 'Richard the Lionheart',
    category: 'construction'
  },
  {
    id: 'event-3',
    year: 1215,
    eventName: 'Siege of Rochester',
    description: 'One of the most spectacular medieval sieges. King John burns pig fat inside subterranean tunnels to collapse the massive stone keep towers after a grueling siege of several weeks.',
    keyFigure: 'King John of England',
    category: 'siege'
  },
  {
    id: 'event-4',
    year: 1346,
    eventName: 'Cannons Change Warfare',
    description: 'The terrifying debut of gunpowder and primitive iron artillery bombards at the Battle of Crécy, signaling the ultimate decline of traditional medieval stone fortresses.',
    keyFigure: 'Edward III',
    category: 'secret'
  },
  {
    id: 'event-5',
    year: 1453,
    eventName: 'The Fall of Constantinople',
    description: 'Mehmed the Conqueror uses massive bronze cannons to obliterate the legendary triple stone walls of Constantinople, ending 1,500 years of classical Roman fortifications.',
    keyFigure: 'Mehmed II',
    category: 'siege'
  }
];

export const TREASURE_QUESTS: TreasureQuest[] = [
  {
    id: 'quest-bran',
    castleId: 'bran',
    castleName: 'Bran Fortress',
    title: 'The Lost Bloodline Sigil',
    description: 'Unlock the dusty Transylvanian vaults by answering riddles left by Vlad the Impaler’s royal alchemists to secure the legendary Dracula ruby crest.',
    rewardTitle: 'Gothic Alchemist Ruby',
    goldReward: 500,
    riddles: [
      {
        question: 'Who originally funded and built the castle in 1388 to secure the gorge trans pass?',
        options: [
          'The Wallachian peasants',
          'The Transylvanian Saxons of Brasov',
          'The Ottoman Empire scouts',
          'The Roman Emperors'
        ],
        answerIndex: 1,
        hint: 'It was a Germanic guild trade group that sought to guard their commercial trade route.'
      },
      {
        question: 'Which of these historical figures actually spent a brief time imprisoned inside the castle dungeons?',
        options: [
          'Vlad the Impaler',
          'Bram Stoker',
          'Louis I of Hungary',
          'Edward the Black Prince'
        ],
        answerIndex: 0,
        hint: 'He is the real historical figure behind the immortal Count Dracula legend.'
      }
    ]
  },
  {
    id: 'quest-neuschwanstein',
    castleId: 'neuschwanstein',
    castleName: 'Neuschwanstein',
    title: 'The Swan King’s Hidden Symphony',
    description: 'Unearth the sealed notebook of Richard Wagner’s romantic dream compositions hidden in the depths of Ludwigs mystical artificial mountain grotto.',
    rewardTitle: 'The Swan Crest of Bavaria',
    goldReward: 750,
    riddles: [
      {
        question: 'Which eccentric ruler commissioned the castle as a whimsical escape from politics?',
        options: [
          'Emperor Barbarossa',
          'King Ludwig II of Bavaria',
          'Prince Henry of Prussia',
          'Charles V'
        ],
        answerIndex: 1,
        hint: 'Often branded "The Mad King" due to his extravagant architectural dreams.'
      },
      {
        question: 'Whose famous romantic operas did this dream castle heavily inspire and reference?',
        options: [
          'Ludwig van Beethoven',
          'Wolfgang Amadeus Mozart',
          'Richard Wagner',
          'Johann Sebastian Bach'
        ],
        answerIndex: 2,
        hint: 'Composer of the iconic Ring Cycle and Lohengrin.'
      }
    ]
  },
  {
    id: 'quest-himeji',
    castleId: 'himeji',
    castleName: 'Himeji (White Heron)',
    title: 'The Shogun’s Diamond Blade',
    description: 'Navigate Himeji\'s baffling spiral military layout and crack the samurai riddles to salvage the ancestral folded steel katana.',
    rewardTitle: 'White Heron Samurai Katana',
    goldReward: 900,
    riddles: [
      {
        question: 'Why is Himeji Castle affectionately named the "White Heron"?',
        options: [
          'Because wild herons built nests in its watchtowers',
          'Its sleek, brilliant white plaster resembles a white bird taking flight',
          'Shogun Toyotomi Hideyoshi loved white herons',
          'It is shaped like a bird cage'
        ],
        answerIndex: 1,
        hint: 'Think about its brilliant high-contrast wooden and white stucco walls.'
      },
      {
        question: 'What ingenious defensive design traps invaders inside Himeji’s fortress compounds?',
        options: [
          'An intricate spiral maze pathway leading to dead ends and arrow fire',
          'Retractable wooden drawbridges with poisonous spikes',
          'Subterranean hot-water geo geysers',
          'Flooding the outer ramparts with ocean tides'
        ],
        answerIndex: 0,
        hint: 'Its layout forces attackers to run in circles while exposing their flanks.'
      }
    ]
  }
];
