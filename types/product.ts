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
export type ProductsProps = ProductSingle[]

export type FilterTypeProps = {
  type: string
  message: string
} | null
