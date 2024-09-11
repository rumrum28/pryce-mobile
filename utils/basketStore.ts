import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { cartStorage } from '~/server/mmkv'

export interface Product {
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

export interface AddOn {
  Id: string
  Name: string
  ProductCode: string
  UnitPrice: number
}

export interface BasketProduct extends Product {
  quantity: number
  addOns?: Array<AddOn>
}

export interface BasketState {
  products: Array<Product & { quantity: number; addOns?: Array<AddOn> }>
  addProduct: (
    product: Product,
    quantity?: number,
    addOns?: Array<AddOn>
  ) => void
  reduceProduct: (product: Product, addOnId?: string) => void
  clearCart: () => void
  updateProducts: (newProducts: Product[]) => void

  items: number
  total: number
}

const useBasketStore = create<BasketState>()(
  persist(
    (set) => ({
      products: [],
      items: 0,
      total: 0,

      addProduct: (product, quantity = 1, addOns = []) => {
        const numQuantity = quantity ?? 1
        set((state) => {
          let additionalCost = 0

          if (addOns.length > 0) {
            addOns.forEach((addOn) => {
              additionalCost += addOn.UnitPrice
            })
          }

          const existingProductIndex = state.products.findIndex(
            (p) =>
              p.Id === product.Id &&
              p.addOns?.length === addOns.length &&
              p.addOns?.every((ao, i) => ao.Id === addOns[i].Id)
          )

          if (existingProductIndex !== -1) {
            const updatedProducts = [...state.products]
            updatedProducts[existingProductIndex].quantity += numQuantity

            return {
              products: updatedProducts,
              items: state.items + numQuantity,
              total:
                state.total + product.UnitPrice * numQuantity + additionalCost,
            }
          } else {
            return {
              products: [
                ...state.products,
                { ...product, quantity: numQuantity, addOns },
              ],
              items: state.items + numQuantity,
              total:
                state.total +
                (product.UnitPrice + additionalCost) * numQuantity,
            }
          }
        })
      },

      reduceProduct: (product: Product, addOnId?: string) => {
        set((state) => {
          const existingProductIndex = state.products.findIndex((p) => {
            const idMatches = p.Id === product.Id
            const addOnMatches = addOnId
              ? p.addOns?.some((addOn) => addOn.Id === addOnId)
              : true
            return idMatches && addOnMatches
          })

          if (existingProductIndex === -1) {
            return state
          }

          const existingProduct = state.products[existingProductIndex]

          const productReduction = existingProduct.UnitPrice
          let addOnsReduction = 0

          if (existingProduct.addOns) {
            addOnsReduction = existingProduct.addOns.reduce((sum, addOn) => {
              if (!addOnId || addOn.Id === addOnId) {
                return sum + addOn.UnitPrice
              }
              return sum
            }, 0)
          }

          const totalReduction = productReduction + addOnsReduction

          let updatedProducts
          if (existingProduct.quantity > 1) {
            updatedProducts = [...state.products]
            updatedProducts[existingProductIndex] = {
              ...updatedProducts[existingProductIndex],
              quantity: updatedProducts[existingProductIndex].quantity - 1,
            }
          } else {
            updatedProducts = state.products.filter(
              (_, index) => index !== existingProductIndex
            )
          }

          return {
            ...state,
            products: updatedProducts,
            items: state.items - 1,
            total: state.total - totalReduction,
          }
        })
      },
      clearCart: () => set({ products: [], items: 0, total: 0 }),
      updateProducts: (newProducts) =>
        set((state) => {
          const newPricebookId = newProducts[0]?.Pricebook2Id

          console.log('newPricebookId:', newPricebookId)

          const currentPricebookId =
            state.products.length > 0 ? state.products[0].Pricebook2Id : null

          console.log('currentPricebookId:', currentPricebookId)
          if (currentPricebookId !== newPricebookId) {
            const newProductsMap = new Map(
              newProducts.map((product) => [product.Product2Id, product])
            )

            console.log('newProductsMap:', newProductsMap)

            const updatedProducts = state.products.map((product) => {
              const newProduct = newProductsMap.get(product.Product2Id)
              return newProduct
                ? {
                    ...product,
                    UnitPrice: newProduct.UnitPrice,
                    Product2Id: newProduct.Pricebook2Id,
                  }
                : product
            })

            const items = updatedProducts.reduce(
              (acc, product) => acc + product.quantity,
              0
            )
            const total = updatedProducts.reduce(
              (acc, product) => acc + product.UnitPrice * product.quantity,
              0
            )

            return { products: updatedProducts, items, total }
          }

          return state // No update needed if the Pricebook2Id is the same
        }),
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => cartStorage),
    }
  )
)

export default useBasketStore
