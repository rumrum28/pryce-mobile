export const pgcmIds = [
  '01tN0000008fnMhIAI',
  '01t2j000000BeL3AAK',
  '01tTL000002DwEjYAK',
  '01tHy00000MIOkLIAX',
]

export const refillsOnly = [
  'LPG11C',
  'LPG2.7C',
  'LPG22C',
  'LPG50C',
  'MO2105C',
  'MO220C',
  'LPG2.7CCPK',
]

export const cylinderOnly = ['CYL11', 'CYL22', 'CYL50', 'CYL2.7']

export const allCylinderOnly = [
  {
    productCode: 'CYL11',
    productId: '01t2v00000BYYa7AAH', //01t2v00000BYYa7AAH - content
    ownProductId: '01t2j000000BeL8AAK', //01tN0000008kFqJIAU  - cylinder
  },
  {
    productCode: 'CYL22',
    productId: '01t2v00000BYYabAAH', // 01t2v00000BYYabAAH - content
    ownProductId: '01tBB0000014dQnYAI', // 01tN0000009ctu2IAA  - cylinder
  },
  {
    productCode: 'CYL50',
    productId: '01t2v00000BYYacAAH', // 01t2v00000BYYacAAH - content
    ownProductId: '01tBB0000014dQxYAI', // 01tN000000AMEwEIAX  - cylinder
  },
  {
    productCode: 'CYL2.7',
    productId: '01t2v00000CwlXPAAZ', //01t2v00000CwlXPAAZ - content
    ownProductId: '01tBB0000014dQsYAI', // 01tN0000009cttxIAA - cylinder
  },
]

export const filterOrderByType = [
  {
    productCode: 'CYL11',
    description:
      'For safety standards, you cannot order a cylinder alone. Therefore, we`ve added content for you.',
  },
  {
    productCode: 'CYL22',
    description:
      'For safety standards, you cannot order a cylinder alone. Therefore, we`ve added content for you.',
  },
  {
    productCode: 'CYL50',
    description:
      'For safety standards, you cannot order a cylinder alone. Therefore, we`ve added content for you.',
  },
  {
    productCode: 'CYL2p7',
    description:
      'For safety standards, you cannot order a cylinder alone. Therefore, we`ve added content for you.',
  },
  {
    productCode: 'CYL2.7',
    description:
      'For safety standards, you cannot order a cylinder alone. Therefore, we`ve added content for you.',
  },
  {
    productCode: 'MEDREG',
    description:
      'You can only order this product if you order a Medical Oxygen',
  },
  {
    productCode: 'ACCHRCB',
    description:
      'You can only order this product if you order a Content or Cylinder with content',
  },

  {
    productCode: 'ACCPGS',
    description:
      'You can only order this product if you order a Content or Cylinder with content',
  },
  {
    productCode: 'ACCPKB',
    description: ' order this product if you order a 2.7kg Cylinder',
  },
]

export const ifAddOns = ['ACCHRCB', 'ACCPGS', 'MEDREG', 'ACCPKB']

export const ifOxygens = ['MO2TST', 'MO2TFT', 'MO220C', 'MO2105C', 'MEDREG']

export const allProducts = [
  'CYL11',
  'CYL22',
  'CYL50',
  'MO2TST',
  'MO2TFT',
  'MO220C',
  'MO2105C',
  'LPG11C',
  'LPG2.7C',
  'LPG22C',
  'LPG50C',
  'MO2105C',
  'MO220C',
  'LPG11CCOD',
  'LPG11CCABOD',
  'LPG2.7CCPKOD',
  'LPG22CCOD',
]
