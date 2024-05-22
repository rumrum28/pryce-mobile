import { create } from 'zustand'

type Product = {
  productCode: string
  quantity: number
}

type CartState = {
  cart: Array<Product>
  addProduct: (product: Product) => void
  increaseQuantity: (product: Product) => void
  decreaseQuantity: (product: Product) => void
  removeProduct: (product: Product) => void
}

const useCartStore = create<CartState>((set) => ({
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
              return { ...p, quantity: p.quantity + 1 }
            }
            return p
          }),
        }
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        }
      }
    }),
  increaseQuantity: (product: Product) =>
    set((state) => {
      return {
        cart: state.cart.map((p) => {
          if (p.productCode === product.productCode) {
            return {
              ...p,
              quantity: p.quantity + 1,
            }
          }
          return p
        }),
      }
    }),
  decreaseQuantity: (product: Product) =>
    set((state) => {
      return {
        cart: state.cart.map((p) => {
          if (p.productCode === product.productCode) {
            return {
              ...p,
              quantity: p.quantity - 1,
            }
          }
          return p
        }),
      }
    }),
  removeProduct: (product: Product) =>
    set((state) => {
      const hasProduct = state.cart.find(
        (p: Product) => p.productCode !== product.productCode
      )

      console.log(hasProduct)
      return {
        cart: [...state.cart, { ...product, hasProduct }],
      }
      //   return {
      //     cart: hasProduct
      //   }
    }),
}))

export default useCartStore
