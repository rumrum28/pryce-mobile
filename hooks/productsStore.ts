import { create } from 'zustand'
import {
  FavoriteProps,
  FavoritesList,
  ProductSingle,
  ProductsProps,
} from '~/types/product'

type Product = {
  productCode: string
  quantity: number
}

type CartState = {
  cart: Array<Product>
  favorites: FavoriteProps | []
  addProduct: (product: Product) => void
  increaseQuantity: (product: Product) => void
  decreaseQuantity: (product: Product) => void
  removeProduct: (product: Product) => void
  setFavorites: (fav: string) => void
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  favorites: [],
  setFavorites: (fav: string) =>
    set((state) => {
      const checkFavoriteIfExists = state.favorites.filter(
        (favFind: FavoritesList) => favFind.productCode === fav
      )

      console.log(checkFavoriteIfExists)
      console.log('check')

      if (checkFavoriteIfExists.length > 0) {
        // Optionally handle the case where the item already exists, for example, by removing it
        return {
          favorites: state.favorites.filter(
            (favFind: FavoritesList) => favFind.productCode !== fav
          ),
        }
      } else {
        return {
          favorites: [...state.favorites, { ...{ productCode: fav } }],
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
