export const PRODUCTS = [
  {
    id: 1,
    name: 'Custom Interlocking Clicker',
    type: 'clicker',
    category: 'Custom Fidget Clicker',
    price: 299,
    originalPrice: null,
    image: '/assets/clicker_product.png',
    alt: 'Custom interlocking fidget clicker keychain with pastel letter tiles',
    badges: ['bestseller', 'custom'],
    colors: ['#FFB3C6', '#A2C2E8', '#B5EAD7', '#C7B8EA'],
    rating: 4.9,
    reviews: 124,
    description: 'The classic! Satisfying interlocking mechanism with colorful letter tiles. Enter any name or word!',
  },
  {
    id: 2,
    name: 'Mini Photo Album Keychain',
    type: 'album',
    category: 'Mini Photo Album',
    price: 249,
    originalPrice: null,
    image: '/assets/mini_album_product.png',
    alt: 'Mini photo album keychain with daisy and bow accents',
    badges: ['bestseller'],
    colors: ['#FFB3C6', '#A2C2E8', '#C7B8EA'],
    rating: 5.0,
    reviews: 89,
    description: 'Carry your favourite memories wherever you go! Each album holds 6–8 mini photos with adorable accents.',
  },
  {
    id: 3,
    name: 'Honeycomb Clicker',
    type: 'clicker',
    category: 'Custom Fidget Clicker',
    price: 349,
    originalPrice: null,
    image: '/assets/honeycomb_clicker.png',
    alt: 'Honeycomb style fidget clicker with hexagonal letter tiles',
    badges: ['new'],
    colors: ['#FFD700', '#FFB3C6', '#B5EAD7'],
    rating: 4.8,
    reviews: 42,
    description: 'Hexagonal honeycomb design — ultra satisfying to click, with a unique geometric modern look.',
  },
  {
    id: 4,
    name: 'Boxy Clicker',
    type: 'clicker',
    category: 'Custom Fidget Clicker',
    price: 329,
    originalPrice: 399,
    image: '/assets/boxy_clicker.png',
    alt: 'Boxy chunky fidget clicker with rainbow letter tiles',
    badges: ['sale'],
    colors: ['#FFFFFF', '#FFB3C6', '#A2C2E8', '#B5EAD7'],
    rating: 4.7,
    reviews: 57,
    description: 'Chunky, bold, and oh-so-satisfying. The boxy design gives a premium tactile sensory feel.',
  },
  {
    id: 5,
    name: 'Kawaii Accessories Bundle',
    type: 'keepsake',
    category: 'Customized Keepsake',
    price: 399,
    originalPrice: 499,
    image: '/assets/accessories_product.png',
    alt: 'Collection of kawaii accessories including boba clicker and name keychains',
    badges: ['sale', 'custom'],
    colors: ['#FFB3C6', '#B5EAD7', '#C7B8EA', '#FDFD96'],
    rating: 4.9,
    reviews: 71,
    description: 'Cute collectibles, name keychains, custom bookmarks, boba charms and whimsical trinkets.',
  },
];

export const COLOR_THEMES = {
  rainbow: {
    name: 'Pastel Rainbow',
    gradient: 'linear-gradient(135deg, #FFB3C6, #A2C2E8, #B5EAD7, #FDFD96)',
    palette: ['#FFB3C6', '#FDFD96', '#A2C2E8', '#B5EAD7', '#C7B8EA', '#FF9E9E', '#FFD085', '#A8E6CF', '#FFB3C6', '#D4A4E8', '#A2C2E8', '#B5EAD7'],
  },
  pink: {
    name: 'Berry Pink',
    gradient: 'linear-gradient(135deg, #D13B7B, #FFB3C6)',
    palette: ['#D13B7B', '#E86FA4', '#FFB3C6', '#FF9EC9', '#D13B7B', '#E86FA4', '#FFB3C6', '#FF9EC9', '#D13B7B', '#E86FA4', '#FFB3C6', '#FF9EC9'],
  },
  blue: {
    name: 'Ocean Blue',
    gradient: 'linear-gradient(135deg, #4A90D9, #A2C2E8)',
    palette: ['#4A90D9', '#6AAEE0', '#A2C2E8', '#C5DDFF', '#4A90D9', '#6AAEE0', '#A2C2E8', '#C5DDFF', '#4A90D9', '#6AAEE0', '#A2C2E8', '#C5DDFF'],
  },
  mint: {
    name: 'Mint Green',
    gradient: 'linear-gradient(135deg, #3CBFAE, #B5EAD7)',
    palette: ['#3CBFAE', '#5FD4C4', '#B5EAD7', '#C9F5EB', '#3CBFAE', '#5FD4C4', '#B5EAD7', '#C9F5EB', '#3CBFAE', '#5FD4C4', '#B5EAD7', '#C9F5EB'],
  },
  lavender: {
    name: 'Lavender Dream',
    gradient: 'linear-gradient(135deg, #9B72CF, #C7B8EA)',
    palette: ['#9B72CF', '#B08EE0', '#C7B8EA', '#DACED8', '#9B72CF', '#B08EE0', '#C7B8EA', '#DACED8', '#9B72CF', '#B08EE0', '#C7B8EA', '#DACED8'],
  },
  yellow: {
    name: 'Sunny Yellow',
    gradient: 'linear-gradient(135deg, #F6C90E, #FDFD96)',
    palette: ['#F6C90E', '#FFD85C', '#FDFD96', '#FFFACC', '#F6C90E', '#FFD85C', '#FDFD96', '#FFFACC', '#F6C90E', '#FFD85C', '#FDFD96', '#FFFACC'],
  },
};

export const BASE_COLORS = {
  white: { name: 'White', hex: '#FFFFFF', border: '#ddd' },
  black: { name: 'Black', hex: '#222222' },
  babyPink: { name: 'Baby Pink', hex: '#FFB3C6' },
  mint: { name: 'Mint', hex: '#B5EAD7' },
};

export const CLICKER_STYLES = [
  { id: 'interlocking', name: 'Interlocking', icon: '🔗', basePrice: 299 },
  { id: 'honeycomb', name: 'Honeycomb', icon: '🍯', basePrice: 349 },
  { id: 'boxy', name: 'Boxy', icon: '⬜', basePrice: 329 },
  { id: 'standard', name: 'Standard', icon: '📦', basePrice: 279 },
];

export const COUPONS = {
  'SOULKADI10': 10,
  'FIRST10': 10,
  'INDIE15': 15,
  'QUIRKY20': 20,
};

export const FREE_SHIPPING_THRESHOLD = 500;

export const REVIEWS = [
  {
    id: 1,
    name: 'Priya S.',
    location: 'Mumbai',
    avatarBg: '#FFB3C6',
    rating: 5,
    text: "I ordered a custom interlocking clicker with my name and it arrived so beautifully packaged! The colours are exactly as shown. I'm literally addicted to clicking it 😭💗",
  },
  {
    id: 2,
    name: 'Ritika M.',
    location: 'Delhi',
    avatarBg: '#A2C2E8',
    rating: 5,
    text: "Got the mini album keychain as a gift for my bestie and she CRIED. It's the most adorable thing I've ever seen! Packaging was super cute too 🌼",
  },
  {
    id: 3,
    name: 'Ananya K.',
    location: 'Bangalore',
    avatarBg: '#B5EAD7',
    rating: 5,
    text: "Ordered the honeycomb clicker for my daughter — she takes it everywhere! Amazing quality, super satisfying to use. Will definitely order more. Thank you Studio Soulkadi! 🍯",
  },
  {
    id: 4,
    name: 'Sneha T.',
    location: 'Pune',
    avatarBg: '#C7B8EA',
    rating: 5,
    text: "The customization process was so easy! They confirmed my order on WhatsApp within minutes. Delivery was fast and the clicker looks exactly like the preview 🥺✨",
  },
  {
    id: 5,
    name: 'Tanvi R.',
    location: 'Chennai',
    avatarBg: '#FDFD96',
    rating: 5,
    text: "Bought the boxy clicker set for myself and two friends — we all got matching ones with our initials! The quality is insane for the price. 10/10 recommend 💫",
  },
  {
    id: 6,
    name: 'Nisha V.',
    location: 'Hyderabad',
    avatarBg: '#FFD6E0',
    rating: 5,
    text: "Honestly Studio Soulkadi deserves all the love! The packaging has these cute little details, the product is perfect, and the response time is incredible. Already planning my next order! 🎀",
  },
];

export const FAQS = [
  {
    q: 'Can I customize any product?',
    a: 'Yes! Most products are fully customizable. Use our live customizer or DM us on Instagram/WhatsApp.',
  },
  {
    q: 'What is your return policy?',
    a: 'Since all items are custom-made, we do not accept returns unless the item is damaged. Contact us within 48 hours of delivery.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard items: 3–5 working days. Custom orders: 5–7 working days after WhatsApp confirmation.',
  },
  {
    q: 'Do you take bulk or gifting orders?',
    a: 'Absolutely! We love bulk orders for birthdays, corporate return gifts, weddings, and events. WhatsApp us for special volume pricing.',
  },
];
