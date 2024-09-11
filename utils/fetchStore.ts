import { create } from 'zustand'
import { fetchProductsQuery } from '~/server/api'
import { ProductSingle } from '~/types/product'

interface ProductState {
  products: ProductSingle[]
  setProducts: (products: ProductSingle[]) => void
  fetchProducts: (addressRef: string) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  fetchProducts: async (addressRef: string) => {
    try {
      const data = await fetchProductsQuery(addressRef)
      set({ products: data })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
}))
