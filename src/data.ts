import { Product, Service, Review, FAQ } from './types';

export const BUSINESS_INFO = {
  name: 'Sharma Furniture House',
  tagline: 'Quality Furniture for Every Home',
  owner: 'Rajesh Sharma',
  experience: '18 Years',
  started: '2015',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'info@sharmafurniture.in',
  address: {
    landmark: 'Near Bus Stand',
    market: 'Main Market',
    city: 'Sirsa',
    state: 'Haryana',
    country: 'India',
    pincode: '125055'
  },
  stats: [
    { value: '2500+', label: 'Happy Customers' },
    { value: '18+', label: 'Years Experience' },
    { value: '500+', label: 'Custom Projects' },
    { value: '4.8', label: 'Average Rating' }
  ],
  workingHours: [
    { day: 'Monday', time: '9:00 AM – 8:00 PM' },
    { day: 'Tuesday', time: '9:00 AM – 8:00 PM' },
    { day: 'Wednesday', time: '9:00 AM – 8:00 PM' },
    { day: 'Thursday', time: '9:00 AM – 8:00 PM' },
    { day: 'Friday', time: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 8:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 5:00 PM' }
  ],
  whyChooseUs: [
    { title: 'Premium Quality Material', description: 'We source only top-grade solid wood and durable engineered boards.' },
    { title: 'Affordable Prices', description: 'Direct from workshop pricing without any middleman commission.' },
    { title: 'Free Home Delivery', description: 'Safe and timely shipping directly to your doorstep within 25 km.' },
    { title: 'Installation Available', description: 'Hassle-free professional setup and assembly by our expert team.' },
    { title: 'Custom Designs', description: 'Furniture custom-tailored exactly to your space and interior style.' },
    { title: 'Experienced Craftsmen', description: 'Crafted under the supervision of Rajesh Sharma, with 18+ years of expertise.' },
    { title: '5-Year Warranty', description: 'Peace of mind with our long-term structural wood and modular warranty.' },
    { title: 'After Sales Support', description: 'Dedicated support team ready to assist with any post-purchase care.' }
  ],
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/919876543210'
  }
};

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Wooden Furniture',
    description: 'Beautifully crafted, robust solid wood furniture items custom-built to last generations.',
    items: ['Beds', 'Wardrobes', 'Dining Tables', 'TV Units', 'Coffee Tables'],
    icon: 'Hammer'
  },
  {
    id: 's2',
    title: 'Office Furniture',
    description: 'Ergonomic and elegant layouts designed to enhance workplace comfort and productivity.',
    items: ['Office Chairs', 'Executive Tables', 'Workstations', 'Reception Desks'],
    icon: 'Briefcase'
  },
  {
    id: 's3',
    title: 'Modular Furniture',
    description: 'Modern, space-saving smart designs created with absolute precision and top-grade fixtures.',
    items: ['Modular Kitchen', 'Modular Wardrobes', 'Study Tables', 'Shoe Racks'],
    icon: 'LayoutGrid'
  },
  {
    id: 's4',
    title: 'Custom Furniture',
    description: 'Personalized premium designs tailored strictly to your specific dimensions and design preferences.',
    items: ['Bespoke Dining Sets', 'Custom Sofa Layouts', 'Built-in Cabinets', 'Living Room Consoles'],
    icon: 'Compass'
  }
];

export const CATEGORIES = [
  'All',
  'Bedroom Furniture',
  'Living Room Furniture',
  'Dining Room Furniture',
  'Office Furniture',
  'Modular Kitchen',
  'Home Decor'
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Luxury King Size Bed',
    price: 34999,
    description: 'Premium quality double bed crafted meticulously from seasoned Solid Sheesham Wood.',
    category: 'Bedroom Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    features: ['Solid Sheesham Wood', 'Hydraulic Storage (Optional)', 'Elegant Teak Finish', 'Termite Resistant']
  },
  {
    id: 'p2',
    name: 'Wooden Dining Set',
    price: 27500,
    description: 'Sturdy, handcrafted solid wood dining table paired with six beautifully cushioned chairs.',
    category: 'Dining Room Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2df114f11?auto=format&fit=crop&w=800&q=80',
    features: ['6 Seater Capacity', 'High Density Foam Seats', 'Reinforced Solid Joints', 'Melamine Polish Coat']
  },
  {
    id: 'p3',
    name: 'Modular Wardrobe',
    price: 42000,
    description: 'Premium space-optimizing modular wardrobe with sleek soft-close sliding doors and modular storage shelves.',
    category: 'Bedroom Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    features: ['Custom Size Available', 'Soft-close German Fittings', 'Scratch & Moisture Resistant', 'Built-in LED Lights']
  },
  {
    id: 'p4',
    name: 'Executive Office Chair',
    price: 8999,
    description: 'Ergonomically engineered lumbar-support chair designed for absolute sitting comfort during long working hours.',
    category: 'Office Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80',
    features: ['Ergonomic Mesh Support', 'Pneumatic Seat Height Adjust', '3D Adjustable Armrests', 'Heavy-Duty Metal Base']
  },
  {
    id: 'p5',
    name: 'Office Table',
    price: 16500,
    description: 'Elegant, executive desk built from premium moisture-resistant engineered wood with deep storage drawers.',
    category: 'Office Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    features: ['Water-Resistant Top Laminate', 'Integrated Wire Manager', 'Central Lockable Drawers', 'Sturdy Steel Under-Frame']
  },
  {
    id: 'p6',
    name: 'TV Unit',
    price: 18999,
    description: 'Modern, wall-mounted floating TV entertainment console complete with beautiful glass cabinets and open shelves.',
    category: 'Living Room Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    features: ['Modern Matte Finish', 'Concealed Cable Passages', 'Toughened Safety Glass', 'Ample Console Drawers']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Priya Verma',
    rating: 5,
    comment: 'Excellent furniture quality and timely delivery. Highly recommended for custom designs!',
    city: 'Sirsa'
  },
  {
    id: 'r2',
    name: 'Aman Gupta',
    rating: 5,
    comment: 'Reasonable prices, premium solid teak polish, and extremely transparent customer support.',
    city: 'Fatehabad'
  },
  {
    id: 'r3',
    name: 'Neha Singh',
    rating: 5,
    comment: 'Our modular kitchen was completed exactly on time and looks beautiful! Rajeshji personally oversaw the design.',
    city: 'Sirsa'
  },
  {
    id: 'r4',
    name: 'Mohit Arora',
    rating: 4,
    comment: 'Extremely professional staff, excellent finishing on the office chairs and executive tables.',
    city: 'Ellenabad'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'Do you provide home delivery?',
    answer: 'Yes, we provide absolutely free professional home delivery and careful unloading within a 25 km radius of Sirsa. For distances beyond 25 km, we charge a nominal delivery fee.'
  },
  {
    id: 'f2',
    question: 'Do you make custom furniture?',
    answer: 'Absolutely! We specialize in custom-tailored furniture. You can specify materials (Sheesham, Teak, Board), select finishes, share dimensions, and our skilled craftsmen will construct it.'
  },
  {
    id: 'f3',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major forms of payment, including UPI (GPay, PhonePe, Paytm), Debit Cards, Credit Cards, Cash, and Direct Bank Transfers.'
  },
  {
    id: 'f4',
    question: 'Is installation included?',
    answer: 'Yes, full installation and setup is provided free of charge for heavy items, modular kitchens, modular wardrobes, and office workstations.'
  },
  {
    id: 'f5',
    question: 'Do you provide any warranty on products?',
    answer: 'Yes! We stand behind our quality with a 5-Year Termite and structural warranty on all premium seasoned solid wood products.'
  }
];

export const GALLERY_ITEMS = [
  {
    title: 'Furniture Showroom',
    category: 'Showroom',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Living Room Setup',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Bedroom Collection',
    category: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Modular Kitchen',
    category: 'Modular Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Office Furniture',
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Dining Collection',
    category: 'Dining',
    imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Sofa Collection',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Wooden Chairs',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'TV Units',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Wardrobes',
    category: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80'
  }
];
