import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { cartStorage } from '~/server/mmkv'

export type Product = {
  productCode: string
  quantity: number
}

type CartState = {
  cart: Array<Product>
  addProduct: (product: Product) => void
  increaseQuantity: (product: string) => void
  decreaseQuantity: (product: string) => void
  removeProduct: (product: string) => void
  clearCart: () => void
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addProduct: (product: Product) =>
        set((state) => {
          const hasProduct = state.cart.find(
            (p: Product) => p.productCode === product.productCode
          )

          if (hasProduct) {
            return {
              cart: state.cart.map((p: Product) => {
                if (p.productCode === product.productCode) {
                  // return {
                  //   ...p,
                  //   quantity:
                  //     product.quantity > 1
                  //       ? p.quantity + product.quantity
                  //       : p.quantity + 1,
                  // }
                  return {
                    ...p,
                    quantity: product.quantity,
                  }
                }
                return p
              }),
            }
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: product.quantity }],
            }
          }
        }),
      increaseQuantity: (productCode: string) =>
        set((state) => {
          return {
            cart: state.cart.map((p) => {
              if (p.productCode === productCode) {
                return {
                  ...p,
                  quantity: p.quantity + 1,
                }
              }
              return p
            }),
          }
        }),
      decreaseQuantity: (productCode: string) =>
        set((state) => {
          return {
            cart: state.cart.map((p) => {
              if (p.productCode === productCode) {
                return {
                  ...p,
                  quantity: p.quantity - 1 < 1 ? 1 : p.quantity - 1,
                }
              }

              return p
            }),
          }
        }),
      removeProduct: (productCode: string) =>
        set((state) => {
          const newCart = state.cart.filter(
            (p) => p.productCode !== productCode
          )

          return {
            cart: newCart,
          }
        }),
      clearCart: () =>
        set((state) => {
          return {
            cart: [],
          }
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => cartStorage),
    }
  )
)

export default useCartStore
