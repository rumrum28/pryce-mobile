import { ImageSourcePropType } from 'react-native'

export type FilterTypeProps = {
  type: string
  message: string
} | null

export type FavoritesList = {
  productCode: string
}

export type FavoriteProps = FavoritesList[]

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
  message?: string
}

export type ProductsProps = ProductSingle[]

export type ProductDisplayProps = {
  id: number
  productCode: string[]
  image: any
  name: string
  description: string
}
