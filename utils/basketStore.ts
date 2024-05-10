import { create } from 'zustand'

export interface Product {
  id: number
  name: string
  pricebook_id: string
  pricebook_entry_id: string
  product_id: string
  unit_price: number
  description: string
  product_code: string
  category: string
  img: any
}

export interface BasketState {
  products: Array<Product & { quantity: number }>
  addProduct: (product: Product, quantity?: number) => void
  reduceProduct: (product: Product) => void
  clearCart: () => void
  items: number
  total: number
}

const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,

  addProduct: (product, quantity = 1) => {
    const numQuantity = quantity ?? 1
    set((state) => {
      state.items += numQuantity
      state.total += product.unit_price * numQuantity
      const hasProduct = state.products.find((p) => p.id === product.id)
      if (hasProduct) {
        hasProduct.quantity += numQuantity
        return { products: [...state.products] }
      } else {
        return {
          products: [...state.products, { ...product, quantity: numQuantity }],
        }
      }
    })
  },

  reduceProduct: (product) => {
    set((state) => {
      state.total -= product.unit_price
      state.items -= 1
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              p.quantity -= 1
            }
            return p
          })
          .filter((p) => p.quantity > 0),
      }
    })
  },
  clearCart: () => set({ products: [], items: 0, total: 0 }),
}))

export default useBasketStore
