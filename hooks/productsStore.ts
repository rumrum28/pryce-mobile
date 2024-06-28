import { create } from 'zustand'
import { FavoriteProps, ProductSingle, ProductsProps } from '~/types/product'

type Product = {
  productCode: string
  quantity: number
}

type CartState = {
  cart: Array<Product>
  favorites: FavoriteProps[] | []
  addProduct: (product: Product) => void
  increaseQuantity: (product: Product) => void
  decreaseQuantity: (product: Product) => void
  removeProduct: (product: Product) => void
  setFavorites: (fav: FavoriteProps) => void
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  favorites: [],
  setFavorites: (fav: FavoriteProps) =>
    set((state) => {
      const checkFavoriteIfExists = state.favorites.find(
        (favFind: FavoriteProps) => favFind.productCode === fav.productCode
      )

      if (checkFavoriteIfExists) {
        // Optionally handle the case where the item already exists, for example, by removing it
        return {
          favorites: state.favorites.filter(
            (favFind: FavoriteProps) => favFind.productCode !== fav.productCode
          ),
        }
      } else {
        return {
          favorites: [...state.favorites, { ...fav }],
        }
      }
    }),
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

      return {
        cart: [...state.cart, { ...product, hasProduct }],
      }
      //   return {
      //     cart: hasProduct
      //   }
    }),
}))

export default useCartStore
