import { ProductDisplayProps } from '~/types/product'

export const ifPGCMemberDescription = {
  member: [
    'PRYCEGAS CLUB MEMBERSHIP IS ACTIVE',
    'You can use the price protection benefit and your 24/7 free delivery service on your order. If you have any concerns, please call #98000 toll-free.',
  ],
  notMember: [
    'Be a PRYCEGAS Club Member now',
    'Register to enjoy fixed prices on selected products over a year with 24/7 Free Delivery Service!. If you have any concerns, please call #98000 toll-free.',
  ],
}

export const ProductsDetail = [
  { id: 'NOIMAGE', image: require('~/assets/images/no-image.png') },
  {
    id: 'MEDREG',
    name: 'Medical Regulator',
    description: ['Medical regulator'],
    image: require('~/assets/images/products/MEDREG.png'),
  },
  {
    id: 'MO2105C',
    name: '105lbs Refill',
    description: ['Content only'],
    image: require('~/assets/images/products/MO2105C.png'),
  },
  {
    id: 'MO220C',
    name: '20lbs Refill',
    description: ['Content only'],
    image: require('~/assets/images/products/MO220C.png'),
  },
  {
    id: 'LPG50C',
    name: '50kg Refill',
    description: ['Content only'],
    image: require('~/assets/images/products/LPG50C.png'),
  },
  {
    id: 'CYL50',
    name: '50kg Cylinder',
    description: ['Cylinder Only'],
    image: require('~/assets/images/products/CYL50.png'),
  },
  {
    id: 'LPG22C',
    name: '22kg Refill',
    description: ['Content only'],
    image: require('~/assets/images/products/LPG22C.png'),
  },
  {
    id: 'LPG22CCOD',
    name: '22kg Orange Day Cylinder With Content',
  },
  {
    id: 'CYL22',
    name: '22kg Cylinder',
    description: ['Cylinder Only'],
    image: require('~/assets/images/products/CYL22.png'),
  },
  {
    id: 'LPG11C',
    name: '11kg Refill',
    description: ['Content only'],
    image: require('~/assets/images/products/LPG11C.png'),
  },
  {
    id: 'CYL11',
    name: '11kg Cylinder',
    description: ['Cylinder Only'],
    image: require('~/assets/images/products/CYL11.png'),
  },
  {
    id: 'LPG11CCABOD',
    name: '11kg Orange Day Bundle',
  },
  {
    id: 'LPG11CCOD',
    name: '11kg Orange Day Cylinder With Content',
  },
  {
    id: 'CYL2.7',
    name: '2.7kg Cylinder',
    description: ['Cylinder Only'],
    image: require('~/assets/images/products/CYL2.7.png'),
  },
  {
    id: 'LPG2.7CCPK',
    name: '2.7kg Cylinder with Content & Power Burner',
    description: ['Cylinder', 'Content', 'Power Burner'],
    image: require('~/assets/images/products/LPG2.7CCPK.png'),
  },
  {
    id: 'LPG2.7C',
    name: '2.7kg Refill',
    description: ['Content only'],
    image: require('~/assets/images/products/LPG2.7C.png'),
  },
  {
    id: 'LPG2.7CCPKOD',
    name: '11kg Orange Day Cylinder With Content',
  },
  {
    id: 'ACCPGS',
    name: 'Prycegas stove',
    description: ['Prycegas stove'],
    image: require('~/assets/images/products/ACCPGS.png'),
  },
  {
    id: 'ACCHRCB',
    name: 'Add-ons (Hose, Regulator, Clamp)',
    description: [
      'Add-ons (Hose, Regulator, Clamp). You can only order this product if you purchase a refill or a cylinder with content.',
    ],
    image: require('~/assets/images/products/ACCHRCB.png'),
  },
  {
    id: 'PGCM',
    name: 'Prycegas Club Membership',
    description: [
      'Prycegas Club Membership',
      'Register to enjoy fixed prices on selected products over a year with 24/7 Free Delivery Service!. If you have any concerns, please call #98000 toll-free.',
    ],
    image: require('~/assets/images/products/PGCM.png'),
  },
  {
    id: 'PGCMV',
    name: 'Prycegas Club Membership',
    description: [
      'Prycegas Club Membership',
      'Register to enjoy fixed prices on selected products over a year with 24/7 Free Delivery Service!. If you have any concerns, please call #98000 toll-free.',
    ],
  },
  {
    id: 'MO2TFT',
    name: '20lbs Cylinder with Content',
    description: ['Cylinder with Content'],
    image: require('~/assets/images/products/MO2TFT.png'),
  },
  {
    id: 'MO2TST',
    name: '105lbs Cylinder',
    description: ['Cylinder with Content'],
    image: require('~/assets/images/products/MO2TST.png'),
  },
  {
    id: 'ACCPKB',
    name: 'Prycegas Burner',
    description: ['Burner only'],
    image: require('~/assets/images/products/ACCPKB.png'),
  },
]

export const productDisplay: ProductDisplayProps[] = [
  {
    id: 1,
    productCode: ['PGCM'],
    image: require('~/assets/images/products/PGCM.png'),
    name: 'Membership',
    description: 'PRYCEGAS club membership, lorem ipsum',
  },
  {
    id: 2,
    productCode: ['LPG11C', 'CYL11', 'ACCPGS', 'ACCHRCB'],
    image: require('~/assets/images/products/LPG11C.png'),
    name: '11KG',
    description:
      '11kg petroleum gas cylinder, often referred to as an LPG (liquefied petroleum gas) cylinder, is commonly used for residential and commercial cooking, heating, and other applications.',
  },
  {
    id: 3,
    productCode: [
      'CYL2.7',
      'LPG2.7CCPK',
      'LPG2.7C',
      'ACCPKB',
      'ACCPGS',
      'ACCHRCB',
    ],
    image: require('~/assets/images/products/LPG2.7CCPK.png'),
    name: '2.7KG',
    description:
      'A 2.7kg LPG (liquefied petroleum gas) cylinder is a compact and portable energy source commonly used for small-scale applications. Suitable for single-burner gas stoves, making it a convenient option for small households or temporary setups.',
  },
  {
    id: 4,
    productCode: ['CYL22', 'LPG22C', 'ACCPGS', 'ACCHRCB'],
    image: require('~/assets/images/products/CYL22.png'),
    name: '22KG',
    description:
      'Commercial Cooking: Suitable for restaurants, catering businesses, and food trucks using multiple-burner stoves, ovens, and grills.',
  },
  {
    id: 5,
    productCode: ['LPG50C', 'CYL50', 'ACCPGS', 'ACCHRCB'],
    image: require('~/assets/images/products/CYL50.png'),
    name: '50KG',
    description:
      'Large-Scale Industrial Applications: Suitable for manufacturing processes, large-scale heating, and other industrial uses requiring significant energy output.',
  },
  {
    id: 6,
    productCode: ['MO220C', 'MO2TFT', 'MEDREG'],
    image: require('~/assets/images/products/MO220C.png'),
    name: 'Medical Oxygen 20lbs',
    description:
      'A 20lbs medical oxygen cylinder is a common source of oxygen therapy used in various medical settings. Used by patients with respiratory conditions such as COPD, asthma, or pneumonia who require supplemental oxygen at home.',
  },
  {
    id: 7,
    productCode: ['MO2105C', 'MO2TST', 'MEDREG'],
    image: require('~/assets/images/products/MO2105C.png'),
    name: 'Medical Oxygen 20lbs',
    description:
      'A 105lbs medical oxygen cylinder is a substantial source of oxygen therapy, primarily used in medical settings where a high volume of oxygen is required. Provides a reliable and large supply of oxygen for patients in intensive care units, during surgeries, and in emergency rooms.',
  },
]
