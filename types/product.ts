type ImagesProps = {
  id: number
  product_code: string
  thumbnail: string
  created_at: string
  updated_at: string
}
export type ProductProps = {
  id: number
  name: string
  pricebook_id: string
  pricebook_entry_id: string
  product_id: string
  product_code: string
  unit_price: number
  status: string
  created_at: string
  updated_at: string
  product_images: ImagesProps
  quantity?: number
  discounted_price?: number
}
export type Products = ProductProps[]

export type FilterTypeProps = {
  type: string
  message: string
} | null
