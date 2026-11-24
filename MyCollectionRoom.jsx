import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  Tv,
  Film,
  Gamepad2,
  Plus,
  Sun,
  CloudRain,
  Snowflake,
  Moon,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Award,
  Gift,
  User,
  Palette,
  Check,
  Trash2,
  Edit3,
  X,
  Crown,
  RotateCcw,
  Search,
  Music,
  Star,
  Home,
  Heart,
  Clock,
  Timer,
  Flame,
  Bell,
  Users,
  MessageCircle,
  Globe,
  Eye,
  UserPlus,
  Send,
  Filter,
  Tag
} from 'lucide-react';

/**
 * ============================================================================
 * CONSTANTS, TRANSLATIONS, AMBIANCES & CATALOGS
 * ============================================================================
 */

const STORAGE_KEY = 'my_collection_room_v5';

const TRANSLATIONS = {
  tr: {
    appTitle: 'My Collection Room',
    subtitle: 'Sosyal Anime Koleksiyon & Yaşam Odası',
    tabRoom: 'Odam & Raflar',
    tabFriends: 'Arkadaşlar',
    tabChats: 'Chats',
    studioBtn: 'Kozmetik Stüdyosu',
    badgesBtn: 'Hediyeler',
    notificationsTitle: 'Bildirimler',
    markAllRead: 'Tümünü okundu say',
    noNotifications: 'Henüz yeni bildirim yok.',
    searchPlaceholder: 'Eser, yazar veya tür ara...',
    addBtn: '+ Ekle',
    genreBtn: 'Tür',
    statusBtn: 'Durum',
    allFilter: 'Tümü',
    roomHint: 'Zemine, yatağa, kitaplığa, şömineye, sandalyeye veya koltuğa tıkla! Hayvanına tıklayıp sev.',
    petLove: 'Sevgi',
    stopwatchTitle: 'Odak Kronometresi',
    swMode: 'Kronometre',
    focusMode: '25dk Odak',
    lapBtn: 'Tur',
    ambientMusic: 'Ortam Müziği',
    myFriendsTab: 'Arkadaşlarım',
    suggestedFriendsTab: 'Önerilen Arkadaşlar',
    visitRoom: 'Odasını Ziyaret Et',
    returnMyRoom: 'Kendi Odama Dön',
    visitingBanner: 'Şu an ziyaret ettiğin oda:',
    addFriend: 'Arkadaş Ekle',
    alreadyFriend: 'Arkadaşın',
    similarityLabel: 'Koleksiyon Benzerliği',
    online: 'Çevrimiçi',
    offline: 'Çevrimdışı',
    groupSessions: 'Grup Session Odaları',
    directMessages: 'Direct Messages (DM)',
    typeMessage: 'Bir mesaj yaz (ör: How are you feeling?)...',
    sendBtn: 'Gönder',
    typing: 'yazıyor...',
    fireplaceOn: 'Şömine Yanıyor (Kapatmak için tıkla)',
    fireplaceOff: 'Şömine Kapalı (Yakmak için tıkla)',
    resetRoomBtn: 'Odayı & Karakteri Sıfırla',
    resetRoomDesc: 'Arkadaşlarını, koleksiyonunu ve seçili ambiyansı korur; yalnızca oda yerleşimini ve karakter görünümünü sıfırlar.',
    resetDoneToast: 'Oda yerleşimi ve karakter varsayılan haline sıfırlandı!',
    saveBtn: 'Kaydet',
    cancelBtn: 'İptal',
    deleteBtn: 'Sil',
    notesLabel: 'Kişisel Notların',
    ratingLabel: 'Puanın (5 Üzerinden)',
    statusLabel: 'Durum Etiketi',
    genreLabel: 'Tür',
    titleLabel: 'Eser Adı',
    creatorLabel: 'Yazar / Stüdyo',
    progressLabel: 'İlerleme',
    achievementsLabel: 'Başarımlar',
    hoursPlayedLabel: 'Oynanan Saat'
  },
  en: {
    appTitle: 'My Collection Room',
    subtitle: 'Social Anime Collection & Living Room',
    tabRoom: 'My Room & Shelves',
    tabFriends: 'Friends',
    tabChats: 'Chats',
    studioBtn: 'Cosmetic Studio',
    badgesBtn: 'Gifts',
    notificationsTitle: 'Notifications',
    markAllRead: 'Mark all read',
    noNotifications: 'No new notifications yet.',
    searchPlaceholder: 'Search title, creator or genre...',
    addBtn: '+ Add',
    genreBtn: 'Genre',
    statusBtn: 'Status',
    allFilter: 'All',
    roomHint: 'Click floor, bed, bookshelf, fireplace, chair or armchair! Click your pet to give love.',
    petLove: 'Affection',
    stopwatchTitle: 'Focus Stopwatch',
    swMode: 'Stopwatch',
    focusMode: '25m Focus',
    lapBtn: 'Lap',
    ambientMusic: 'Ambient Music',
    myFriendsTab: 'My Friends',
    suggestedFriendsTab: 'Suggested Friends',
    visitRoom: 'Visit Room',
    returnMyRoom: 'Back to My Room',
    visitingBanner: 'Currently visiting room of:',
    addFriend: 'Add Friend',
    alreadyFriend: 'Friend',
    similarityLabel: 'Collection Similarity',
    online: 'Online',
    offline: 'Offline',
    groupSessions: 'Group Session Rooms',
    directMessages: 'Direct Messages (DM)',
    typeMessage: 'Type a message (e.g., How are you feeling?)...',
    sendBtn: 'Send',
    typing: 'typing...',
    fireplaceOn: 'Fireplace Lit (Click to extinguish)',
    fireplaceOff: 'Fireplace Off (Click to light)',
    resetRoomBtn: 'Reset Room & Character',
    resetRoomDesc: 'Keeps your friends, collection, and selected ambiance; resets only room layout and character look.',
    resetDoneToast: 'Room layout and character have been reset!',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    deleteBtn: 'Delete',
    notesLabel: 'Personal Notes',
    ratingLabel: 'Rating (Out of 5)',
    statusLabel: 'Status Tag',
    genreLabel: 'Genre',
    titleLabel: 'Title',
    creatorLabel: 'Author / Studio',
    progressLabel: 'Progress',
    achievementsLabel: 'Achievements',
    hoursPlayedLabel: 'Hours Played'
  }
};

const STATUS_TAGS = [
  { id: 'Reading', labelTr: 'Reading / Devam Ediyor', labelEn: 'Reading', badge: 'bg-sky-500/20 text-sky-300 border-sky-400/40' },
  { id: 'On Hold', labelTr: 'On Hold / Beklemede', labelEn: 'On Hold', badge: 'bg-amber-500/20 text-amber-300 border-amber-400/40' },
  { id: 'Finished', labelTr: 'Finished / Tamamlandı', labelEn: 'Finished', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' }
];

const GENRE_LIST = [
  { id: 'Macera', tr: 'Macera', en: 'Adventure' },
  { id: 'Fantastik', tr: 'Fantastik', en: 'Fantasy' },
  { id: 'Bilim Kurgu', tr: 'Bilim Kurgu', en: 'Sci-Fi' },
  { id: 'Gizem', tr: 'Gizem', en: 'Mystery' },
  { id: 'Aksiyon', tr: 'Aksiyon', en: 'Action' },
  { id: 'Romantik', tr: 'Romantik', en: 'Romance' },
  { id: 'RPG', tr: 'RPG', en: 'RPG' }
];

const SHELVES = [
  { id: 'books', nameTr: 'Kitaplar', nameEn: 'Books', unitTr: 'sayfa', unitEn: 'pages', accent: 'from-amber-500 to-orange-600', icon: BookOpen },
  { id: 'manga', nameTr: 'Mangalar', nameEn: 'Manga', unitTr: 'bölüm', unitEn: 'chapters', accent: 'from-rose-500 to-pink-600', icon: Sparkles },
  { id: 'anime', nameTr: 'Animeler', nameEn: 'Anime', unitTr: 'bölüm', unitEn: 'episodes', accent: 'from-violet-500 to-purple-600', icon: Tv },
  { id: 'shows', nameTr: 'Diziler & Filmler', nameEn: 'Series & Movies', unitTr: 'bölüm', unitEn: 'episodes', accent: 'from-cyan-500 to-blue-600', icon: Film },
  { id: 'games', nameTr: 'Oyunlar', nameEn: 'Games', unitTr: 'başarım', unitEn: 'achievements', accent: 'from-emerald-500 to-teal-600', icon: Gamepad2 }
];

const AMBIANCES = {
  cozy: {
    id: 'cozy',
    nameTr: 'Cozy Kütüphane',
    nameEn: 'Cozy Library',
    fontFamily: "'Quicksand', system-ui, sans-serif",
    pageBg: 'bg-[#1c1512] text-amber-50',
    panelBg: 'bg-[#2a1f1a] border-amber-500/25 text-amber-50',
    modalBg: 'bg-[#241a15] border-amber-500/35 text-amber-50',
    wallGradient: 'from-[#4a3222] via-[#694730] to-[#3b2619]',
    floorGradient: 'from-[#5c3a21] to-[#3a2212]',
    borderStyle: 'border-2 border-amber-500/30',
    plankClass: 'bg-gradient-to-b from-[#9c6334] to-[#5e3819] border-amber-950'
  },
  summer: {
    id: 'summer',
    nameTr: 'Yaz Esintisi',
    nameEn: 'Summer Breeze',
    fontFamily: "'Nunito', system-ui, sans-serif",
    pageBg: 'bg-[#0f292e] text-teal-50',
    panelBg: 'bg-[#16383f] border-teal-400/30 text-teal-50',
    modalBg: 'bg-[#133238] border-teal-400/40 text-teal-50',
    wallGradient: 'from-[#1d5b66] via-[#2b7a85] to-[#17464f]',
    floorGradient: 'from-[#8c6239] to-[#5e3f21]',
    borderStyle: 'border-2 border-teal-400/35',
    plankClass: 'bg-gradient-to-b from-[#c28d57] to-[#7d552d] border-amber-900'
  },
  medieval: {
    id: 'medieval',
    nameTr: 'Medieval Şato',
    nameEn: 'Medieval Keep',
    fontFamily: "'Georgia', serif",
    pageBg: 'bg-[#181619] text-stone-100',
    panelBg: 'bg-[#252227] border-yellow-600/35 text-stone-100',
    modalBg: 'bg-[#201d22] border-yellow-500/45 text-stone-100',
    wallGradient: 'from-[#38333c] via-[#4d4652] to-[#28242b]',
    floorGradient: 'from-[#4a3525] to-[#2b1e14]',
    borderStyle: 'border-2 border-yellow-600/40',
    plankClass: 'bg-gradient-to-b from-[#6e4b30] to-[#3d2817] border-stone-950'
  },
  cyberpunk: {
    id: 'cyberpunk',
    nameTr: 'Cyberpunk Gece',
    nameEn: 'Cyberpunk Night',
    fontFamily: "'JetBrains Mono', monospace",
    pageBg: 'bg-[#0b091a] text-fuchsia-50',
    panelBg: 'bg-[#151130] border-fuchsia-500/35 text-fuchsia-50',
    modalBg: 'bg-[#120e29] border-cyan-400/45 text-fuchsia-50',
    wallGradient: 'from-[#1b1442] via-[#2b1b5e] to-[#120d2e]',
    floorGradient: 'from-[#231d42] to-[#110e24]',
    borderStyle: 'border-2 border-fuchsia-500/40',
    plankClass: 'bg-gradient-to-b from-[#4f46e5] to-[#312e81] border-fuchsia-500/40'
  },
  sakura: {
    id: 'sakura',
    nameTr: 'Sakura Baharı',
    nameEn: 'Sakura Spring',
    fontFamily: "'Quicksand', system-ui, sans-serif",
    pageBg: 'bg-[#24141d] text-pink-50',
    panelBg: 'bg-[#331c29] border-pink-400/30 text-pink-50',
    modalBg: 'bg-[#2b1722] border-pink-400/45 text-pink-50',
    wallGradient: 'from-[#5c2c45] via-[#7a3b5c] to-[#421f31]',
    floorGradient: 'from-[#75483b] to-[#4a2c23]',
    borderStyle: 'border-2 border-pink-400/35',
    plankClass: 'bg-gradient-to-b from-[#b57b6c] to-[#73483d] border-pink-950'
  },
  winter: {
    id: 'winter',
    nameTr: 'Kış & Şömine',
    nameEn: 'Winter Hearth',
    fontFamily: "'Quicksand', system-ui, sans-serif",
    pageBg: 'bg-[#101826] text-sky-50',
    panelBg: 'bg-[#182438] border-sky-400/30 text-sky-50',
    modalBg: 'bg-[#141f30] border-sky-400/40 text-sky-50',
    wallGradient: 'from-[#223452] via-[#2f476e] to-[#18253b]',
    floorGradient: 'from-[#543a29] to-[#332217]',
    borderStyle: 'border-2 border-sky-400/35',
    plankClass: 'bg-gradient-to-b from-[#825a3c] to-[#4f3522] border-slate-950'
  }
};

// Distinct Girl & Boy Anime Cosmetic Catalogs
const GIRL_HAIR_STYLES = [
  { id: 'side_ponytail', nameTr: 'Yandan At Kuyruğu + Toka', nameEn: 'Side Ponytail + Clip' },
  { id: 'twintails', nameTr: 'İkili Saç + Kurdele', nameEn: 'Twin Tails + Ribbons' },
  { id: 'long_wavy', nameTr: 'Uzun Dalgalı', nameEn: 'Long Wavy' },
  { id: 'hime_cut', nameTr: 'Hime Kesim', nameEn: 'Hime Cut' }
];

const BOY_HAIR_STYLES = [
  { id: 'hoodie_messy', nameTr: 'Kapüşonlu Dağınık', nameEn: 'Hoodie Messy' },
  { id: 'spiky_cool', nameTr: 'Havalı Dikenli', nameEn: 'Cool Spiky' },
  { id: 'wolf_cut', nameTr: 'Katmanlı Wolf Cut', nameEn: 'Layered Wolf Cut' },
  { id: 'side_part', nameTr: 'Yandan Ayrık Undercut', nameEn: 'Side-Part Undercut' }
];

const GIRL_HAIR_COLORS = [
  { id: 'sakura_pink', nameTr: 'Sakura Pembesi', main: '#f472b6', dark: '#db2777', highlight: '#fbcfe8' },
  { id: 'honey_blonde', nameTr: 'Bal Sarısı', main: '#fbbf24', dark: '#d97706', highlight: '#fef3c7' },
  { id: 'lavender_mist', nameTr: 'Lavanta Moru', main: '#c084fc', dark: '#7e22ce', highlight: '#f3e8ff' },
  { id: 'chestnut_brown', nameTr: 'Kestane Kahve', main: '#92400e', dark: '#451a03', highlight: '#d97706' }
];

const BOY_HAIR_COLORS = [
  { id: 'midnight_black', nameTr: 'Gece Siyahı', main: '#1e293b', dark: '#090d16', highlight: '#64748b' },
  { id: 'silver_ash', nameTr: 'Gümüş Gri', main: '#94a3b8', dark: '#475569', highlight: '#f1f5f9' },
  { id: 'cobalt_blue', nameTr: 'Kobalt Mavisi', main: '#2563eb', dark: '#1e3a8a', highlight: '#93c5fd' },
  { id: 'crimson_red', nameTr: 'Kızıl Ateş', main: '#dc2626', dark: '#7f1d1d', highlight: '#fca5a5' }
];

const GIRL_OUTFITS = [
  { id: 'white_blouse', nameTr: 'Beyaz Yakalı Gömlek', nameEn: 'White Collared Shirt' },
  { id: 'sailor_uniform', nameTr: 'Denizci Üniforması', nameEn: 'Sailor Uniform' },
  { id: 'cozy_sweater', nameTr: 'Pembe Örgü Kazak', nameEn: 'Pink Knit Sweater' }
];

const BOY_OUTFITS = [
  { id: 'blue_hoodie', nameTr: 'Mavi Kapüşonlu Hoodie', nameEn: 'Blue Street Hoodie' },
  { id: 'tech_jacket', nameTr: 'Siyah Techwear Ceket', nameEn: 'Black Techwear Jacket' },
  { id: 'academy_blazer', nameTr: 'Akademi Ceketi', nameEn: 'Academy Blazer' }
];

const GIRL_ACCESSORIES = [
  { id: 'donut', nameTr: 'Çilekli Donut', nameEn: 'Strawberry Donut' },
  { id: 'cat_ears', nameTr: 'Kedi Kulakları', nameEn: 'Neko Ears' },
  { id: 'star_clip', nameTr: 'Yıldız Toka', nameEn: 'Star Hairpin' },
  { id: 'none', nameTr: 'Aksesuarsız', nameEn: 'None' }
];

const BOY_ACCESSORIES = [
  { id: 'gold_chain', nameTr: 'Altın Kolye', nameEn: 'Gold Pendant Chain' },
  { id: 'headphones', nameTr: 'Boyun Kulaklığı', nameEn: 'Neck Headphones' },
  { id: 'glasses', nameTr: 'Anime Gözlük', nameEn: 'Anime Glasses' },
  { id: 'none', nameTr: 'Aksesuarsız', nameEn: 'None' }
];

const PET_TYPES = [
  { id: 'cat', nameTr: 'Anime Kedi', nameEn: 'Anime Cat', sound: 'Nyaa~ ♪' },
  { id: 'shiba', nameTr: 'Shiba Inu', nameEn: 'Shiba Inu', sound: 'Wan! ★' },
  { id: 'fox', nameTr: 'Kitsune Tilki', nameEn: 'Kitsune Fox', sound: 'Kon-kon~ ✨' },
  { id: 'bunny', nameTr: 'Lop Tavşan', nameEn: 'Lop Bunny', sound: 'Pyon~ ♥' },
  { id: 'dragon', nameTr: 'Mini Ejderha', nameEn: 'Mini Dragon', sound: 'Kyuu~ 🔥' }
];

const PET_COLORS = [
  { id: 'cream', nameTr: 'Krem & Karamel', body: '#fef3c7', ear: '#f59e0b', cheek: '#fda4af' },
  { id: 'calico', nameTr: 'Turuncu Tekir', body: '#fdba74', ear: '#ea580c', cheek: '#fb7185' },
  { id: 'sakura', nameTr: 'Sakura Pembe', body: '#fbcfe8', ear: '#ec4899', cheek: '#f43f5e' },
  { id: 'midnight', nameTr: 'Gece Laciverti', body: '#475569', ear: '#1e293b', cheek: '#f472b6' },
  { id: 'mint', nameTr: 'Nane Yeşili', body: '#a7f3d0', ear: '#059669', cheek: '#fb7185' }
];

const PET_ACCESSORIES = [
  { id: 'bell', nameTr: 'Altın Çıngırak', nameEn: 'Golden Bell' },
  { id: 'scarf', nameTr: 'Kırmızı Atkı', nameEn: 'Red Scarf' },
  { id: 'crown', nameTr: 'Mini Taç', nameEn: 'Mini Crown' },
  { id: 'none', nameTr: 'Yok', nameEn: 'None' }
];

const GIFTS_CATALOG = [
  { id: 'moon_lamp', nameTr: 'Ay Işığı Lambası', nameEn: 'Moonlight Lamp', emoji: '🏮', unlockedAt: 0 },
  { id: 'sakura_bonsai', nameTr: 'Sakura Bonsai Ağacı', nameEn: 'Sakura Bonsai', emoji: '🌸', unlockedAt: 0 },
  { id: 'astrolabe', nameTr: 'Altın Astrolab Küresi', nameEn: 'Golden Astrolabe', emoji: '🔮', unlockedAt: 0 },
  { id: 'gallery_art', nameTr: 'Altın Çerçeve Tablo', nameEn: 'Gilded Painting', emoji: '🖼️', unlockedAt: 0 },
  { id: 'gramophone', nameTr: 'Antika Gramofon', nameEn: 'Vintage Gramophone', emoji: '🎺', unlockedAt: 16 },
  { id: 'crystal_trophy', nameTr: 'Kristal Koleksiyon Kupası', nameEn: 'Crystal Trophy', emoji: '🏆', unlockedAt: 18 },
  { id: 'dragon_statue', nameTr: 'Yeşim Ejderha Heykeli', nameEn: 'Jade Dragon Statue', emoji: '🐉', unlockedAt: 20 }
];

// Auto-Metadata Dictionary when typing a new title
const KNOWN_WORKS_DB = {
  hobbit: { creator: 'J.R.R. Tolkien', genre: 'Macera', shelf: 'books', total: 310 },
  'harry potter': { creator: 'J.K. Rowling', genre: 'Fantastik', shelf: 'books', total: 350 },
  dune: { creator: 'Frank Herbert', genre: 'Bilim Kurgu', shelf: 'books', total: 688 },
  'elden ring': { creator: 'FromSoftware', genre: 'RPG', shelf: 'games', total: 42 },
  'hollow knight': { creator: 'Team Cherry', genre: 'Macera', shelf: 'games', total: 63 },
  zelda: { creator: 'Nintendo', genre: 'Macera', shelf: 'games', total: 50 },
  frieren: { creator: 'Madhouse', genre: 'Fantastik', shelf: 'anime', total: 28 },
  berserk: { creator: 'Kentaro Miura', genre: 'Aksiyon', shelf: 'manga', total: 375 },
  vagabond: { creator: 'Takehiko Inoue', genre: 'Macera', shelf: 'manga', total: 327 },
  dark: { creator: 'Baran bo Odar', genre: 'Gizem', shelf: 'shows', total: 26 },
  witcher: { creator: 'CD Projekt Red', genre: 'RPG', shelf: 'games', total: 78 }
};

const INITIAL_ITEMS = [
  {
    id: 'b-1',
    shelf: 'books',
    title: 'Yüzüklerin Efendisi: Yüzük Kardeşliği',
    titleEn: 'The Lord of the Rings: The Fellowship of the Ring',
    creator: 'J.R.R. Tolkien',
    genre: 'Macera',
    status: 'Finished',
    current: 423,
    total: 423,
    rating: 5,
    notes: 'Orta Dünya atmosferi büyüleyici.',
    notesEn: 'The Middle-earth atmosphere is mesmerizing.'
  },
  {
    id: 'b-2',
    shelf: 'books',
    title: 'Dune',
    titleEn: 'Dune',
    creator: 'Frank Herbert',
    genre: 'Bilim Kurgu',
    status: 'Reading',
    current: 410,
    total: 688,
    rating: 5,
    notes: 'Arrakis çölündeki entrikalar harika.',
    notesEn: 'The desert intrigue on Arrakis is phenomenal.'
  },
  {
    id: 'b-3',
    shelf: 'books',
    title: 'Sherlock Holmes: Kızıl Dosya',
    titleEn: 'Sherlock Holmes: A Study in Scarlet',
    creator: 'Arthur Conan Doyle',
    genre: 'Gizem',
    status: 'Finished',
    current: 192,
    total: 192,
    rating: 4,
    notes: 'İlk tanışma hikayesi çok akıcı.',
    notesEn: 'Their very first detective case flows brilliantly.'
  },
  {
    id: 'm-1',
    shelf: 'manga',
    title: 'Vagabond',
    titleEn: 'Vagabond',
    creator: 'Takehiko Inoue',
    genre: 'Macera',
    status: 'Reading',
    current: 245,
    total: 327,
    rating: 5,
    notes: 'Çizimler adeta tablo gibi.',
    notesEn: 'Every single panel looks like a fine painting.'
  },
  {
    id: 'm-2',
    shelf: 'manga',
    title: 'Berserk',
    titleEn: 'Berserk',
    creator: 'Kentaro Miura',
    genre: 'Fantastik',
    status: 'On Hold',
    current: 180,
    total: 375,
    rating: 5,
    notes: 'Altın Çağ arkı efsanevi.',
    notesEn: 'The Golden Age arc is legendary.'
  },
  {
    id: 'm-3',
    shelf: 'manga',
    title: 'Spy x Family',
    titleEn: 'Spy x Family',
    creator: 'Tatsuya Endo',
    genre: 'Aksiyon',
    status: 'Reading',
    current: 84,
    total: 105,
    rating: 4,
    notes: 'Anya sahneleri çok eğlenceli.',
    notesEn: 'Anya scenes are hilarious every chapter.'
  },
  {
    id: 'a-1',
    shelf: 'anime',
    title: 'Frieren: Beyond Journey’s End',
    titleEn: 'Frieren: Beyond Journey’s End',
    creator: 'Madhouse',
    genre: 'Fantastik',
    status: 'Finished',
    current: 28,
    total: 28,
    rating: 5,
    notes: 'Müzikleri ve dingin temposu şahane.',
    notesEn: 'The soundtrack and gentle pacing are wonderful.'
  },
  {
    id: 'a-2',
    shelf: 'anime',
    title: 'Made in Abyss',
    titleEn: 'Made in Abyss',
    creator: 'Kinema Citrus',
    genre: 'Macera',
    status: 'Finished',
    current: 25,
    total: 25,
    rating: 5,
    notes: 'Keşif duygusu inanılmaz güçlü.',
    notesEn: 'The sense of exploration is unmatched.'
  },
  {
    id: 'a-3',
    shelf: 'anime',
    title: 'Steins;Gate',
    titleEn: 'Steins;Gate',
    creator: 'White Fox',
    genre: 'Bilim Kurgu',
    status: 'Finished',
    current: 24,
    total: 24,
    rating: 5,
    notes: 'Zaman yolculuğu kurgusu kusursuz.',
    notesEn: 'Flawless time-travel storytelling.'
  },
  {
    id: 's-1',
    shelf: 'shows',
    title: 'Karayip Korsanları: Siyah İnci’nin Laneti',
    titleEn: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    creator: 'Gore Verbinski',
    genre: 'Macera',
    status: 'Finished',
    current: 1,
    total: 1,
    rating: 5,
    notes: 'Klasik macera filmi.',
    notesEn: 'An all-time classic adventure movie.'
  },
  {
    id: 's-2',
    shelf: 'shows',
    title: 'Indiana Jones: Kutsal Hazine Avcıları',
    titleEn: 'Indiana Jones: Raiders of the Lost Ark',
    creator: 'Steven Spielberg',
    genre: 'Macera',
    status: 'Finished',
    current: 1,
    total: 1,
    rating: 5,
    notes: 'Müzikleri bile heyecan verici.',
    notesEn: 'Even the theme score gets your heart racing.'
  },
  {
    id: 's-3',
    shelf: 'shows',
    title: 'Dark',
    titleEn: 'Dark',
    creator: 'Baran bo Odar',
    genre: 'Gizem',
    status: 'Reading',
    current: 18,
    total: 26,
    rating: 5,
    notes: 'Aile ağacı not tutmadan çözülmüyor!',
    notesEn: 'Impossible to track the family tree without notes!'
  },
  {
    id: 'g-1',
    shelf: 'games',
    title: 'Elden Ring',
    titleEn: 'Elden Ring',
    creator: 'FromSoftware',
    genre: 'RPG',
    status: 'Reading',
    current: 34,
    total: 42,
    hoursPlayed: 118,
    rating: 5,
    notes: 'Malenia boss savaşı epey terletti.',
    notesEn: 'The Malenia boss fight took serious patience.'
  },
  {
    id: 'g-2',
    shelf: 'games',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    titleEn: 'The Legend of Zelda: Tears of the Kingdom',
    creator: 'Nintendo',
    genre: 'Macera',
    status: 'Finished',
    current: 50,
    total: 50,
    hoursPlayed: 145,
    rating: 5,
    notes: 'Gökyüzü adaları ve inşa mekaniği harika.',
    notesEn: 'Sky islands and Ultrahand building are super fun.'
  },
  {
    id: 'g-3',
    shelf: 'games',
    title: 'Hollow Knight',
    titleEn: 'Hollow Knight',
    creator: 'Team Cherry',
    genre: 'Macera',
    status: 'Finished',
    current: 63,
    total: 63,
    hoursPlayed: 64,
    rating: 5,
    notes: 'Hallownest atmosferi unutulmaz.',
    notesEn: 'The atmosphere of Hallownest is unforgettable.'
  }
];

const ALL_PROFILES = [
  {
    id: 'u-aoi',
    name: 'Aoi Kurosawa',
    online: true,
    isFriend: true,
    activityTr: 'Frieren 24. bölümü izliyor 🌸',
    activityEn: 'Watching Frieren Ep. 24 🌸',
    character: { gender: 'girl', hairStyle: 'twintails', hairColor: 'sakura_pink', outfit: 'sailor_uniform', accessory: 'cat_ears' },
    pet: { type: 'cat', color: 'sakura', accessory: 'bell', affection: 42 },
    gifts: ['moon_lamp', 'sakura_bonsai', 'gallery_art', 'astrolabe', null, null],
    collection: [
      { id: 'f1', shelf: 'anime', title: 'Frieren: Beyond Journey’s End', titleEn: 'Frieren: Beyond Journey’s End', creator: 'Madhouse', genre: 'Fantastik', status: 'Reading', current: 24, total: 28, rating: 5 },
      { id: 'f2', shelf: 'books', title: 'Dune', titleEn: 'Dune', creator: 'Frank Herbert', genre: 'Bilim Kurgu', status: 'Finished', current: 688, total: 688, rating: 5 },
      { id: 'f3', shelf: 'games', title: 'Hollow Knight', titleEn: 'Hollow Knight', creator: 'Team Cherry', genre: 'Macera', status: 'Finished', current: 63, total: 63, hoursPlayed: 70, rating: 5 },
      { id: 'f4', shelf: 'manga', title: 'Spy x Family', titleEn: 'Spy x Family', creator: 'Tatsuya Endo', genre: 'Aksiyon', status: 'Reading', current: 90, total: 105, rating: 5 }
    ]
  },
  {
    id: 'u-ren',
    name: 'Ren Takahashi',
    online: true,
    isFriend: true,
    activityTr: 'Elden Ring Shadow of the Erdtree oynuyor ⚔️',
    activityEn: 'Playing Elden Ring DLC ⚔️',
    character: { gender: 'boy', hairStyle: 'spiky_cool', hairColor: 'cobalt_blue', outfit: 'blue_hoodie', accessory: 'headphones' },
    pet: { type: 'dragon', color: 'midnight', accessory: 'crown', affection: 38 },
    gifts: ['astrolabe', 'crystal_trophy', 'moon_lamp', null, null, null],
    collection: [
      { id: 'r1', shelf: 'games', title: 'Elden Ring', titleEn: 'Elden Ring', creator: 'FromSoftware', genre: 'RPG', status: 'Finished', current: 42, total: 42, hoursPlayed: 210, rating: 5 },
      { id: 'r2', shelf: 'manga', title: 'Berserk', titleEn: 'Berserk', creator: 'Kentaro Miura', genre: 'Fantastik', status: 'Reading', current: 310, total: 375, rating: 5 },
      { id: 'r3', shelf: 'shows', title: 'Dark', titleEn: 'Dark', creator: 'Baran bo Odar', genre: 'Gizem', status: 'Finished', current: 26, total: 26, rating: 5 }
    ]
  },
  {
    id: 'u-yuna',
    name: 'Yuna Hoshino',
    online: false,
    isFriend: true,
    activityTr: '2 saat önce çevrimiçiydi • Vagabond okudu',
    activityEn: 'Last seen 2h ago • Read Vagabond',
    character: { gender: 'girl', hairStyle: 'hime_cut', hairColor: 'lavender_mist', outfit: 'cozy_sweater', accessory: 'star_clip' },
    pet: { type: 'bunny', color: 'cream', accessory: 'scarf', affection: 55 },
    gifts: ['sakura_bonsai', 'moon_lamp', null, null, null, null],
    collection: [
      { id: 'y1', shelf: 'manga', title: 'Vagabond', titleEn: 'Vagabond', creator: 'Takehiko Inoue', genre: 'Macera', status: 'Finished', current: 327, total: 327, rating: 5 },
      { id: 'y2', shelf: 'books', title: 'Yüzüklerin Efendisi: Yüzük Kardeşliği', titleEn: 'The Lord of the Rings: The Fellowship of the Ring', creator: 'J.R.R. Tolkien', genre: 'Macera', status: 'Finished', current: 423, total: 423, rating: 5 }
    ]
  },
  {
    id: 'u-sora',
    name: 'Sora Minato',
    online: true,
    isFriend: false,
    activityTr: 'Zelda: Tears of the Kingdom keşfinde 🗺️',
    activityEn: 'Exploring Zelda: TotK 🗺️',
    character: { gender: 'boy', hairStyle: 'wolf_cut', hairColor: 'silver_ash', outfit: 'tech_jacket', accessory: 'gold_chain' },
    pet: { type: 'fox', color: 'calico', accessory: 'bell', affection: 29 },
    gifts: ['moon_lamp', 'gallery_art', 'astrolabe', null, null, null],
    collection: [
      { id: 's11', shelf: 'games', title: 'The Legend of Zelda: Tears of the Kingdom', titleEn: 'The Legend of Zelda: Tears of the Kingdom', creator: 'Nintendo', genre: 'Macera', status: 'Reading', current: 41, total: 50, hoursPlayed: 95, rating: 5 },
      { id: 's12', shelf: 'anime', title: 'Made in Abyss', titleEn: 'Made in Abyss', creator: 'Kinema Citrus', genre: 'Macera', status: 'Finished', current: 25, total: 25, rating: 5 },
      { id: 's13', shelf: 'shows', title: 'Karayip Korsanları: Siyah İnci’nin Laneti', titleEn: 'Pirates of the Caribbean: The Curse of the Black Pearl', creator: 'Gore Verbinski', genre: 'Macera', status: 'Finished', current: 1, total: 1, rating: 4 }
    ]
  },
  {
    id: 'u-mira',
    name: 'Mira Tsukishima',
    online: true,
    isFriend: false,
    activityTr: 'Steins;Gate tekrar izliyor ⏳',
    activityEn: 'Rewatching Steins;Gate ⏳',
    character: { gender: 'girl', hairStyle: 'long_wavy', hairColor: 'honey_blonde', outfit: 'white_blouse', accessory: 'donut' },
    pet: { type: 'shiba', color: 'cream', accessory: 'scarf', affection: 47 },
    gifts: ['gallery_art', 'sakura_bonsai', null, null, null, null],
    collection: [
      { id: 'm11', shelf: 'anime', title: 'Steins;Gate', titleEn: 'Steins;Gate', creator: 'White Fox', genre: 'Bilim Kurgu', status: 'Finished', current: 24, total: 24, rating: 5 },
      { id: 'm12', shelf: 'books', title: 'Sherlock Holmes: Kızıl Dosya', titleEn: 'Sherlock Holmes: A Study in Scarlet', creator: 'Arthur Conan Doyle', genre: 'Gizem', status: 'Finished', current: 192, total: 192, rating: 5 }
    ]
  },
  {
    id: 'u-kaito',
    name: 'Kaito Shimizu',
    online: false,
    isFriend: false,
    activityTr: 'Dün çevrimiçiydi • Dune okuyor',
    activityEn: 'Last seen yesterday • Reading Dune',
    character: { gender: 'boy', hairStyle: 'side_part', hairColor: 'crimson_red', outfit: 'academy_blazer', accessory: 'glasses' },
    pet: { type: 'cat', color: 'mint', accessory: 'crown', affection: 31 },
    gifts: ['astrolabe', null, null, null, null, null],
    collection: [
      { id: 'k11', shelf: 'books', title: 'Dune', titleEn: 'Dune', creator: 'Frank Herbert', genre: 'Bilim Kurgu', status: 'Reading', current: 510, total: 688, rating: 5 },
      { id: 'k12', shelf: 'games', title: 'Hollow Knight', titleEn: 'Hollow Knight', creator: 'Team Cherry', genre: 'Macera', status: 'Reading', current: 48, total: 63, hoursPlayed: 52, rating: 4 }
    ]
  }
];

const MUSIC_TRACKS = [
  { id: 'cozy_lofi', cat: 'Cozy', nameTr: 'Yağmurlu Lo-Fi Piyano', nameEn: 'Rainy Lo-Fi Piano', freqs: [261.63, 329.63, 392.0, 493.88], tempo: 650 },
  { id: 'medieval_lute', cat: 'Medieval', nameTr: 'Şömine & Ortaçağ Lutu', nameEn: 'Hearth & Medieval Lute', freqs: [220.0, 261.63, 329.63, 440.0], tempo: 520 },
  { id: 'summer_breeze', cat: 'Summer', nameTr: 'Yaz Esintisi Akorları', nameEn: 'Summer Breeze Chords', freqs: [293.66, 369.99, 440.0, 554.37], tempo: 580 },
  { id: 'cyber_synth', cat: 'Energetic', nameTr: 'Neon Gece Sentezi', nameEn: 'Neon Night Synth', freqs: [196.0, 246.94, 293.66, 392.0], tempo: 380 }
];

const DEFAULT_STATE = {
  lang: 'tr',
  ambiance: 'cozy',
  weather: 'sunny',
  fireplaceOn: true,
  items: INITIAL_ITEMS,
  character: {
    gender: 'girl',
    hairStyle: 'side_ponytail',
    hairColor: 'sakura_pink',
    outfit: 'white_blouse',
    accessory: 'donut'
  },
  pet: {
    type: 'cat',
    color: 'cream',
    accessory: 'bell',
    affection: 14
  },
  wallSlots: ['moon_lamp', 'sakura_bonsai', 'astrolabe', 'gallery_art', null, null],
  deskSlots: [null, null],
  profiles: ALL_PROFILES,
  notifications: [
    { id: 'n-1', textTr: 'Aoi Kurosawa az önce Frieren 24. bölümü tamamladı!', textEn: 'Aoi Kurosawa just finished Frieren Ep. 24!', time: '2m', unread: true },
    { id: 'n-2', textTr: 'Ren Takahashi senin Elden Ring kaydını beğendi.', textEn: 'Ren Takahashi liked your Elden Ring progress.', time: '14m', unread: true }
  ]
};

/**
 * ============================================================================
 * SMART CONTEXT-AWARE REPLY GENERATOR
 * ============================================================================
 */
function generateSmartReply(userText, senderName, lang, itemTitle = null) {
  const lower = userText.toLowerCase().trim();

  if (lower.includes('how are you') || lower.includes('feeling') || lower.includes('nasılsın') || lower.includes('naber')) {
    return lang === 'tr'
      ? `İyiyim, çok teşekkürler! Sen nasılsın? Bugün raflarına yeni bir şey ekledin mi? 😊`
      : `I'm doing great, thanks for asking! How are you feeling today? Working on anything fun? 😊`;
  }
  if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi' || lower.includes('hey') || lower.includes('selam') || lower.includes('merhaba')) {
    return lang === 'tr'
      ? `Selam! Odamdan yeni çıktım, senin koleksiyonun harika görünüyor 👋`
      : `Hey there! Just checked out your shelves, your collection looks awesome 👋`;
  }
  if (lower.includes('boss') || lower.includes('geçtin') || lower.includes('beat') || lower.includes('kılıç') || lower.includes('sword') || lower.includes('item')) {
    return lang === 'tr'
      ? `${itemTitle ? `${itemTitle} içinde` : 'O bölümde'} sabırlı olup saldırı desenlerini ezberlemek ve yan görevlerdeki gizli tılsımı almak çok işe yarıyor! ⚔️`
      : `In ${itemTitle || 'that part'}, patience and learning the attack pattern plus grabbing the hidden talisman from the side quest makes a huge difference! ⚔️`;
  }
  if (lower.includes('favorite') || lower.includes('favori') || lower.includes('en sevdiğin') || lower.includes('best')) {
    return lang === 'tr'
      ? `Kesinlikle dünya inşası ve müzikleri beni içine çeken yapımlar favorim! Senin en sevdiğin hangisi? ✨`
      : `Definitely stories with deep world-building and unforgettable soundtracks! Which one is your all-time favorite? ✨`;
  }
  if (lower.includes('recommend') || lower.includes('öner') || lower.includes('tavsiye')) {
    return lang === 'tr'
      ? `Eğer macera ve atmosfer arıyorsan Frieren veya Hollow Knight kesinlikle listende üst sıralarda olmalı! 🌟`
      : `If you love adventure and rich atmosphere, Frieren or Hollow Knight should definitely be at the top of your list! 🌟`;
  }
  if (lower.endsWith('?')) {
    return lang === 'tr'
      ? `Çok güzel bir soru! Bence ${itemTitle || 'bu eser'} detaylara dikkat ettikçe daha da keyifli hale geliyor, sen ne düşünüyorsun? 🤔`
      : `That's a great question! Honestly, ${itemTitle || 'this series'} gets even better the more you notice the little details—what do you think? 🤔`;
  }
  return lang === 'tr'
    ? `Kesinlikle katılıyorum! "${userText}" konusunda seninle aynı fikirdeyim, birlikte session yapmak çok keyifli 🙌`
    : `Totally agree with you! Especially about "${userText}"—hanging out in this session is super fun 🙌`;
}

/**
 * ============================================================================
 * ANIME CHARACTER & PET VECTOR AVATARS
 * ============================================================================
 */
function AnimeCharacterAvatar({ config, pose = 'stand', facing = 'right', isWalking = false }) {
  const { gender = 'girl', hairStyle, hairColor, outfit, accessory } = config;
  const hairPalette =
    gender === 'girl'
      ? GIRL_HAIR_COLORS.find((c) => c.id === hairColor) || GIRL_HAIR_COLORS[0]
      : BOY_HAIR_COLORS.find((c) => c.id === hairColor) || BOY_HAIR_COLORS[0];

  const outfitFill =
    outfit === 'sailor_uniform'
      ? '#1e3a8a'
      : outfit === 'cozy_sweater'
      ? '#f472b6'
      : outfit === 'blue_hoodie'
      ? '#2563eb'
      : outfit === 'tech_jacket'
      ? '#1e293b'
      : outfit === 'academy_blazer'
      ? '#312e81'
      : '#ffffff';

  const isLyingDown = pose === 'sleep';
  const isSitting = pose === 'sit' || pose === 'read';

  return (
    <div
      className={`relative select-none transition-transform duration-500 ${
        isWalking ? 'animate-walk-step' : isLyingDown ? '' : 'animate-cozy-breathe'
      }`}
      style={{
        transform: isLyingDown
          ? 'rotate(90deg) translate(14px, -4px)'
          : isSitting
          ? `${facing === 'left' ? 'scaleX(-1) ' : ''}translateY(10px)`
          : facing === 'left'
          ? 'scaleX(-1)'
          : 'scaleX(1)'
      }}
    >
      <svg className="w-20 h-28 drop-shadow-md overflow-visible" viewBox="0 0 120 155">
        {/* Back Hair Layer */}
        {gender === 'girl' ? (
          <>
            {hairStyle === 'side_ponytail' && (
              <path d="M84 35 C112 32, 116 74, 96 92 C90 76, 88 55, 82 46 Z" fill={hairPalette.dark} />
            )}
            {hairStyle === 'twintails' && (
              <>
                <path d="M26 42 C6 52, 6 95, 22 108 C28 90, 28 65, 34 50 Z" fill={hairPalette.dark} />
                <path d="M94 42 C114 52, 114 95, 98 108 C92 90, 92 65, 86 50 Z" fill={hairPalette.dark} />
              </>
            )}
            {hairStyle === 'long_wavy' && (
              <path d="M24 44 C14 78, 18 112, 32 124 H88 C102 112, 106 78, 96 44 Z" fill={hairPalette.dark} />
            )}
            {hairStyle === 'hime_cut' && (
              <path d="M26 42 L22 112 H98 L94 42 Z" fill={hairPalette.dark} />
            )}
          </>
        ) : (
          <>
            {hairStyle === 'hoodie_messy' && (
              <path d="M24 38 C16 58, 18 88, 30 96 H90 C102 88, 104 58, 96 38 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2" />
            )}
            {hairStyle === 'spiky_cool' && (
              <path d="M24 44 L14 26 L34 22 L46 8 L60 18 L76 8 L88 22 L106 28 L94 46 Z" fill={hairPalette.dark} />
            )}
            {hairStyle === 'wolf_cut' && (
              <path d="M24 44 L16 76 L28 84 L34 68 L86 68 L92 84 L104 76 L96 44 Z" fill={hairPalette.dark} />
            )}
            {hairStyle === 'side_part' && (
              <path d="M28 40 C24 62, 26 74, 34 78 H86 C94 74, 96 62, 92 40 Z" fill={hairPalette.dark} />
            )}
          </>
        )}

        {/* Chibi Legs (Sitting vs Standing) */}
        {isSitting ? (
          <>
            <rect x="42" y="122" width="14" height="16" rx="5" fill="#1e293b" />
            <rect x="64" y="122" width="14" height="16" rx="5" fill="#1e293b" />
          </>
        ) : (
          <>
            <rect x="44" y="122" width="11" height="24" rx="5" fill="#ffe4d6" />
            <rect x="65" y="122" width="11" height="24" rx="5" fill="#ffe4d6" />
            <rect x="42" y="140" width="15" height="9" rx="4" fill="#334155" />
            <rect x="63" y="140" width="15" height="9" rx="4" fill="#334155" />
          </>
        )}

        {/* Torso & Outfit */}
        <path d="M38 86 Q60 80 82 86 L88 125 H32 Z" fill={outfitFill} stroke="#1e293b" strokeWidth="2" />
        {outfit === 'white_blouse' && <polygon points="50,85 60,96 70,85" fill="#bae6fd" />}
        {outfit === 'sailor_uniform' && <path d="M46 85 L60 100 L74 85" fill="none" stroke="#ffffff" strokeWidth="3" />}
        {outfit === 'blue_hoodie' && <path d="M52 86 V106 M68 86 V106" stroke="#93c5fd" strokeWidth="2" />}

        {/* Outfit Accessories */}
        {gender === 'boy' && accessory === 'gold_chain' && (
          <path d="M48 86 Q60 102 72 86" fill="none" stroke="#facc15" strokeWidth="2.5" />
        )}
        {gender === 'boy' && accessory === 'headphones' && (
          <>
            <rect x="42" y="83" width="9" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="69" y="83" width="9" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          </>
        )}

        {/* Head & Chibi Anime Face */}
        <rect x="30" y="24" width="60" height="58" rx="28" fill="#ffe8dc" stroke="#d6a28c" strokeWidth="1.5" />

        {/* Big Expressive Anime Eyes */}
        {isLyingDown ? (
          <>
            <path d="M40 54 Q46 59 52 54" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M68 54 Q74 59 80 54" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="46" cy="54" rx="6.5" ry={gender === 'girl' ? '8.5' : '6.5'} fill={gender === 'girl' ? '#15803d' : '#3b82f6'} />
            <ellipse cx="74" cy="54" rx="6.5" ry={gender === 'girl' ? '8.5' : '6.5'} fill={gender === 'girl' ? '#15803d' : '#3b82f6'} />
            <circle cx="44" cy="51" r="2.6" fill="#ffffff" />
            <circle cx="72" cy="51" r="2.6" fill="#ffffff" />
            <circle cx="48" cy="57" r="1.3" fill="#ffffff" />
            <circle cx="76" cy="57" r="1.3" fill="#ffffff" />
          </>
        )}

        {/* Blush & Cute Mouth */}
        <ellipse cx="37" cy="63" rx="4.5" ry="2.5" fill="#fda4af" opacity="0.7" />
        <ellipse cx="83" cy="63" rx="4.5" ry="2.5" fill="#fda4af" opacity="0.7" />
        <path d="M56 67 Q60 72 64 67" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Front Bangs Layer */}
        {gender === 'girl' ? (
          <>
            <path d="M28 46 C28 18, 92 18, 92 46 C84 36, 74 42, 66 34 C58 43, 46 43, 38 35 C33 41, 30 44, 28 46 Z" fill={hairPalette.main} />
            {hairStyle === 'hime_cut' && (
              <>
                <rect x="27" y="42" width="7" height="36" rx="3" fill={hairPalette.main} />
                <rect x="86" y="42" width="7" height="36" rx="3" fill={hairPalette.main} />
              </>
            )}
            {hairStyle === 'twintails' && (
              <>
                <circle cx="29" cy="40" r="4.5" fill="#f43f5e" />
                <circle cx="91" cy="40" r="4.5" fill="#f43f5e" />
              </>
            )}
          </>
        ) : (
          <>
            {hairStyle === 'hoodie_messy' && (
              <path d="M28 46 C28 18, 92 18, 92 46 L82 34 L72 45 L60 31 L48 45 L38 34 Z" fill={hairPalette.main} />
            )}
            {hairStyle === 'spiky_cool' && (
              <path d="M26 44 L36 22 L48 38 L60 18 L72 38 L84 22 L94 44 L78 36 L60 44 L42 36 Z" fill={hairPalette.main} />
            )}
            {hairStyle === 'wolf_cut' && (
              <path d="M26 52 C26 18, 94 18, 94 52 L84 40 L74 50 L60 36 L46 50 L36 40 Z" fill={hairPalette.main} />
            )}
            {hairStyle === 'side_part' && (
              <path d="M28 44 C30 18, 92 18, 92 42 C76 28, 54 34, 34 48 Z" fill={hairPalette.main} />
            )}
          </>
        )}

        {/* Head / Hand Accessories */}
        {gender === 'girl' && accessory === 'cat_ears' && (
          <>
            <polygon points="32,26 38,8 48,22" fill="#1e293b" />
            <polygon points="88,26 82,8 72,22" fill="#1e293b" />
          </>
        )}
        {gender === 'girl' && accessory === 'star_clip' && (
          <circle cx="78" cy="34" r="5" fill="#facc15" />
        )}
        {gender === 'girl' && accessory === 'donut' && (
          <g transform="translate(52, 92)">
            <circle cx="8" cy="8" r="8" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="3" fill="#ffffff" />
          </g>
        )}
        {gender === 'boy' && accessory === 'glasses' && (
          <g stroke="#0f172a" strokeWidth="2" fill="rgba(255,255,255,0.2)">
            <rect x="37" y="48" width="18" height="12" rx="3" />
            <rect x="65" y="48" width="18" height="12" rx="3" />
            <line x1="55" y1="54" x2="65" y2="54" />
          </g>
        )}

        {/* Open Book when Reading in Armchair */}
        {pose === 'read' && (
          <g transform="translate(38, 94)">
            <polygon points="0,4 22,0 22,18 0,22" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
            <polygon points="44,4 22,0 22,18 44,22" fill="#fffbeb" stroke="#92400e" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

function AnimePetAvatar({ petConfig, isHappy = false }) {
  const { type = 'cat', color = 'cream', accessory = 'bell' } = petConfig;
  const palette = PET_COLORS.find((c) => c.id === color) || PET_COLORS[0];

  return (
    <div
      className={`relative select-none transition-transform duration-300 ${
        isHappy ? 'scale-125 -translate-y-2' : 'animate-pet-bob'
      }`}
    >
      <svg className="w-16 h-16 drop-shadow overflow-visible" viewBox="0 0 80 80">
        {/* Tail */}
        <path d="M56 56 Q74 44 68 30" stroke={palette.ear} strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Ears by Pet Type */}
        {type === 'bunny' ? (
          <>
            <ellipse cx="28" cy="18" rx="5" ry="15" fill={palette.body} stroke={palette.ear} strokeWidth="2" />
            <ellipse cx="52" cy="18" rx="5" ry="15" fill={palette.body} stroke={palette.ear} strokeWidth="2" />
          </>
        ) : type === 'dragon' ? (
          <>
            <polygon points="24,26 18,10 34,22" fill="#f59e0b" />
            <polygon points="56,26 62,10 46,22" fill="#f59e0b" />
          </>
        ) : (
          <>
            <polygon points="20,30 24,10 38,24" fill={palette.ear} />
            <polygon points="60,30 56,10 42,24" fill={palette.ear} />
          </>
        )}

        {/* Body & Chibi Head */}
        <ellipse cx="40" cy="54" rx="18" ry="15" fill={palette.body} stroke={palette.ear} strokeWidth="2" />
        <circle cx="40" cy="35" r="20" fill={palette.body} stroke={palette.ear} strokeWidth="2" />

        {/* Eyes */}
        {isHappy ? (
          <>
            <path d="M29 34 Q33 29 37 34" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M43 34 Q47 29 51 34" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="33" cy="34" r="3.5" fill="#1e293b" />
            <circle cx="47" cy="34" r="3.5" fill="#1e293b" />
            <circle cx="32" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="46" cy="33" r="1.2" fill="#ffffff" />
          </>
        )}

        {/* Cheeks & Snout */}
        <ellipse cx="26" cy="40" rx="3.5" ry="2" fill={palette.cheek} opacity="0.8" />
        <ellipse cx="54" cy="40" rx="3.5" ry="2" fill={palette.cheek} opacity="0.8" />
        <path d="M36 41 Q40 45 44 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Pet Accessory */}
        {accessory === 'bell' && (
          <>
            <rect x="27" y="48" width="26" height="4" rx="2" fill="#ef4444" />
            <circle cx="40" cy="53" r="4" fill="#facc15" stroke="#b45309" strokeWidth="1" />
          </>
        )}
        {accessory === 'scarf' && (
          <path d="M25 48 Q40 54 55 48 L52 55 Q40 59 28 55 Z" fill="#e11d48" />
        )}
        {accessory === 'crown' && (
          <polygon points="31,16 35,8 40,14 45,8 49,16" fill="#facc15" stroke="#b45309" strokeWidth="1" />
        )}
      </svg>
    </div>
  );
}

/**
 * ============================================================================
 * MAIN APPLICATION COMPONENT
 * ============================================================================
 */
export default function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [state]);

  const lang = state.lang || 'tr';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.tr;
  const ambianceObj = AMBIANCES[state.ambiance] || AMBIANCES.cozy;

  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState('room');
  const [visitingUserId, setVisitingUserId] = useState(null);
  const [studioOpen, setStudioOpen] = useState(false);
  const [studioTab, setStudioTab] = useState('character');
  const [notifOpen, setNotifOpen] = useState(false);
  const [friendsSubTab, setFriendsSubTab] = useState('my');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [openGenreMenus, setOpenGenreMenus] = useState({});
  const [detailItem, setDetailItem] = useState(null);
  const [addModalShelf, setAddModalShelf] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Room Interactive Character & Pet Positions (Exact furniture anchors)
  const [charPos, setCharPos] = useState({ x: 48, y: 74, pose: 'stand', facing: 'right', speech: '' });
  const [isCharWalking, setIsCharWalking] = useState(false);
  const [petPos, setPetPos] = useState({ x: 36, y: 78, spotTr: '', spotEn: '' });
  const [petHappy, setPetHappy] = useState(false);
  const [petBubble, setPetBubble] = useState('');
  const [activeSlotPicker, setActiveSlotPicker] = useState(null);

  // Cat-Eared Stopwatch & Focus Timer
  const [timerMode, setTimerMode] = useState('stopwatch'); // 'stopwatch' | 'focus'
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [focusSec, setFocusSec] = useState(25 * 60);
  const [laps, setLaps] = useState([]);

  // Ambient Web Audio Synthesizer
  const [activeTrackId, setActiveTrackId] = useState('off');
  const audioCtxRef = useRef(null);
  const musicTimerRef = useRef(null);

  // Chats (Bilingual seeded messages + live user messages)
  const [activeChatRoom, setActiveChatRoom] = useState('group-cozy');
  const [chatInput, setChatInput] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const [chatHistories, setChatHistories] = useState({
    'group-cozy': [
      {
        sender: 'Aoi Kurosawa',
        textTr: 'Frieren 24. bölümdeki büyü sınavı sahnesi inanılmazdı! ✨',
        textEn: 'The mage exam scene in Frieren Ep. 24 was incredible! ✨',
        time: '20:41'
      },
      {
        sender: 'Ren Takahashi',
        textTr: 'Katılıyorum, müzikleri de sahneyi bambaşka seviyeye taşımış.',
        textEn: 'Agreed, the soundtrack elevated that whole scene to another level.',
        time: '20:43'
      },
      {
        sender: 'Sora Minato',
        textTr: 'Bu akşam yeni bir maceraya başlayan var mı?',
        textEn: 'Anyone starting a new adventure tonight?',
        time: '20:45'
      }
    ],
    'group-rpg': [
      {
        sender: 'Ren Takahashi',
        textTr: 'Elden Ring DLC’de yeni kılıcı deneyen var mı?',
        textEn: 'Has anyone tried the new greatsword in the Elden Ring DLC?',
        time: '19:15'
      }
    ],
    'dm-u-aoi': [
      {
        sender: 'Aoi Kurosawa',
        textTr: 'Selam! Bugün raflarına yeni kitap veya anime ekledin mi? 🌸',
        textEn: 'Hey! Did you add any new books or anime to your shelves today? 🌸',
        time: '18:20'
      }
    ],
    'dm-u-ren': [],
    'dm-u-yuna': [
      {
        sender: 'Yuna Hoshino',
        textTr: 'Vagabond bitince mutlaka haber ver, üzerine konuşalım!',
        textEn: 'Let me know once you finish Vagabond so we can talk about it!',
        time: '14:10'
      }
    ]
  });

  // Session-stable randomized similarity offset per profile
  const similaritySeeds = useMemo(() => {
    const map = {};
    ALL_PROFILES.forEach((p, idx) => {
      map[p.id] = ((idx * 23 + Math.floor(Math.random() * 41)) % 79) + 14;
    });
    return map;
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const handlePetClick = (e) => {
    e.stopPropagation();
    const petTypeObj = PET_TYPES.find((pt) => pt.id === activePet.type) || PET_TYPES[0];
    setPetHappy(true);
    setPetBubble(`${petTypeObj.sound} ♥`);
    if (!visitingUser) {
      setState((prev) => ({
        ...prev,
        pet: { ...prev.pet, affection: (prev.pet.affection || 12) + 1 }
      }));
    }
    setTimeout(() => {
      setPetHappy(false);
      setPetBubble('');
    }, 1800);
  };

  // Stopwatch Interval
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      if (timerMode === 'stopwatch') {
        setElapsedSec((s) => s + 1);
      } else {
        setFocusSec((s) => (s > 0 ? s - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning, timerMode]);

  // Ambient Web Audio Engine
  useEffect(() => {
    if (musicTimerRef.current) {
      clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
    }
    if (activeTrackId === 'off') return;
    const track = MUSIC_TRACKS.find((tr) => tr.id === activeTrackId);
    if (!track) return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    let step = 0;
    musicTimerRef.current = setInterval(() => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = track.id === 'cyber_synth' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(track.freqs[step % track.freqs.length], now);
      step += 1;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.95);
    }, track.tempo);

    return () => {
      if (musicTimerRef.current) clearInterval(musicTimerRef.current);
    };
  }, [activeTrackId]);

  // Move Character Smoothly Across Room
  const moveCharacterTo = (targetX, targetY, pose, speechTr, speechEn, customFacing = null) => {
    setIsCharWalking(true);
    setCharPos((prev) => ({
      ...prev,
      x: targetX,
      y: targetY,
      pose: 'stand',
      facing: customFacing || (targetX < prev.x ? 'left' : 'right'),
      speech: lang === 'tr' ? speechTr : speechEn
    }));
    setTimeout(() => {
      setIsCharWalking(false);
      setCharPos((prev) => ({ ...prev, pose }));
    }, 620);
  };

  // Autonomous Pet Hopping directly onto Windowsill, Bed, Desk, Armchair & Rug
  useEffect(() => {
    const spots = [
      { x: 18, y: 39, labelTr: 'Pencere pervazına çıktı!', labelEn: 'Perched on the windowsill!' },
      { x: 12, y: 77, labelTr: 'Yatağın üstüne zıpladı!', labelEn: 'Hopped onto the bed!' },
      { x: 70, y: 69, labelTr: 'Çalışma masasına çıktı!', labelEn: 'Jumped onto the study desk!' },
      { x: 92, y: 76, labelTr: 'Okuma koltuğuna kuruldu!', labelEn: 'Curled up in the armchair!' },
      { x: 46, y: 80, labelTr: 'Halıda geziniyor~', labelEn: 'Strolling on the rug~' }
    ];
    const id = setInterval(() => {
      const next = spots[Math.floor(Math.random() * spots.length)];
      setPetPos({ x: next.x, y: next.y, spotTr: next.labelTr, spotEn: next.labelEn });
    }, 6200);
    return () => clearInterval(id);
  }, []);

  // Open Item-Specific Discussion Room
  const openItemChat = (item) => {
    const roomId = `item-${item.id}`;
    const displayTitle = lang === 'en' && item.titleEn ? item.titleEn : item.title;
    if (!chatHistories[roomId]) {
      const seedMessages = [
        [
          {
            sender: 'Aoi Kurosawa',
            textTr: `${item.title} atmosferi gerçekten büyüleyici! En sevdiğin sahne hangisiydi?`,
            textEn: `The atmosphere in ${item.titleEn || item.title} is truly captivating! Which scene was your favorite?`,
            time: '21:10'
          },
          {
            sender: 'Ren Takahashi',
            textTr: `Özellikle ${item.genre} türündeki temposu harika işlenmiş.`,
            textEn: `Especially the pacing in this genre was handled so well.`,
            time: '21:12'
          },
          {
            sender: 'Sora Minato',
            textTr: `Gizli detayları fark ettiniz mi? İkinci kez bakınca çok şey çıkıyor!`,
            textEn: `Did you catch all the hidden details? Re-experiencing it reveals so much!`,
            time: '21:14'
          }
        ],
        [
          {
            sender: 'Mira Tsukishima',
            textTr: `${item.title} müzikleri hala aklımda çalıyor 🎧`,
            textEn: `The soundtrack of ${item.titleEn || item.title} is still stuck in my head 🎧`,
            time: '19:40'
          }
        ],
        []
      ];
      const chosenSeed = seedMessages[displayTitle.length % seedMessages.length];
      setChatHistories((prev) => ({ ...prev, [roomId]: chosenSeed }));
    }
    setActiveChatRoom(roomId);
    setDetailItem(null);
    setActiveTab('chats');
  };

  // Send Chat Message & Trigger 3.5s Context-Aware Online Reply
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatHistories((prev) => ({
      ...prev,
      [activeChatRoom]: [...(prev[activeChatRoom] || []), { sender: 'You', text, time: nowStr }]
    }));
    setChatInput('');

    let responder = null;
    let itemContext = null;

    if (activeChatRoom.startsWith('dm-')) {
      const targetId = activeChatRoom.replace('dm-', '');
      const friend = state.profiles.find((p) => p.id === targetId);
      if (friend && friend.online) responder = friend;
    } else {
      const onlineFriends = state.profiles.filter((p) => p.isFriend && p.online);
      if (onlineFriends.length > 0) {
        responder = onlineFriends[Math.floor(Math.random() * onlineFriends.length)];
      }
      if (activeChatRoom.startsWith('item-')) {
        const itemId = activeChatRoom.replace('item-', '');
        const found = state.items.find((i) => i.id === itemId);
        if (found) itemContext = lang === 'en' && found.titleEn ? found.titleEn : found.title;
      }
    }

    if (responder) {
      setTypingUser(responder.name);
      setTimeout(() => {
        setTypingUser('');
        const replyTr = generateSmartReply(text, responder.name, 'tr', itemContext);
        const replyEn = generateSmartReply(text, responder.name, 'en', itemContext);
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatHistories((prev) => ({
          ...prev,
          [activeChatRoom]: [
            ...(prev[activeChatRoom] || []),
            { sender: responder.name, textTr: replyTr, textEn: replyEn, time: replyTime }
          ]
        }));
      }, 3500);
    }
  };

  // Scoped Reset: Resets Room Furniture & Character Look ONLY (Preserves Friends, Collection & Ambiance)
  const handleScopedReset = () => {
    setState((prev) => ({
      ...prev,
      character: DEFAULT_STATE.character,
      pet: { ...DEFAULT_STATE.pet, affection: prev.pet.affection },
      wallSlots: DEFAULT_STATE.wallSlots,
      deskSlots: DEFAULT_STATE.deskSlots
    }));
    setCharPos({ x: 48, y: 74, pose: 'stand', facing: 'right', speech: '' });
    showToast(t.resetDoneToast);
  };

  // Determine Active Room Owner (User vs Visited Friend)
  const visitingUser = state.profiles.find((p) => p.id === visitingUserId) || null;
  const activeCharacter = visitingUser ? visitingUser.character : state.character;
  const activePet = visitingUser ? visitingUser.pet : state.pet;
  const activeItems = visitingUser ? visitingUser.collection : state.items;
  const unlockedGifts = GIFTS_CATALOG.filter((g) => state.items.length >= g.unlockedAt);
  const unreadNotifCount = state.notifications.filter((n) => n.unread).length;

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ fontFamily: ambianceObj.fontFamily }} className={`min-h-screen transition-colors duration-500 pb-16 ${ambianceObj.pageBg}`}>
      {/* KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes rainDiagonal {
          0% { transform: translateY(-20px) translateX(10px); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translateY(190px) translateX(-35px); opacity: 0.2; }
        }
        .weather-rain {
          position: absolute;
          top: -15px;
          width: 2px;
          height: 18px;
          background: linear-gradient(to bottom, transparent, #bae6fd);
          animation: rainDiagonal linear infinite;
        }
        @keyframes snowDrift {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0.95; }
          50% { transform: translateY(90px) translateX(14px); }
          100% { transform: translateY(190px) translateX(-10px); opacity: 0.25; }
        }
        .weather-snow {
          position: absolute;
          top: -10px;
          background: #ffffff;
          border-radius: 999px;
          box-shadow: 0 0 8px #ffffff;
          animation: snowDrift ease-in-out infinite;
        }
        @keyframes sunSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-sun-spin {
          animation: sunSpin 18s linear infinite;
        }
        @keyframes shootingStar {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(-120px, 80px) scale(0.2); opacity: 0; }
        }
        .animate-shooting-star {
          animation: shootingStar 4.5s ease-in infinite;
        }
        @keyframes walkStep {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-7px) rotate(2deg); }
        }
        .animate-walk-step {
          animation: walkStep 0.32s ease-in-out infinite;
        }
        @keyframes cozyBreathe {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(-2px) scaleY(1.015); }
        }
        .animate-cozy-breathe {
          animation: cozyBreathe 2.8s ease-in-out infinite;
        }
        @keyframes petIdleBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-pet-bob {
          animation: petIdleBob 1.9s ease-in-out infinite;
        }
      `}</style>

      {/* TOAST BANNER */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl border border-emerald-300/40">
          ✨ {toastMsg}
        </div>
      )}

      {/* ====================================================================
          TOP NAVIGATION HEADER
         ==================================================================== */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b ${ambianceObj.panelBg}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center shadow">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg leading-none">{t.appTitle}</h1>
              <p className="text-[11px] opacity-75 mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-black/25 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('room')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'room' ? 'bg-amber-500 text-slate-950 shadow' : 'hover:bg-white/10'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.tabRoom}</span>
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'friends' ? 'bg-amber-500 text-slate-950 shadow' : 'hover:bg-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.tabFriends}</span>
            </button>
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'chats' ? 'bg-amber-500 text-slate-950 shadow' : 'hover:bg-white/10'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.tabChats}</span>
            </button>
          </div>

          {/* Right Controls: Ambiance, Weather, Studio, Notifications, Language */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Ambiance Selector */}
            <select
              value={state.ambiance}
              onChange={(e) => setState((p) => ({ ...p, ambiance: e.target.value }))}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-black/35 border border-white/15 focus:outline-none cursor-pointer"
              aria-label="Ambiance"
            >
              {Object.values(AMBIANCES).map((amb) => (
                <option key={amb.id} value={amb.id} className="bg-slate-900 text-white">
                  🎨 {lang === 'tr' ? amb.nameTr : amb.nameEn}
                </option>
              ))}
            </select>

            {/* Weather Selector */}
            <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/10">
              {[
                { id: 'sunny', icon: Sun },
                { id: 'rainy', icon: CloudRain },
                { id: 'snowy', icon: Snowflake },
                { id: 'starry', icon: Moon }
              ].map((w) => {
                const IconComp = w.icon;
                return (
                  <button
                    key={w.id}
                    onClick={() => setState((p) => ({ ...p, weather: w.id }))}
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      state.weather === w.id ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>

            {/* Cosmetic Studio Button */}
            <button
              onClick={() => setStudioOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow hover:brightness-110 transition cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.studioBtn}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="relative p-2 rounded-xl bg-black/30 hover:bg-black/50 border border-white/10 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl p-4 shadow-2xl border z-50 ${ambianceObj.modalBg}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-extrabold text-xs">{t.notificationsTitle}</span>
                    <button
                      onClick={() =>
                        setState((p) => ({
                          ...p,
                          notifications: p.notifications.map((n) => ({ ...n, unread: false }))
                        }))
                      }
                      className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                    >
                      {t.markAllRead}
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {state.notifications.length === 0 ? (
                      <p className="text-xs opacity-60">{t.noNotifications}</p>
                    ) : (
                      state.notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl text-xs border ${
                            n.unread ? 'bg-amber-500/15 border-amber-400/35' : 'bg-black/25 border-white/10 opacity-75'
                          }`}
                        >
                          <p>{lang === 'tr' ? n.textTr : n.textEn}</p>
                          <span className="text-[10px] opacity-60 mt-1 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* TR / EN Language Toggle */}
            <button
              onClick={() => setState((p) => ({ ...p, lang: p.lang === 'tr' ? 'en' : 'tr' }))}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-black/35 border border-white/15 hover:bg-black/55 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* VISITING FRIEND BANNER */}
      {visitingUser && (
        <div className="bg-indigo-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
          <span>
            👀 {t.visitingBanner} <strong>{visitingUser.name}</strong> ({lang === 'tr' ? visitingUser.activityTr : visitingUser.activityEn})
          </span>
          <button
            onClick={() => setVisitingUserId(null)}
            className="px-3 py-1 rounded-lg bg-white text-indigo-900 font-extrabold hover:bg-indigo-100 transition cursor-pointer"
          >
            {t.returnMyRoom}
          </button>
        </div>
      )}

      {/* ====================================================================
          TAB 1: MY ROOM & 5 BOOKSHELVES
         ==================================================================== */}
      {activeTab === 'room' && (
        <main className="max-w-7xl mx-auto px-4 pt-5 space-y-8">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* INTERACTIVE ANIME ROOM (9 Columns) */}
            <div className={`lg:col-span-9 rounded-3xl overflow-hidden shadow-xl ${ambianceObj.borderStyle}`}>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pctX = Math.max(16, Math.min(84, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
                  moveCharacterTo(pctX, 74, 'stand', 'Odayı geziyorum~ ✨', 'Exploring the room~ ✨');
                }}
                className={`relative h-[410px] sm:h-[450px] w-full bg-gradient-to-b ${ambianceObj.wallGradient} cursor-pointer select-none overflow-hidden`}
              >
                {/* Wall Baseboard Trim (at bottom-28) */}
                <div className="absolute bottom-28 inset-x-0 h-2.5 bg-amber-950/40 border-t border-white/20" />
                {/* Wooden Plank Floor */}
                <div className={`absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b ${ambianceObj.floorGradient} border-t-2 border-amber-950/40`} />
                {/* Patterned Cozy Center Rug */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-80 sm:w-[440px] h-14 rounded-full bg-rose-900/35 border-2 border-amber-200/40 shadow-inner" />

                {/* 1. PANORAMIC LIVE ANIMATED WINDOW (Top Left) */}
                <div className="absolute top-3 left-5 sm:left-8 flex flex-col items-center z-10">
                  <div className="relative w-52 sm:w-64 h-36 sm:h-40 rounded-t-3xl rounded-b-md border-[6px] border-amber-950/90 shadow-2xl overflow-hidden bg-slate-900">
                    {state.weather === 'sunny' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100">
                        <div className="absolute top-3 right-4 w-11 h-11 rounded-full bg-amber-300 shadow-[0_0_28px_10px_rgba(253,224,71,0.9)] animate-sun-spin border-2 border-dashed border-amber-100" />
                        <div className="absolute top-6 left-5 text-xl animate-bounce">🎈</div>
                        <div className="absolute top-11 left-16 w-16 h-5 bg-white/85 rounded-full animate-pulse" />
                        <div className="absolute -bottom-2 -left-3 w-36 h-11 rounded-full bg-emerald-500" />
                        <div className="absolute -bottom-3 right-0 w-40 h-12 rounded-full bg-emerald-600" />
                      </div>
                    )}
                    {state.weather === 'rainy' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-600">
                        {Array.from({ length: 22 }).map((_, i) => (
                          <span
                            key={i}
                            className="weather-rain"
                            style={{
                              left: `${(i * 13) % 100}%`,
                              animationDelay: `${(i % 5) * 0.2}s`,
                              animationDuration: `${0.55 + (i % 3) * 0.15}s`
                            }}
                          />
                        ))}
                        <div className="absolute bottom-0 inset-x-0 h-9 bg-slate-950/80" />
                      </div>
                    )}
                    {state.weather === 'snowy' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-800 to-sky-900">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <span
                            key={i}
                            className="weather-snow"
                            style={{
                              left: `${(i * 17) % 98}%`,
                              width: `${4 + (i % 3) * 2}px`,
                              height: `${4 + (i % 3) * 2}px`,
                              animationDelay: `${(i % 6) * 0.35}s`,
                              animationDuration: `${2.1 + (i % 4) * 0.5}s`
                            }}
                          />
                        ))}
                        <div className="absolute bottom-0 inset-x-0 h-6 bg-white/90 rounded-t-xl" />
                      </div>
                    )}
                    {state.weather === 'starry' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#060918] via-[#111936] to-[#1e1b4b]">
                        <div className="absolute top-4 right-5 w-8 h-8 rounded-full bg-amber-100 shadow-[0_0_18px_rgba(254,243,199,0.85)]" />
                        <div className="absolute top-5 right-8 w-2 h-2 rounded-full bg-white animate-shooting-star" />
                        {Array.from({ length: 14 }).map((_, i) => (
                          <span
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white animate-ping"
                            style={{
                              top: `${(i * 19) % 75}%`,
                              left: `${(i * 23) % 90}%`,
                              animationDuration: `${2 + (i % 3)}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-amber-950/90 pointer-events-none" />
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-amber-950/90 pointer-events-none" />
                  </div>
                  {/* Wooden Windowsill */}
                  <div className="w-56 sm:w-72 h-2.5 rounded-full bg-amber-950 shadow-md" />
                </div>

                {/* 2. WALL DISPLAY SHELVES (Top Right - 6 Clickable Gift Slots) */}
                <div className="absolute top-3 right-5 sm:right-8 w-44 sm:w-56 space-y-2 z-10">
                  {[0, 1].map((row) => (
                    <div key={row} className="bg-amber-950/20 backdrop-blur-xs p-2 rounded-xl border border-amber-900/30">
                      <div className="grid grid-cols-3 gap-1.5">
                        {[0, 1, 2].map((col) => {
                          const slotIdx = row * 3 + col;
                          const giftId = (visitingUser ? visitingUser.gifts[slotIdx] : state.wallSlots[slotIdx]) || null;
                          const giftObj = GIFTS_CATALOG.find((g) => g.id === giftId);
                          return (
                            <button
                              key={slotIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!visitingUser) setActiveSlotPicker({ area: 'wall', index: slotIdx });
                              }}
                              title={giftObj ? (lang === 'tr' ? giftObj.nameTr : giftObj.nameEn) : 'Hediye Yerleştir'}
                              className="h-9 rounded-lg bg-white/25 hover:bg-white/45 border border-dashed border-white/50 flex items-center justify-center text-xl transition cursor-pointer"
                            >
                              {giftObj ? giftObj.emoji : <Plus className="w-3.5 h-3.5 opacity-60" />}
                            </button>
                          );
                        })}
                      </div>
                      <div className="h-2 mt-1.5 rounded-full bg-amber-900 shadow" />
                    </div>
                  ))}
                </div>

                {/* 3. COZY BED (Bottom Left - Clicking Lies Character Directly on Mattress) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveCharacterTo(12, 77, 'sleep', 'Yumuşacık yatağa uzandım... zZ 🛏️', 'Lying down on the cozy bed... zZ 🛏️', 'right');
                  }}
                  title={lang === 'tr' ? 'Yatağa Uzan' : 'Lie on Bed'}
                  className="absolute bottom-14 left-3 sm:left-5 group hover:scale-105 transition cursor-pointer z-10"
                >
                  <svg className="w-36 sm:w-44 h-24 drop-shadow-lg overflow-visible" viewBox="0 0 150 95">
                    <rect x="4" y="14" width="12" height="72" rx="4" fill="#5c3a21" stroke="#3b2313" strokeWidth="2" />
                    <rect x="134" y="42" width="10" height="44" rx="3" fill="#5c3a21" stroke="#3b2313" strokeWidth="2" />
                    <rect x="12" y="64" width="126" height="14" rx="3" fill="#784b2a" stroke="#3b2313" strokeWidth="2" />
                    <rect x="16" y="46" width="118" height="20" rx="6" fill="#fffbeb" stroke="#d6d3d1" strokeWidth="1.5" />
                    <rect x="18" y="34" width="32" height="15" rx="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <path d="M52 44 H134 V66 H52 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
                    <path d="M52 44 H68 V66 H52 Z" fill="#fda4af" />
                    <rect x="8" y="84" width="7" height="9" fill="#3b2313" />
                    <rect x="135" y="84" width="7" height="9" fill="#3b2313" />
                  </svg>
                </button>

                {/* 4. TALL WOODEN BOOKSHELF */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveCharacterTo(92, 76, 'read', 'Kitaplıktan kitap aldım, koltuğa geçiyorum! 📖', 'Grabbed a book, heading to the armchair! 📖', 'left');
                  }}
                  title={lang === 'tr' ? 'Kitap Al ve Koltukta Oku' : 'Grab Book & Read in Armchair'}
                  className="absolute bottom-24 left-[27%] hover:scale-105 transition cursor-pointer z-10"
                >
                  <svg className="w-16 sm:w-20 h-32 drop-shadow-lg" viewBox="0 0 80 130">
                    <rect x="4" y="4" width="72" height="122" rx="5" fill="#6b4428" stroke="#3e2412" strokeWidth="3" />
                    <rect x="10" y="10" width="60" height="110" fill="#472b17" />
                    <rect x="10" y="44" width="60" height="4" fill="#7c4f2e" />
                    <rect x="10" y="80" width="60" height="4" fill="#7c4f2e" />
                    <rect x="14" y="16" width="8" height="28" rx="1" fill="#ef4444" />
                    <rect x="23" y="19" width="7" height="25" rx="1" fill="#3b82f6" />
                    <rect x="31" y="15" width="9" height="29" rx="1" fill="#10b981" />
                    <rect x="41" y="20" width="8" height="24" rx="1" fill="#f59e0b" />
                    <rect x="15" y="52" width="9" height="28" rx="1" fill="#8b5cf6" />
                    <rect x="25" y="55" width="8" height="25" rx="1" fill="#ec4899" />
                    <rect x="34" y="50" width="8" height="30" rx="1" fill="#14b8a6" />
                    <rect x="16" y="88" width="10" height="30" rx="1" fill="#f97316" />
                    <rect x="28" y="92" width="8" height="26" rx="1" fill="#06b6d4" />
                  </svg>
                </button>

                {/* 5. BRICK FIREPLACE WITH CHIMNEY (Flush on Floor Baseboard) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!visitingUser) {
                      setState((p) => ({ ...p, fireplaceOn: !p.fireplaceOn }));
                    }
                    moveCharacterTo(42, 74, 'stand', 'Şömine başında ısınalım 🔥', 'Warming up by the fireplace 🔥');
                  }}
                  title={state.fireplaceOn ? t.fireplaceOn : t.fireplaceOff}
                  className="absolute bottom-24 left-[42%] -translate-x-1/2 hover:scale-105 transition cursor-pointer z-10"
                >
                  <svg className="w-24 sm:w-28 h-36 drop-shadow-xl" viewBox="0 0 110 150">
                    <rect x="32" y="0" width="46" height="62" fill="#78716c" stroke="#44403c" strokeWidth="2" />
                    <rect x="6" y="58" width="98" height="10" rx="3" fill="#5c3a21" stroke="#3b2313" strokeWidth="2" />
                    <rect x="12" y="68" width="86" height="74" rx="3" fill="#9a3412" stroke="#431407" strokeWidth="2.5" />
                    <rect x="4" y="140" width="102" height="10" rx="2" fill="#57534e" stroke="#292524" strokeWidth="2" />
                    <path d="M28 140 V100 A27 24 0 0 1 82 100 V140 Z" fill="#1c1917" stroke="#292524" strokeWidth="3" />
                    <rect x="36" y="128" width="38" height="7" rx="3" fill="#78350f" />
                    {state.fireplaceOn && (
                      <>
                        <path
                          d="M55 90 C44 104, 38 118, 46 130 C50 134, 60 134, 64 130 C72 118, 66 104, 55 90 Z"
                          fill="#f97316"
                          className="animate-pulse"
                        />
                        <path
                          d="M55 102 C49 111, 47 121, 52 128 C54 130, 56 130, 58 128 C63 121, 61 111, 55 102 Z"
                          fill="#facc15"
                        />
                      </>
                    )}
                  </svg>
                </button>

                {/* 6. STUDY DESK + SWIVEL CHAIR + 2 GIFT SLOTS */}
                <div className="absolute bottom-16 left-[66%] -translate-x-1/2 flex items-end gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveCharacterTo(55, 76, 'sit', 'Sandalyeye oturdum, çalışmaya hazırım! 💻', 'Sitting in the desk chair! 💻', 'right');
                    }}
                    title={lang === 'tr' ? 'Sandalyeye Otur' : 'Sit on Chair'}
                    className="hover:scale-105 transition cursor-pointer"
                  >
                    <svg className="w-12 h-20 drop-shadow-md" viewBox="0 0 50 85">
                      <rect x="8" y="8" width="26" height="32" rx="7" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                      <rect x="10" y="42" width="32" height="8" rx="4" fill="#475569" stroke="#0f172a" strokeWidth="2" />
                      <rect x="23" y="50" width="5" height="22" fill="#1e293b" />
                      <path d="M10 76 H40" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </button>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      moveCharacterTo(55, 76, 'sit', 'Çalışma masasına geçtim! ✨', 'Stepped up to the study desk! ✨', 'right');
                    }}
                    className="relative w-40 sm:w-48 h-20 rounded-t-xl bg-gradient-to-b from-[#9c6334] to-[#6e421e] border-2 border-amber-950 shadow-xl px-2 py-1.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xl leading-none">💻</span>
                      <span className="text-[9px] font-extrabold text-amber-100 mt-0.5">Code</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg leading-none">📚</span>
                      <span className="text-[9px] font-extrabold text-amber-100 mt-0.5">Notes</span>
                    </div>
                    <span className="text-base">☕</span>

                    <div className="flex gap-1">
                      {[0, 1].map((dIdx) => {
                        const gId = state.deskSlots[dIdx];
                        const gObj = GIFTS_CATALOG.find((g) => g.id === gId);
                        return (
                          <button
                            key={dIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!visitingUser) setActiveSlotPicker({ area: 'desk', index: dIdx });
                            }}
                            className="w-8 h-8 rounded-lg bg-amber-950/55 border border-dashed border-amber-200/60 flex items-center justify-center text-base hover:bg-amber-900 cursor-pointer"
                            title="Masaya Hediye Koy"
                          >
                            {gObj ? gObj.emoji : '+'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 7. PLUSH COZY READING ARMCHAIR (Bottom Right - Clicking Seats Character Squarely Inside) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveCharacterTo(92, 76, 'read', 'Yumuşak okuma koltuğuna kuruldum~ 📚', 'Relaxing in the plush armchair~ 📚', 'left');
                  }}
                  title={lang === 'tr' ? 'Okuma Koltuğuna Otur' : 'Sit in Reading Armchair'}
                  className="absolute bottom-14 right-3 sm:right-6 hover:scale-105 transition cursor-pointer z-10"
                >
                  <svg className="w-20 sm:w-24 h-24 drop-shadow-xl" viewBox="0 0 100 95">
                    <rect x="16" y="10" width="68" height="48" rx="16" fill="#be123c" stroke="#881337" strokeWidth="2.5" />
                    <rect x="6" y="34" width="18" height="42" rx="8" fill="#e11d48" stroke="#881337" strokeWidth="2" />
                    <rect x="76" y="34" width="18" height="42" rx="8" fill="#e11d48" stroke="#881337" strokeWidth="2" />
                    <rect x="20" y="50" width="60" height="24" rx="8" fill="#fb7185" stroke="#881337" strokeWidth="2" />
                    <rect x="16" y="76" width="8" height="12" rx="2" fill="#451a03" />
                    <rect x="76" y="76" width="8" height="12" rx="2" fill="#451a03" />
                  </svg>
                </button>

                {/* WALKING & INTERACTING ANIME CHARACTER */}
                <div
                  style={{
                    left: `${charPos.x}%`,
                    top: `${charPos.y}%`,
                    transition: 'left 0.65s cubic-bezier(0.22, 1, 0.36, 1), top 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                  {charPos.speech && (
                    <div className="mb-1 px-2.5 py-1 rounded-xl bg-white text-slate-900 text-[11px] font-extrabold shadow-lg whitespace-nowrap border border-amber-400">
                      {charPos.speech}
                    </div>
                  )}
                  <AnimeCharacterAvatar
                    config={activeCharacter}
                    pose={charPos.pose}
                    facing={charPos.facing}
                    isWalking={isCharWalking}
                  />
                </div>

                {/* ROAMING & CLIMBING ANIME PET */}
                <div
                  onClick={handlePetClick}
                  style={{
                    left: `${petPos.x}%`,
                    top: `${petPos.y}%`,
                    transition: 'left 1.0s cubic-bezier(0.22, 1, 0.36, 1), top 1.0s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                  title={lang === 'tr' ? 'Hayvanını Sev!' : 'Pet your companion!'}
                >
                  {(petBubble || (lang === 'tr' ? petPos.spotTr : petPos.spotEn)) && (
                    <div className="mb-0.5 px-2 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-extrabold shadow whitespace-nowrap text-center">
                      {petBubble || (lang === 'tr' ? petPos.spotTr : petPos.spotEn)}
                    </div>
                  )}
                  <AnimePetAvatar
                    key={`${activePet.type}-${activePet.color}-${activePet.accessory}`}
                    petConfig={activePet}
                    isHappy={petHappy}
                  />
                </div>

                {/* Bottom Room Status Bar */}
                <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[11px] font-bold text-white/95 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-xl z-20">
                  <span className="truncate">{t.roomHint}</span>
                  <span className="shrink-0 ml-2 flex items-center gap-1 text-pink-300">
                    <Heart className="w-3.5 h-3.5 fill-pink-400" /> {t.petLove}: {activePet.affection || 12}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: CAT-EARED STOPWATCH + AMBIENT MUSIC PLAYER (3 Columns) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4">
              {/* Cute Cat-Eared Stopwatch */}
              <div className={`rounded-3xl p-4 border shadow-lg relative overflow-hidden ${ambianceObj.panelBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-pink-400" />
                    🐱 {t.stopwatchTitle}
                  </span>
                  <div className="flex gap-1 bg-black/30 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerMode('stopwatch');
                      }}
                      className={`px-2 py-0.5 rounded-md cursor-pointer ${
                        timerMode === 'stopwatch' ? 'bg-pink-500 text-white' : 'opacity-70'
                      }`}
                    >
                      {t.swMode}
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerMode('focus');
                      }}
                      className={`px-2 py-0.5 rounded-md cursor-pointer ${
                        timerMode === 'focus' ? 'bg-pink-500 text-white' : 'opacity-70'
                      }`}
                    >
                      {t.focusMode}
                    </button>
                  </div>
                </div>

                <div className="text-center py-3 rounded-2xl bg-black/30 border border-white/10">
                  <div className="text-3xl font-black tracking-wider font-mono text-amber-300">
                    {formatTimer(timerMode === 'stopwatch' ? elapsedSec : focusSec)}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2.5">
                    <button
                      onClick={() => setTimerRunning((r) => !r)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-500 text-slate-950 hover:brightness-110 transition cursor-pointer flex items-center gap-1"
                    >
                      {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{timerRunning ? 'Pause' : 'Start'}</span>
                    </button>
                    {timerMode === 'stopwatch' && (
                      <button
                        onClick={() => setLaps((l) => [formatTimer(elapsedSec), ...l.slice(0, 2)])}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 transition cursor-pointer"
                      >
                        {t.lapBtn}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setElapsedSec(0);
                        setFocusSec(25 * 60);
                        setLaps([]);
                      }}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500/30 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {laps.length > 0 && (
                  <div className="mt-2 flex gap-1.5 flex-wrap">
                    {laps.map((lp, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/35">
                        #{laps.length - idx} {lp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Ambient Music Player */}
              <div className={`rounded-3xl p-4 border shadow-lg flex-1 flex flex-col justify-between ${ambianceObj.panelBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-amber-400" />
                    {t.ambientMusic}
                  </span>
                  {activeTrackId !== 'off' && (
                    <button
                      onClick={() => setActiveTrackId('off')}
                      className="text-[11px] font-bold text-rose-400 hover:underline cursor-pointer"
                    >
                      Stop
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {MUSIC_TRACKS.map((tr) => {
                    const active = activeTrackId === tr.id;
                    return (
                      <button
                        key={tr.id}
                        onClick={() => setActiveTrackId(active ? 'off' : tr.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          active
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'bg-black/25 hover:bg-black/40 border border-white/10'
                        }`}
                      >
                        <span className="truncate">{lang === 'tr' ? tr.nameTr : tr.nameEn}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20">{tr.cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* SEARCH BAR FOR SHELVES */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full pl-10 pr-4 py-2 rounded-2xl text-xs font-bold border focus:outline-none ${ambianceObj.panelBg}`}
              />
            </div>
            <div className="text-xs font-bold opacity-80">
              {activeItems.length} {lang === 'tr' ? 'Kayıtlı Eser' : 'Total Works'}
            </div>
          </div>

          {/* 5 COLLECTION BOOKSHELVES */}
          <section className="space-y-8">
            {SHELVES.map((shelf) => {
              const IconComp = shelf.icon;
              const activeGenre = selectedGenres[shelf.id] || 'ALL';
              const activeStatus = selectedStatuses[shelf.id] || 'ALL';
              const menuOpen = !!openGenreMenus[shelf.id];

              const filteredItems = activeItems.filter((item) => {
                if (item.shelf !== shelf.id) return false;
                if (activeGenre !== 'ALL' && item.genre !== activeGenre) return false;
                if (activeStatus !== 'ALL' && item.status !== activeStatus) return false;
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase();
                  return (
                    item.title.toLowerCase().includes(q) ||
                    (item.creator || '').toLowerCase().includes(q) ||
                    (item.genre || '').toLowerCase().includes(q)
                  );
                }
                return true;
              });

              return (
                <div key={shelf.id}>
                  <div className={`rounded-t-3xl p-5 border-x border-t ${ambianceObj.panelBg}`}>
                    {/* Shelf Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${shelf.accent} text-white flex items-center justify-center shadow`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base">{lang === 'tr' ? shelf.nameTr : shelf.nameEn}</h3>
                          <span className="text-[11px] opacity-70">{filteredItems.length} items</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Collapsible Genre & Status Filter Button */}
                        <button
                          onClick={() => setOpenGenreMenus((p) => ({ ...p, [shelf.id]: !p[shelf.id] }))}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            activeGenre !== 'ALL' || activeStatus !== 'ALL'
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-black/30 border-white/15 hover:bg-black/45'
                          }`}
                        >
                          <Filter className="w-3.5 h-3.5" />
                          <span>
                            {t.genreBtn} & {t.statusBtn} ▾
                          </span>
                        </button>

                        {!visitingUser && (
                          <button
                            onClick={() => setAddModalShelf(shelf.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r ${shelf.accent} shadow hover:brightness-110 transition cursor-pointer`}
                          >
                            {t.addBtn}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Collapsible Filter Drawer */}
                    {menuOpen && (
                      <div className="mb-4 p-3 rounded-2xl bg-black/30 border border-white/10 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-extrabold opacity-75 mr-1">{t.genreBtn}:</span>
                          <button
                            onClick={() => setSelectedGenres((p) => ({ ...p, [shelf.id]: 'ALL' }))}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                              activeGenre === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-white/10'
                            }`}
                          >
                            {t.allFilter}
                          </button>
                          {GENRE_LIST.map((g) => (
                            <button
                              key={g.id}
                              onClick={() => setSelectedGenres((p) => ({ ...p, [shelf.id]: g.id }))}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                                activeGenre === g.id ? 'bg-amber-500 text-slate-950' : 'bg-white/10 hover:bg-white/20'
                              }`}
                            >
                              {lang === 'tr' ? g.tr : g.en}
                            </button>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-extrabold opacity-75 mr-1">{t.statusBtn}:</span>
                          <button
                            onClick={() => setSelectedStatuses((p) => ({ ...p, [shelf.id]: 'ALL' }))}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                              activeStatus === 'ALL' ? 'bg-emerald-500 text-slate-950' : 'bg-white/10'
                            }`}
                          >
                            {t.allFilter}
                          </button>
                          {STATUS_TAGS.map((st) => (
                            <button
                              key={st.id}
                              onClick={() => setSelectedStatuses((p) => ({ ...p, [shelf.id]: st.id }))}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                                activeStatus === st.id ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 hover:bg-white/20'
                              }`}
                            >
                              {st.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Shelf Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredItems.map((item) => {
                        const pct = Math.min(100, Math.round(((item.current || 0) / Math.max(1, item.total || 1)) * 100));
                        const statusObj = STATUS_TAGS.find((s) => s.id === item.status) || STATUS_TAGS[0];
                        const genreObj = GENRE_LIST.find((g) => g.id === item.genre);
                        const displayTitle = lang === 'en' && item.titleEn ? item.titleEn : item.title;

                        return (
                          <div
                            key={item.id}
                            onClick={() => setDetailItem(item)}
                            className="p-4 rounded-2xl bg-black/30 hover:bg-black/45 border border-white/10 transition cursor-pointer flex flex-col justify-between space-y-3"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-extrabold text-sm leading-snug">{displayTitle}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border shrink-0 ${statusObj.badge}`}>
                                  {item.status}
                                </span>
                              </div>
                              <p className="text-xs opacity-70 mt-0.5">
                                {item.creator} • {genreObj ? (lang === 'tr' ? genreObj.tr : genreObj.en) : item.genre}
                              </p>
                            </div>

                            <div className="space-y-2">
                              {/* Star Rating & Game Hours */}
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-0.5 text-amber-400">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={idx}
                                      className={`w-3.5 h-3.5 ${idx < (item.rating || 5) ? 'fill-amber-400' : 'opacity-30'}`}
                                    />
                                  ))}
                                </div>
                                {item.shelf === 'games' && (
                                  <span className="text-[11px] font-bold text-emerald-300">
                                    ⏱️ {item.hoursPlayed || 12}h
                                  </span>
                                )}
                              </div>

                              {/* Progress Bar */}
                              <div>
                                <div className="flex justify-between text-[11px] font-bold mb-1">
                                  <span>
                                    {item.current} / {item.total} {lang === 'tr' ? shelf.unitTr : shelf.unitEn}
                                  </span>
                                  <span>%{pct}</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full bg-gradient-to-r ${shelf.accent}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Wooden Plank */}
                  <div className={`h-4 rounded-b-xl border-t ${ambianceObj.plankClass}`} />
                </div>
              );
            })}
          </section>
        </main>
      )}

      {/* ====================================================================
          TAB 2: SOCIAL FRIENDS & SUGGESTED COLLECTORS
         ==================================================================== */}
      {activeTab === 'friends' && (
        <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFriendsSubTab('my')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer ${
                friendsSubTab === 'my' ? 'bg-amber-500 text-slate-950 shadow' : `${ambianceObj.panelBg} border`
              }`}
            >
              {t.myFriendsTab} ({state.profiles.filter((p) => p.isFriend).length})
            </button>
            <button
              onClick={() => setFriendsSubTab('suggested')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer ${
                friendsSubTab === 'suggested' ? 'bg-amber-500 text-slate-950 shadow' : `${ambianceObj.panelBg} border`
              }`}
            >
              {t.suggestedFriendsTab} ({state.profiles.filter((p) => !p.isFriend).length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.profiles
              .filter((p) => (friendsSubTab === 'my' ? p.isFriend : !p.isFriend))
              .map((person) => {
                const simPct = similaritySeeds[person.id] || 68;
                return (
                  <div key={person.id} className={`p-5 rounded-3xl border shadow-lg flex flex-col justify-between space-y-4 ${ambianceObj.panelBg}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded-2xl bg-black/30 flex items-center justify-center overflow-hidden shrink-0">
                        <div className="scale-75">
                          <AnimeCharacterAvatar config={person.character} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base truncate">{person.name}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              person.online ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/25 text-slate-300'
                            }`}
                          >
                            {person.online ? t.online : t.offline}
                          </span>
                        </div>
                        <p className="text-xs opacity-80 mt-1">{lang === 'tr' ? person.activityTr : person.activityEn}</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-300 text-xs font-extrabold">
                          🎯 {t.similarityLabel}: %{simPct}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          setVisitingUserId(person.id);
                          setActiveTab('room');
                        }}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-extrabold bg-indigo-500 text-white hover:bg-indigo-600 transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.visitRoom}</span>
                      </button>

                      {person.isFriend ? (
                        <button
                          onClick={() => {
                            setActiveChatRoom(`dm-${person.id}`);
                            setActiveTab('chats');
                          }}
                          className="py-2 px-3 rounded-xl text-xs font-extrabold bg-emerald-500 text-slate-950 hover:brightness-110 transition cursor-pointer flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>DM</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              profiles: prev.profiles.map((pr) =>
                                pr.id === person.id ? { ...pr, isFriend: true } : pr
                              )
                            }));
                            showToast(`${person.name} ${lang === 'tr' ? 'arkadaş listene eklendi!' : 'added to friends!'}`);
                          }}
                          className="py-2 px-3 rounded-xl text-xs font-extrabold bg-amber-500 text-slate-950 hover:brightness-110 transition cursor-pointer flex items-center gap-1.5"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>{t.addFriend}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      )}

      {/* ====================================================================
          TAB 3: CHATS (GROUP SESSIONS, ITEM CHATS & DIRECT MESSAGES)
         ==================================================================== */}
      {activeTab === 'chats' && (
        <main className="max-w-6xl mx-auto px-4 pt-6">
          <div className={`grid grid-cols-1 md:grid-cols-12 rounded-3xl border overflow-hidden shadow-2xl min-h-[520px] ${ambianceObj.panelBg}`}>
            {/* Left Channel & DM Sidebar */}
            <div className="md:col-span-4 border-r border-white/10 p-4 space-y-5 bg-black/20">
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider opacity-65 mb-2">{t.groupSessions}</h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'group-cozy', label: '☕ Cozy Reading & Anime Lounge' },
                    { id: 'group-rpg', label: '⚔️ RPG & Boss Tactics Room' },
                    ...Object.keys(chatHistories)
                      .filter((k) => k.startsWith('item-'))
                      .map((k) => {
                        const it = state.items.find((x) => `item-${x.id}` === k);
                        const itTitle = it ? (lang === 'en' && it.titleEn ? it.titleEn : it.title) : 'Item';
                        return { id: k, label: `💬 ${itTitle} Chat` };
                      })
                  ].map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setActiveChatRoom(room.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer truncate ${
                        activeChatRoom === room.id ? 'bg-amber-500 text-slate-950' : 'hover:bg-white/10'
                      }`}
                    >
                      {room.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider opacity-65 mb-2">{t.directMessages}</h4>
                <div className="space-y-1.5">
                  {state.profiles
                    .filter((p) => p.isFriend)
                    .map((friend) => {
                      const dmId = `dm-${friend.id}`;
                      return (
                        <button
                          key={dmId}
                          onClick={() => setActiveChatRoom(dmId)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            activeChatRoom === dmId ? 'bg-amber-500 text-slate-950' : 'hover:bg-white/10'
                          }`}
                        >
                          <span className="truncate">{friend.name}</span>
                          <span className={`w-2 h-2 rounded-full ${friend.online ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Right Active Chat Stream */}
            <div className="md:col-span-8 flex flex-col justify-between p-4">
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-1">
                {(chatHistories[activeChatRoom] || []).map((msg, i) => {
                  const isMe = msg.sender === 'You';
                  const msgBody = isMe
                    ? msg.text
                    : lang === 'en'
                    ? msg.textEn || msg.text
                    : msg.textTr || msg.text;
                  return (
                    <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] opacity-65 mb-0.5">
                        {msg.sender} • {msg.time}
                      </span>
                      <div
                        className={`px-3.5 py-2 rounded-2xl text-xs font-medium max-w-md ${
                          isMe ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-black/35 border border-white/10'
                        }`}
                      >
                        {msgBody}
                      </div>
                    </div>
                  );
                })}
                {typingUser && (
                  <div className="text-xs italic text-amber-300 animate-pulse">
                    {typingUser} {t.typing}
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChatMessage} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t.typeMessage}
                  className="flex-1 px-4 py-2.5 rounded-2xl text-xs font-bold bg-black/35 border border-white/15 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-amber-500 text-slate-950 hover:brightness-110 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.sendBtn}</span>
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          MODAL: GIFT SLOT PLACEMENT PICKER
         ==================================================================== */}
      {activeSlotPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className={`max-w-md w-full rounded-3xl p-5 border shadow-2xl ${ambianceObj.modalBg}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base">🎁 {lang === 'tr' ? 'Hediye Yerleştir' : 'Place Gift'}</h3>
              <button onClick={() => setActiveSlotPicker(null)} className="p-1 rounded-lg hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {unlockedGifts.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => {
                    setState((prev) => {
                      const key = activeSlotPicker.area === 'wall' ? 'wallSlots' : 'deskSlots';
                      const nextArr = [...prev[key]];
                      nextArr[activeSlotPicker.index] = gift.id;
                      return { ...prev, [key]: nextArr };
                    });
                    setActiveSlotPicker(null);
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/30 hover:bg-amber-500/20 border border-white/10 text-left cursor-pointer"
                >
                  <span className="text-2xl">{gift.emoji}</span>
                  <span className="text-xs font-bold">{lang === 'tr' ? gift.nameTr : gift.nameEn}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: COSMETIC STUDIO (CHARACTER, PET & ROOM RESET)
         ==================================================================== */}
      {studioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className={`max-w-2xl w-full max-h-[88vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${ambianceObj.modalBg}`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex gap-2">
                {[
                  { id: 'character', label: lang === 'tr' ? '🌸 Karakter' : '🌸 Character' },
                  { id: 'pet', label: lang === 'tr' ? '🐾 Evcil Hayvan' : '🐾 Companion' },
                  { id: 'room', label: lang === 'tr' ? '🏠 Oda Ayarları' : '🏠 Room Settings' }
                ].map((tb) => (
                  <button
                    key={tb.id}
                    onClick={() => setStudioTab(tb.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer ${
                      studioTab === tb.id ? 'bg-amber-500 text-slate-950' : 'bg-black/30'
                    }`}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>
              <button onClick={() => setStudioOpen(false)} className="p-1.5 rounded-xl hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5">
              {/* LIVE CHARACTER & PET PREVIEW IN COSMETIC STUDIO */}
              {(studioTab === 'character' || studioTab === 'pet') && (
                <div className="flex items-center justify-center gap-8 p-4 rounded-2xl bg-black/35 border border-white/15">
                  <div className="flex flex-col items-center">
                    <AnimeCharacterAvatar config={state.character} />
                    <span className="text-[11px] font-bold opacity-75 mt-1">
                      {lang === 'tr' ? 'Karakter Önizleme' : 'Character Preview'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <AnimePetAvatar
                      key={`preview-${state.pet.type}-${state.pet.color}-${state.pet.accessory}`}
                      petConfig={state.pet}
                      isHappy
                    />
                    <span className="text-[11px] font-bold opacity-75 mt-1">
                      {lang === 'tr' ? 'Hayvan Önizleme' : 'Pet Preview'}
                    </span>
                  </div>
                </div>
              )}

              {studioTab === 'character' && (
                <>
                  {/* Gender Switch */}
                  <div className="flex gap-2">
                    {[
                      { id: 'girl', label: lang === 'tr' ? '🎀 Sevimli Chibi Kız' : '🎀 Cute Chibi Girl' },
                      { id: 'boy', label: lang === 'tr' ? '⚡ Havalı Anime Erkek' : '⚡ Cool Anime Boy' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            character:
                              g.id === 'girl'
                                ? { gender: 'girl', hairStyle: 'side_ponytail', hairColor: 'sakura_pink', outfit: 'white_blouse', accessory: 'donut' }
                                : { gender: 'boy', hairStyle: 'spiky_cool', hairColor: 'cobalt_blue', outfit: 'blue_hoodie', accessory: 'headphones' }
                          }))
                        }
                        className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold border cursor-pointer ${
                          state.character.gender === g.id ? 'bg-pink-500 text-white border-pink-300' : 'bg-black/25 border-white/10'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>

                  {/* Distinct Hair Styles per Gender */}
                  <div>
                    <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Saç Stili' : 'Hair Style'}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(state.character.gender === 'girl' ? GIRL_HAIR_STYLES : BOY_HAIR_STYLES).map((hs) => (
                        <button
                          key={hs.id}
                          onClick={() => setState((p) => ({ ...p, character: { ...p.character, hairStyle: hs.id } }))}
                          className={`p-2.5 rounded-xl text-xs font-bold border text-left cursor-pointer ${
                            state.character.hairStyle === hs.id ? 'border-amber-400 bg-amber-500/20' : 'border-white/10 bg-black/25'
                          }`}
                        >
                          {lang === 'tr' ? hs.nameTr : hs.nameEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Distinct Hair Colors per Gender */}
                  <div>
                    <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Saç Rengi' : 'Hair Color'}</p>
                    <div className="flex flex-wrap gap-2">
                      {(state.character.gender === 'girl' ? GIRL_HAIR_COLORS : BOY_HAIR_COLORS).map((hc) => (
                        <button
                          key={hc.id}
                          onClick={() => setState((p) => ({ ...p, character: { ...p.character, hairColor: hc.id } }))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                            state.character.hairColor === hc.id ? 'border-amber-400 bg-amber-500/20' : 'border-white/10 bg-black/25'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: hc.main }} />
                          <span>{hc.nameTr}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Distinct Outfits & Accessories per Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Kıyafet' : 'Outfit'}</p>
                      <div className="space-y-1.5">
                        {(state.character.gender === 'girl' ? GIRL_OUTFITS : BOY_OUTFITS).map((of) => (
                          <button
                            key={of.id}
                            onClick={() => setState((p) => ({ ...p, character: { ...p.character, outfit: of.id } }))}
                            className={`w-full p-2 rounded-xl text-xs font-bold border text-left cursor-pointer ${
                              state.character.outfit === of.id ? 'border-amber-400 bg-amber-500/20' : 'border-white/10 bg-black/25'
                            }`}
                          >
                            {lang === 'tr' ? of.nameTr : of.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Aksesuar' : 'Accessory'}</p>
                      <div className="space-y-1.5">
                        {(state.character.gender === 'girl' ? GIRL_ACCESSORIES : BOY_ACCESSORIES).map((ac) => (
                          <button
                            key={ac.id}
                            onClick={() => setState((p) => ({ ...p, character: { ...p.character, accessory: ac.id } }))}
                            className={`w-full p-2 rounded-xl text-xs font-bold border text-left cursor-pointer ${
                              state.character.accessory === ac.id ? 'border-amber-400 bg-amber-500/20' : 'border-white/10 bg-black/25'
                            }`}
                          >
                            {lang === 'tr' ? ac.nameTr : ac.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {studioTab === 'pet' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Hayvan Türü' : 'Companion Species'}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PET_TYPES.map((pt) => (
                        <button
                          key={pt.id}
                          onClick={() => setState((p) => ({ ...p, pet: { ...p.pet, type: pt.id } }))}
                          className={`p-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                            state.pet.type === pt.id ? 'border-pink-400 bg-pink-500/20' : 'border-white/10 bg-black/25'
                          }`}
                        >
                          {lang === 'tr' ? pt.nameTr : pt.nameEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Tüy Rengi' : 'Fur Color'}</p>
                    <div className="flex flex-wrap gap-2">
                      {PET_COLORS.map((pc) => (
                        <button
                          key={pc.id}
                          onClick={() => setState((p) => ({ ...p, pet: { ...p.pet, color: pc.id } }))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                            state.pet.color === pc.id ? 'border-pink-400 bg-pink-500/20' : 'border-white/10 bg-black/25'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: pc.body }} />
                          <span>{pc.nameTr}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-extrabold mb-2">{lang === 'tr' ? 'Hayvan Aksesuarı' : 'Pet Accessory'}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PET_ACCESSORIES.map((pa) => (
                        <button
                          key={pa.id}
                          onClick={() => setState((p) => ({ ...p, pet: { ...p.pet, accessory: pa.id } }))}
                          className={`p-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                            state.pet.accessory === pa.id ? 'border-pink-400 bg-pink-500/20' : 'border-white/10 bg-black/25'
                          }`}
                        >
                          {lang === 'tr' ? pa.nameTr : pa.nameEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {studioTab === 'room' && (
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-3">
                  <h4 className="font-extrabold text-sm">{t.resetRoomBtn}</h4>
                  <p className="text-xs opacity-80">{t.resetRoomDesc}</p>
                  <button
                    onClick={handleScopedReset}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" />
                    {t.resetRoomBtn}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: ITEM DETAIL, NOTES, RATING & "JOIN {ITEM} CHAT"
         ==================================================================== */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className={`max-w-lg w-full rounded-3xl p-6 border shadow-2xl space-y-4 ${ambianceObj.modalBg}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-lg">
                  {lang === 'en' && detailItem.titleEn ? detailItem.titleEn : detailItem.title}
                </h3>
                <p className="text-xs opacity-75">
                  {detailItem.creator} • {detailItem.genre}
                </p>
              </div>
              <button onClick={() => setDetailItem(null)} className="p-1.5 rounded-xl hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Join Item Chat Room Button */}
            <button
              onClick={() => openItemChat(detailItem)}
              className="w-full py-2.5 px-4 rounded-2xl text-xs font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                Join {lang === 'en' && detailItem.titleEn ? detailItem.titleEn : detailItem.title} Chat
              </span>
            </button>

            {!visitingUser && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">{t.statusLabel}</label>
                    <select
                      value={detailItem.status}
                      onChange={(e) => {
                        const nextSt = e.target.value;
                        setDetailItem((d) => ({ ...d, status: nextSt }));
                        setState((prev) => ({
                          ...prev,
                          items: prev.items.map((it) => (it.id === detailItem.id ? { ...it, status: nextSt } : it)),
                          notifications:
                            nextSt === 'Finished'
                              ? [
                                  {
                                    id: `n-${Date.now()}`,
                                    textTr: `Arkadaşlarına bildirim gitti: "${detailItem.title}" tamamlandı! 🎉`,
                                    textEn: `Friends notified: Finished "${detailItem.title}"! 🎉`,
                                    time: 'Now',
                                    unread: true
                                  },
                                  ...prev.notifications
                                ]
                              : prev.notifications
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15"
                    >
                      {STATUS_TAGS.map((st) => (
                        <option key={st.id} value={st.id} className="bg-slate-900">
                          {st.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">{t.ratingLabel}</label>
                    <div className="flex items-center gap-1 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => {
                            setDetailItem((d) => ({ ...d, rating: star }));
                            setState((prev) => ({
                              ...prev,
                              items: prev.items.map((it) => (it.id === detailItem.id ? { ...it, rating: star } : it))
                            }));
                          }}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= (detailItem.rating || 5) ? 'text-amber-400 fill-amber-400' : 'opacity-30'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">{t.notesLabel}</label>
                  <textarea
                    rows="3"
                    value={lang === 'en' ? detailItem.notesEn ?? detailItem.notes ?? '' : detailItem.notes ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const noteKey = lang === 'en' ? 'notesEn' : 'notes';
                      setDetailItem((d) => ({ ...d, [noteKey]: val }));
                      setState((prev) => ({
                        ...prev,
                        items: prev.items.map((it) => (it.id === detailItem.id ? { ...it, [noteKey]: val } : it))
                      }));
                    }}
                    className="w-full p-3 rounded-2xl text-xs bg-black/35 border border-white/15 focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: ADD NEW ITEM WITH AUTO-TITLE LOOKUP
         ==================================================================== */}
      {addModalShelf && (
        <AddItemModal
          initialShelf={addModalShelf}
          lang={lang}
          t={t}
          ambianceObj={ambianceObj}
          onClose={() => setAddModalShelf(null)}
          onAdd={(newItem) => {
            setState((prev) => ({
              ...prev,
              items: [newItem, ...prev.items],
              notifications: [
                {
                  id: `n-${Date.now()}`,
                  textTr: `Arkadaşlarına bildirim gönderildi: "${newItem.title}" (${newItem.status}) eklendi!`,
                  textEn: `Notified friends: Added "${newItem.title}" (${newItem.status})!`,
                  time: 'Now',
                  unread: true
                },
                ...prev.notifications
              ]
            }));
            setAddModalShelf(null);
            showToast(`"${newItem.title}" ${lang === 'tr' ? 'rafa eklendi!' : 'added to shelf!'}`);
          }}
        />
      )}
    </div>
  );
}

function AddItemModal({ initialShelf, lang, t, ambianceObj, onClose, onAdd }) {
  const [shelf, setShelf] = useState(initialShelf);
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [genre, setGenre] = useState('Macera');
  const [status, setStatus] = useState('Reading');
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(12);
  const [hoursPlayed, setHoursPlayed] = useState(10);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');

  // Auto-fill creator, genre, shelf & total when recognizing a title
  const handleTitleChange = (val) => {
    setTitle(val);
    const key = val.trim().toLowerCase();
    const matchedKey = Object.keys(KNOWN_WORKS_DB).find((k) => key.includes(k));
    if (matchedKey) {
      const info = KNOWN_WORKS_DB[matchedKey];
      setCreator(info.creator);
      setGenre(info.genre);
      setShelf(info.shelf);
      setTotal(info.total);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      id: `item-${Date.now()}`,
      shelf,
      title: title.trim(),
      creator: creator.trim() || 'Unknown',
      genre,
      status,
      current: status === 'Finished' ? Number(total) : Number(current),
      total: Math.max(1, Number(total)),
      hoursPlayed: shelf === 'games' ? Number(hoursPlayed) : undefined,
      rating,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className={`max-w-lg w-full rounded-3xl p-6 border shadow-2xl ${ambianceObj.modalBg}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base">{t.addBtn}</h3>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/10 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold mb-1">{t.titleLabel}</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Örn: Hobbit, Elden Ring, Frieren, Berserk..."
              className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">{t.creatorLabel}</label>
              <input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">{t.genreLabel}</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15"
              >
                {GENRE_LIST.map((g) => (
                  <option key={g.id} value={g.id} className="bg-slate-900">
                    {lang === 'tr' ? g.tr : g.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-bold mb-1">{t.statusLabel}</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15"
              >
                {STATUS_TAGS.map((st) => (
                  <option key={st.id} value={st.id} className="bg-slate-900">
                    {st.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Current</label>
              <input
                type="number"
                min="0"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Total</label>
              <input
                type="number"
                min="1"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15"
              />
            </div>
          </div>

          {shelf === 'games' && (
            <div>
              <label className="block text-xs font-bold mb-1">{t.hoursPlayedLabel}</label>
              <input
                type="number"
                min="0"
                value={hoursPlayed}
                onChange={(e) => setHoursPlayed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-black/35 border border-white/15"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold mb-1">{t.notesLabel}</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/35 border border-white/15"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 cursor-pointer"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-amber-500 text-slate-950 cursor-pointer"
            >
              {t.saveBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}