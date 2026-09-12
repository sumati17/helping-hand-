import { ServiceCategory, ServiceItem, Provider, Booking, AuditLog } from '../types';

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  { id: 'cleaning', name: 'Cleaning', icon: 'sanitizer', color: 'bg-emerald-100 text-emerald-800', startingPrice: 499 },
  { id: 'plumbing', name: 'Plumbing', icon: 'plumbing', color: 'bg-sky-100 text-sky-800', startingPrice: 349 },
  { id: 'carwash', name: 'Car Wash', icon: 'local_car_wash', color: 'bg-amber-100 text-amber-800', startingPrice: 299 },
  { id: 'electrical', name: 'Electrical', icon: 'electric_bolt', color: 'bg-indigo-100 text-indigo-800', startingPrice: 399 },
  { id: 'appliances', name: 'Appliances', icon: 'home_repair_service', color: 'bg-teal-100 text-teal-800', startingPrice: 449 },
  { id: 'painting', name: 'Painting', icon: 'format_paint', color: 'bg-orange-100 text-orange-800', startingPrice: 599 },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'deep-home-cleaning',
    categoryId: 'cleaning',
    title: 'Deep Full Home Cleaning',
    shortDescription: 'Complete 360° sanitization, kitchen, bathrooms & balcony pressure scrub',
    description: 'Complete 360° sanitization, kitchen degreasing, bathroom descaling & balcony pressure scrub. Handled by 2 uniformed, police-verified specialists equipped with industrial suction machines and eco-certified chemicals.',
    price: 1499,
    originalPrice: 1999,
    discountPercentage: 25,
    rating: 4.9,
    reviewsCount: 1248,
    duration: '3–4 hrs',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo7OEqFcOZsVJmOyFnNbhraDF0vW-hhkf_9FSZjIOYw2xzpHK5Na7iVh_ahEw3JAb54grx8QX4oSavekknKFdHpb5ldB-vupzm00GpYSNoxUAyo085R4UUJ809Vy1akotpbaq2y1mZdqlFjxDJrCBCVwwJh_ZAdbmUBQE3qyw8n9Ht3go61y0FUrGkS9gnbmiYw0U5BDxlpi30eDggDvFsddZmQQeA5mgFqphcQeC20x1Wqs7RaZ9JRA',
    badge: 'Available Today in 90 Mins',
    inclusions: [
      { title: 'Living & Bedroom Spaces', description: 'Deep dusting, industrial dry vacuuming of rugs, sofas, mattress & ceiling fan blades.' },
      { title: 'Kitchen Degreasing & Sanitization', description: 'Oil stain treatment on tiles, chimney hood exterior buffing, and stainless-steel sink descaling.' },
      { title: 'Bathroom Deep Descaling', description: 'Hard-water stain removal on glass shower cubicles, toilet bowl sanitization, and chrome tap shine.' },
      { title: 'Balcony & Window Tracks', description: 'Floor pressure scrub, sliding track dust extraction, and streak-free glass wiping.' }
    ],
    exclusions: [
      'Ceiling repainting, putty plastering, or structural water leak repairs.',
      'Internal wardrobe or cabinet cleaning where personal belongings are unpacked.'
    ],
    requirements: 'Please ensure access to a standard 16A electrical socket and continuous water supply within 10 meters of cleaning zones.'
  },
  {
    id: 'foam-car-wash',
    categoryId: 'carwash',
    title: 'Foam Car Wash & Wax',
    shortDescription: 'Doorstep exterior foam bath, tire shine & ceramic spray sealant',
    description: 'Eco-friendly high-density snow foam exterior wash, tire dressing, interior vacuuming, dashboard polish, and ceramic gloss booster right at your parking spot.',
    price: 499,
    originalPrice: 699,
    discountPercentage: 28,
    rating: 4.8,
    reviewsCount: 850,
    duration: '45 mins',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBywZBpiamievGIFY7zdsDPCO4u1ZPkH3wWCCf-nQ_5Psx3Gh7MfldPJj2mCoW0eCblJpyKJ1layET7D07wYDjttZlSWdYcGqFciLM89G70sNKyOyTzk7aVZdJXXWTJ_2heExUliUzwjebjYsNrfLVjrj5yiVyOSs8dv29fNBB4FRfMfKXRuT5iJPKx6CRINxv1md5SUxBaVrz7WWC-2mRQf3Uc7IIdliYSQ-9Z_L00JU0PxvGSAD33Dg',
    badge: 'Instant Dispatch',
    inclusions: [
      { title: 'Snow Foam Exterior Bath', description: 'High-pressure wash with pH-neutral ceramic booster shampoo.' },
      { title: 'Interior High-Suction Vacuum', description: 'Foot mats, seats, boot compartment and air-vent debris extraction.' },
      { title: 'Tire & Trim Dressing', description: 'Hydrophobic anti-dust tire shine and dashboard UV-coat finish.' }
    ],
    exclusions: ['Engine bay pressure jetting without written consent', 'Deep fabric seat steam extraction'],
    requirements: 'Vehicle parked with at least 2 feet clearance on both sides. Water access within 20m.'
  },
  {
    id: 'kitchen-pipe-repair',
    categoryId: 'plumbing',
    title: 'Kitchen Pipe & Tap Repair',
    shortDescription: 'Quick fix for leaks, blockages, faucet fitting & pressure check',
    description: 'Standard diagnostic inspection, O-ring seal replacement, pipe unclogging, and pressure leak fixes with certified non-corrosive spare parts.',
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    rating: 4.9,
    reviewsCount: 2100,
    duration: '30 mins',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl_UhWCNYHOOHgkVVyc3eohJXvdh1f69f0Ic7AFJ1kGexCybxd6hmqx1uIrihuSslk2GFVFZ0z2FLPa9E7GGTobNdE361rAe_XRLQ4E4kbYdb_dHPapsW-QVWd--WfowHwUqNsiCdr0c8t1H2uJOGmZ-d51kROscStqXQAIktgr1Af_IoXEoMvzPZcm3hnb7PX2PAAxwZ1y3f67expWRWvMimzdjg4maey_BNL3hRWX-3IUgWWAclSTQ',
    badge: 'Emergency SOS Available',
    inclusions: [
      { title: 'Faucet & Trap Dismantling', description: 'Precision disassembly to locate worn gaskets and calcium build-ups.' },
      { title: 'O-Ring & Teflon Sealing', description: 'Food-grade silicone lubricant and industrial grade thread sealing.' },
      { title: 'Pressure Leak Testing', description: '10-minute continuous flow verification with zero drip guarantee.' }
    ],
    exclusions: ['Major underground drainage trenching', 'Wall tile demolition'],
    requirements: 'Main water shut-off valve accessible inside the apartment.'
  }
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'prov-rajesh',
    name: 'Rajesh Kumar',
    roleTitle: 'Master Plumber & Sanitization Lead',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHgwaoVBsp697kBTw29XGsbF1mHAVrl8ZJ6S6iqgvyZssiW_GhhBr0OeWPPxi0jx4bPB6G0_xoT30moGAwYnagbY4M-J84QYS95mMpXwlMmF6udam9g83zkjK0G92QK17VGmtHZ7KiDn2H7RHgDShh-g25G7cp5Zq2uvnJJVbPxqcuh3Obb7GWmkNkgIICh3gjjBJZCoHA2dGXBVtmKGGDmxpCog2Whi-sA11dRNUZi3g4k5fl6bK1vQ',
    rating: 4.9,
    completedJobsCount: 428,
    isIdVerified: true,
    isBackgroundChecked: true,
    isVaccinated: true,
    vehicle: 'Ather 450X • KA-03-HJ-4921',
    phone: '+91 98450 19283',
    tier: 'Master Pro L3',
    approvalStatus: 'approved',
    activeDuty: true,
    location: {
      lat: 12.9716,
      lng: 77.6412,
      address: '100ft Road, Indiranagar, Bengaluru'
    }
  },
  {
    id: 'prov-suresh',
    name: 'Suresh Patel',
    roleTitle: 'Electrical & Appliance Technician',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWnUUGqweddeDe5PzNd_-Yg9GsQSRf2Bb30FTdxVCnilwQY2Se7SVLr9xOaAgMuAF9JVUcuASyJ4dV6xm1JDUw6ORSCD7jVyHSuJx41hnyKfRjF1_yF5sWuhg4ej02r5UmqOlKhBeaj_NKAgKPrpM2iiKUF0UtQzwSOZuIOr9rxkIM5bD2CiF1vaa6ve5pxm6qwm55xSRBNDAzLL7llbog6vY_KMlJklvB58YUVgTZfNuYBTHijqURVg',
    rating: 4.8,
    completedJobsCount: 310,
    isIdVerified: true,
    isBackgroundChecked: true,
    isVaccinated: true,
    vehicle: 'Honda Activa • KA-05-EX-8812',
    phone: '+91 98451 44520',
    tier: 'Gold Tier Pro',
    approvalStatus: 'approved',
    activeDuty: true,
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: 'Koramangala 4th Block, Bengaluru'
    }
  },
  {
    id: 'prov-aditi',
    name: 'Aditi Sharma',
    roleTitle: 'Deep Sanitization & Housekeeping Supervisor',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp9dE5V9IWAZVl_w0VJMBRrV9mbQ4w4neE2pZXqpk-27FR-w-79pcHTOitHQAKHgKaiB4ma-nI7OTRAiszsEq-KBjiosYasIKTyDyORC8w1pgJ07l3A6aaN5unJn_DZyuQi7WqkMa-tAWc917gpq1Rsrm2_uGTVpCiVK203baKrhcFf1zpC2_WS7HkpmwnJz68gWTrwsnOXGmVXLEllRlx1a5_uv1Ot--d-esuq_PHCdP5HUzKhl1Z5g',
    rating: 4.9,
    completedJobsCount: 520,
    isIdVerified: true,
    isBackgroundChecked: true,
    isVaccinated: true,
    vehicle: 'TVS iQube • KA-01-ML-1109',
    phone: '+91 98452 77819',
    tier: 'Master Pro L3',
    approvalStatus: 'approved',
    activeDuty: true,
    location: {
      lat: 12.9611,
      lng: 77.6387,
      address: 'Domlur 2nd Stage, Bengaluru'
    }
  },
  {
    id: 'prov-vikram',
    name: 'Vikram Patil',
    roleTitle: 'Doorstep Vehicle Detailing Specialist',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrflXZff_Fk_jJdRff9ogIb7ahTo5zO1tvM_AoX0DR2BzdJSMwx_nD_X_Xiou_83nHApTKESoiak-FjZUsPONGwWOZEJp7EJEunu3nAzTDaupWOXs6DnCaS2RK4jfdntOdj2bk5JSv4ocJHyB-UVzFHeteSNO0Tn8tK0-fmoTs9uV05PddyGHuZizgr-qGFTXnkGp15fLFIH1RnQqf10lgELpXUMb1Ai45qg5Ap6WzDouan9As2L7Axw',
    rating: 4.7,
    completedJobsCount: 185,
    isIdVerified: true,
    isBackgroundChecked: false, // Verification in progress
    isVaccinated: true,
    vehicle: 'Hero Electric • KA-04-AB-3341',
    phone: '+91 98453 99102',
    tier: 'Silver Pro L1',
    approvalStatus: 'pending',
    activeDuty: false,
    location: {
      lat: 12.9784,
      lng: 77.5946,
      address: 'MG Road, Bengaluru'
    }
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1024',
    serviceId: 'deep-home-cleaning',
    serviceTitle: 'Deep Full Home Cleaning',
    categoryId: 'cleaning',
    customerName: 'Pooja M.',
    customerPhone: '+91 98765 43210',
    customerEmail: 'pooja.m@example.com',
    address: {
      label: 'Home',
      unit: 'Flat 402, Tower B, Green Glen Orchid',
      street: '4th Cross, 100ft Road',
      area: 'Indiranagar, Bengaluru',
      pincode: '560038',
      landmark: 'Opp. BDA Complex'
    },
    date: 'Wednesday, 16 October 2024',
    timeSlot: '09:30 AM',
    status: 'en_route',
    otpCode: '4829',
    provider: INITIAL_PROVIDERS[0], // Rajesh Kumar
    specialInstructions: 'Please ring doorbell twice, two pet cats inside apartment. Access code #402 at security gate.',
    pricing: {
      basePrice: 1899,
      discount: 400,
      equipmentFee: 49,
      tax: 278,
      couponDiscount: 100,
      totalPayable: 1726,
      providerEarnings: 1290,
      platformFee: 436
    },
    paymentMethod: 'gpay',
    paymentStatus: 'paid_escrow',
    timelineEvents: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: '08:45 AM', completed: true, active: false },
      { status: 'assigned', label: 'Provider Assigned', timestamp: '08:48 AM', completed: true, active: false },
      { status: 'accepted', label: 'Accepted by Rajesh', timestamp: '08:50 AM', completed: true, active: false },
      { status: 'en_route', label: 'En Route (ETA 12m)', timestamp: '09:18 AM', completed: false, active: true },
      { status: 'arrived', label: 'Arrived at Gate', timestamp: 'Pending', completed: false, active: false },
      { status: 'otp_started', label: 'SafeStart OTP Check', timestamp: 'Pending', completed: false, active: false },
      { status: 'in_progress', label: 'Cleaning In Progress', timestamp: 'Pending', completed: false, active: false },
      { status: 'completed', label: 'Job Completed', timestamp: 'Pending', completed: false, active: false },
    ],
    createdAt: '2024-10-16T08:45:00Z'
  },
  {
    id: 'BK-1023',
    serviceId: 'kitchen-pipe-repair',
    serviceTitle: 'Kitchen Pipe & Tap Repair',
    categoryId: 'plumbing',
    customerName: 'Rohit Verma',
    customerPhone: '+91 98111 22334',
    customerEmail: 'rohit.v@example.com',
    address: {
      label: 'Home',
      unit: 'Villa 12, Sobha Iris',
      street: 'Outer Ring Road',
      area: 'Bellandur, Bengaluru',
      pincode: '560103'
    },
    date: 'Wednesday, 16 October 2024',
    timeSlot: '11:00 AM',
    status: 'assigned',
    otpCode: '6142',
    provider: INITIAL_PROVIDERS[1], // Suresh
    pricing: {
      basePrice: 499,
      discount: 150,
      equipmentFee: 30,
      tax: 60,
      couponDiscount: 0,
      totalPayable: 439,
      providerEarnings: 320,
      platformFee: 119
    },
    paymentMethod: 'phonepe',
    paymentStatus: 'paid_escrow',
    timelineEvents: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: '09:00 AM', completed: true, active: false },
      { status: 'assigned', label: 'Provider Assigned', timestamp: '09:10 AM', completed: true, active: true },
      { status: 'accepted', label: 'Job Accepted', timestamp: 'Pending', completed: false, active: false },
      { status: 'en_route', label: 'En Route', timestamp: 'Pending', completed: false, active: false },
      { status: 'arrived', label: 'Arrived', timestamp: 'Pending', completed: false, active: false },
      { status: 'otp_started', label: 'OTP Start', timestamp: 'Pending', completed: false, active: false },
      { status: 'in_progress', label: 'In Progress', timestamp: 'Pending', completed: false, active: false },
      { status: 'completed', label: 'Completed', timestamp: 'Pending', completed: false, active: false },
    ],
    createdAt: '2024-10-16T09:00:00Z'
  },
  {
    id: 'BK-1022',
    serviceId: 'foam-car-wash',
    serviceTitle: 'Foam Car Wash & Wax',
    categoryId: 'carwash',
    customerName: 'Neha Patil',
    customerPhone: '+91 97222 33445',
    customerEmail: 'neha.p@example.com',
    address: {
      label: 'Apartment',
      unit: 'B-304, Prestige Ozone',
      street: 'Whitefield Main Road',
      area: 'Whitefield, Bengaluru',
      pincode: '560066'
    },
    date: 'Wednesday, 16 October 2024',
    timeSlot: '08:00 AM',
    status: 'completed',
    otpCode: '9183',
    provider: INITIAL_PROVIDERS[0],
    pricing: {
      basePrice: 699,
      discount: 200,
      equipmentFee: 40,
      tax: 85,
      couponDiscount: 50,
      totalPayable: 574,
      providerEarnings: 420,
      platformFee: 154
    },
    paymentMethod: 'card',
    paymentStatus: 'released_to_provider',
    timelineEvents: [
      { status: 'confirmed', label: 'Confirmed', timestamp: '07:30 AM', completed: true, active: false },
      { status: 'assigned', label: 'Assigned', timestamp: '07:35 AM', completed: true, active: false },
      { status: 'accepted', label: 'Accepted', timestamp: '07:40 AM', completed: true, active: false },
      { status: 'en_route', label: 'En Route', timestamp: '07:50 AM', completed: true, active: false },
      { status: 'arrived', label: 'Arrived', timestamp: '08:02 AM', completed: true, active: false },
      { status: 'otp_started', label: 'OTP Verified', timestamp: '08:05 AM', completed: true, active: false },
      { status: 'in_progress', label: 'Service Done', timestamp: '08:45 AM', completed: true, active: false },
      { status: 'completed', label: 'Completed & Signed', timestamp: '08:50 AM', completed: true, active: true },
    ],
    createdAt: '2024-10-16T07:30:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-891',
    actor: 'admin@helpinghand.com',
    action: 'PROVIDER_APPROVED',
    target: 'Rajesh Kumar (#prov-rajesh)',
    timestamp: '2024-10-16 08:30:12',
    details: 'Police verification document verified against Bangalore City Police record #BCP-2024-8192',
    severity: 'info'
  },
  {
    id: 'LOG-890',
    actor: 'system-dispatch-engine',
    action: 'AUTO_LOCATION_ASSIGNMENT',
    target: 'Booking #BK-1024',
    timestamp: '2024-10-16 08:48:02',
    details: 'Provider Rajesh Kumar assigned within 1.8km radius, top rated 4.9 match',
    severity: 'info'
  },
  {
    id: 'LOG-889',
    actor: 'payment-gateway-webhook',
    action: 'ESCROW_FUNDS_LOCKED',
    target: 'Txn #TXN-994182 (BK-1024)',
    timestamp: '2024-10-16 08:45:33',
    details: 'UPI Authorization ₹1,726 secured in Escrow Shield Vault. Release condition: Doorstep OTP handover.',
    severity: 'info'
  },
  {
    id: 'LOG-888',
    actor: 'admin@helpinghand.com',
    action: 'SERVICE_CATALOG_UPDATE',
    target: 'Service #deep-home-cleaning',
    timestamp: '2024-10-15 17:15:00',
    details: 'Discount adjusted to 25% OFF for festive season campaign CLEANFEST',
    severity: 'warning'
  }
];
