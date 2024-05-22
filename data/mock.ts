import { ImageSourcePropType } from 'react-native'

export const getProductById = (id: number) => {
  return allProducts.find((product) => product.id === id)
}
export const getFilteredProductById = (id: number) => {
  return filteredProducts.find(
    (filtered_product) => filtered_product.id === id
  )!
}

export const getFilteredProductByCategory = (id: number) => {
  return categories.find((product) => product.id === id)
}

export const allProducts = [
  {
    id: 16,
    name: 'PRYCEGAS Club Membership',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000000V4eSAAS',
    product_id: '01t2j000000BeL3AAK',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'PGCM',
    category: 'PGC',
    unit_price: 1000,
    img: require('~/assets/card-background.png'),
  },
  {
    id: 23,
    name: '11kg Content',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2v00000DHParAAH',
    product_id: '01t2v00000BYYa7AAH',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'LPG11C',
    category: 'LPG Product',
    unit_price: 930,
    img: require('~/assets/tank4.jpg'),
  },
  {
    id: 17,
    name: '11kg Cylinder',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000000V4ecAAC',
    product_id: '01t2j000000BeL8AAK',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'CYL11',
    category: 'LPG Accessories',
    unit_price: 1600,
    img: require('~/assets/tank2.jpg'),
  },
  {
    id: 27,
    name: '2.7kg Content',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2v00000EqISMAA3',
    product_id: '01t2v00000CwlXPAAZ',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'LPG2.7C',
    category: 'LPG Product',
    unit_price: 270,
    img: require('~/assets/tank1.jpg'),
  },
  {
    id: 30,
    name: '2.7kg Cylinder',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01uBB000000qXKNYA2',
    product_id: '01tBB0000014dbjYAA',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'CYL2.7',
    category: 'LPG Accessories',
    unit_price: 750,
    img: require('~/assets/tank3.jpg'),
  },
  {
    id: 28,
    name: '2.7kg Powerkalan Set',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2v00000EqIV6AAN',
    product_id: '01t2v00000CwlcYAAR',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'LPG2.7CCPK',
    category: 'LPG Product',
    unit_price: 1200,
    img: require('~/assets/tank5.jpg'),
  },
  {
    id: 24,
    name: '22kg Content',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2v00000DHPbuAAH',
    product_id: '01t2v00000BYYabAAH',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'LPG22C',
    category: 'LPG Product',
    unit_price: 1860,
    img: require('~/assets/tank4.jpg'),
  },
  {
    id: 29,
    name: '22kg Cylinder',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01uBB000000qVE3YAM',
    product_id: '01tBB0000014dQYYAY',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'CYL22',
    category: 'LPG Accessories',
    unit_price: 2750,
    img: require('~/assets/tank2.jpg'),
  },
  {
    id: 25,
    name: '50kg Content',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2v00000DHPc5AAH',
    product_id: '01t2v00000BYYacAAH',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'LPG50C',
    category: 'LPG Product',
    unit_price: 3765,
    img: require('~/assets/tank1.jpg'),
  },
  {
    id: 32,
    name: '50kg Cylinder',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01uBB000000zOjYYAU',
    product_id: '01tBB0000014dQxYAI',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'CYL50',
    category: 'LPG Accessories',
    unit_price: 4750,
    img: require('~/assets/tank3.jpg'),
  },
  {
    id: 20,
    name: 'Medical Oxygen 105lbs Content',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000003OXpBAAW',
    product_id: '01t2j000000FZlmAAG',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'MO2105C',
    category: 'Medical Gases Product',
    unit_price: 750,
    img: require('~/assets/oxygen1.jpg'),
  },
  {
    id: 26,
    name: 'Hose, Regulator, And Clamp Bundle',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2v00000DHPcTAAX',
    product_id: '01t2v00000BYYalAAH',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'ACCHRCB',
    category: 'LPG Accessories',
    unit_price: 300,
    img: require('~/assets/hose1.jpg'),
  },
  {
    id: 18,
    name: 'Medical Oxygen 105lbs Cylinder',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000003OXoWAAW',
    product_id: '01t2j000000FZlrAAG',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'MO2TST',
    category: 'Medical Gases Product',
    unit_price: 7500,
    img: require('~/assets/oxygen2.jpg'),
  },
  {
    id: 21,
    name: 'Medical Oxygen 20lbs Content',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000003OXpGAAW',
    product_id: '01t2j000000FZlcAAG',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'MO220C',
    category: 'Medical Gases Product',
    unit_price: 750,
    img: require('~/assets/oxygen3.jpg'),
  },
  {
    id: 19,
    name: 'Medical Oxygen 20lbs Cylinder',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000003OXpAAAW',
    product_id: '01t2j000000FZlhAAG',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'MO2TFT',
    category: 'Medical Gases Product',
    unit_price: 7500,
    img: require('~/assets/oxygen1.jpg'),
  },
  {
    id: 22,
    name: 'Medical Regulator',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000003OXpJAAW',
    product_id: '01t2j000000FZldAAG',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'MEDREG',
    category: 'Medical Gases Product',
    unit_price: 2000,
    img: require('~/assets/hose1.jpg'),
  },
  {
    id: 15,
    name: 'PRYCEGAS Stove',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01u2j000000URtRAAW',
    product_id: '01t2j000000AMYFAA4',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'ACCPGS',
    category: 'LPG Accessories',
    unit_price: 1200,
    img: require('~/assets/stove.png'),
  },
  {
    id: 31,
    name: 'Power Kalan Burner',
    pricebook_id: '01s2v00000LYBvBAAX',
    pricebook_entry_id: '01uBB000000qXKXYA2',
    product_id: '01tBB0000014dboYAA',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    product_code: 'ACCPKB',
    category: 'LPG Accessories',
    unit_price: 450,
    img: require('~/assets/burner.jpg'),
  },
]

export const filteredProducts = [
  {
    id: 1,
    name: '11kg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    category: 'LPG Product',
    img: require('~/assets/tank1.jpg'),
  },
  {
    id: 2,
    name: '2.7kg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    category: 'LPG Product',
    img: require('~/assets/tank3.jpg'),
  },
  {
    id: 3,
    name: '22kg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    category: 'LPG Product',
    img: require('~/assets/tank4.jpg'),
  },
  {
    id: 4,
    name: '50kg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    category: 'LPG Product',
    img: require('~/assets/tank2.jpg'),
  },
  {
    id: 5,
    name: 'PRYCEGAS Club Membership',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    category: 'LPG Product',
    img: require('~/assets/card-background.png'),
  },
  {
    id: 6,
    name: 'LPG Accessories',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    img: require('~/assets/hose1.jpg'),
    category: 'LPG Accessories',
  },
  {
    id: 7,
    name: 'Medical',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    img: require('~/assets/oxygen1.jpg'),
    category: 'Medical Gases Product',
  },
]

export const categories = [
  {
    id: 1,
    img: require('~/assets/card-background.png'),
    name: 'Prycegas Club Membership',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
    id: 2,
    img: require('~/assets/tank.jpg'),
    name: 'LPG Product',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
    id: 3,
    img: require('~/assets/hose.jpg'),
    name: 'LPG Accessories',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
    id: 4,
    img: require('~/assets/oxygen.jpg'),
    name: 'Medical Gases Product',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
    id: 5,
    img: require('~/assets/medicine.png'),
    name: 'Pryce Pharma Product',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
]

export type CarouselType = {
  id: number
  name: string
  image: ImageSourcePropType
}

export const carousel: CarouselType[] = [
  {
    id: 1,
    name: 'banner1',
    image: require('../assets/banner1.jpg'),
  },
  {
    id: 2,
    name: 'banner2',
    image: require('../assets/banner2.jpg'),
  },
  {
    id: 3,
    name: 'banner3',
    image: require('../assets/banner3.jpg'),
  },
]

export const address = [
  {
    street: 'Block 1 qqweqwqwee',
    city: 'Caloocan qweqwqwe',
    province: 'NCR',
  },
  {
    street: 'Block 2 qweqweqwe',
    city: 'Malabon qweqwe',
    province: 'NCR qweqweqwe',
  },
  {
    street: 'Block 3 qweqwe',
    city: 'Cagayan De Oro',
    province: 'Misamis Oriental',
  },
]
