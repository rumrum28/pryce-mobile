export type ProductSingle = {
  attributes: {
    type: string
    url: string
  }
  Id: string
  Name: string
  Pricebook2Id: string
  Product2Id: string
  ProductCode: string
  UnitPrice: number
  RegularPrice: number
}

type addressReference = {
  addressRef?: string
}

export type ProductsProps = ProductSingle[]

export type FilterTypeProps = {
  type: string
  message: string
} | null

export type FavoritesList = {
  productCode: string
}

export type FavoriteProps = FavoritesList[]

export type CombinedArray = {
  Id: string
  Name: string
  Pricebook2Id: string
  Product2Id: string
  ProductCode: string
  RegularPrice: number
  UnitPrice: number
  attributes: {
    type: string
    url: string
  }
  description: string[]
  id: string
  image: number
  name: string
}

export type CombinedArrayProps = CombinedArray[]
