import { number } from 'zod'
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
  Product2Id: string
  UnitPrice: number
  Pricebook2Id: string
  RegularPrice: number
}

export interface BasketProduct extends Product {
  quantity: number
  addOns?: Array<AddOn>
}

export interface BasketState {
  products: BasketProduct[]
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
            additionalCost = addOns.reduce((sum, addOn) => {
              const addOnUnitPrice = addOn.UnitPrice ?? 0
              const addOnRegularPrice = addOn.RegularPrice ?? 0
              const addOnCalculatedPrice =
                addOnUnitPrice < addOnRegularPrice
                  ? addOnUnitPrice
                  : addOnRegularPrice

              return sum + addOnCalculatedPrice
            }, 0)
          }

          const productUnitPrice = product.UnitPrice ?? 0
          const productRegularPrice = product.RegularPrice ?? 0
          const calculatedProductPrice =
            productUnitPrice < productRegularPrice
              ? productUnitPrice
              : productRegularPrice

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
                state.total +
                calculatedProductPrice * numQuantity +
                additionalCost * numQuantity,
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
                calculatedProductPrice * numQuantity +
                additionalCost * numQuantity,
            }
          }
        })
      },

      reduceProduct: (product: Product, addOnId?: string) => {
        set((state) => {
          type ProductWithAddOns = Product & { addOns?: AddOn[] }

          const existingProductIndex = state.products.findIndex((p) => {
            const idMatches = p.Id === product.Id
            const addOnsMatch =
              (p as ProductWithAddOns).addOns?.length ===
                (product as ProductWithAddOns).addOns?.length &&
              (p as ProductWithAddOns).addOns?.every(
                (addOn, i) =>
                  addOn.Id === (product as ProductWithAddOns).addOns![i].Id
              )
            return idMatches && addOnsMatch
          })

          if (existingProductIndex === -1) {
            return state
          }

          const existingProduct = state.products[existingProductIndex]

          const productUnitPrice = existingProduct.UnitPrice ?? 0
          const productRegularPrice = existingProduct.RegularPrice ?? 0
          const productReduction =
            productUnitPrice < productRegularPrice
              ? productUnitPrice
              : productRegularPrice

          let addOnsReduction = 0
          const existingProductWithAddOns = existingProduct as ProductWithAddOns
          if (existingProductWithAddOns.addOns) {
            addOnsReduction = existingProductWithAddOns.addOns.reduce(
              (sum, addOn) => {
                const addOnUnitPrice = addOn.UnitPrice ?? 0
                const addOnRegularPrice = addOn.RegularPrice ?? 0
                const addOnCalculatedPrice =
                  addOnUnitPrice < addOnRegularPrice
                    ? addOnUnitPrice
                    : addOnRegularPrice

                return sum + addOnCalculatedPrice
              },
              0
            )
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

      updateProducts: (newProducts: Product[]) =>
        set((state) => {
          const newPricebookId = newProducts[0]?.Pricebook2Id
          const currentPricebookId =
            state.products.length > 0 ? state.products[0].Pricebook2Id : null

          if (currentPricebookId !== newPricebookId) {
            const newProductsMap = new Map(
              newProducts.map((product) => [product.Product2Id, product])
            )

            const updatedProducts = state.products.map((product) => {
              const newProduct = newProductsMap.get(product.Product2Id)

              if (newProduct) {
                const existingAddOns = product.addOns || []
                const updatedAddOns = existingAddOns.map((addOn) => {
                  const newAddOn = newProductsMap.get(addOn.Product2Id)
                  if (newAddOn) {
                    const addOnUnitPrice = newAddOn.UnitPrice ?? 0
                    const addOnRegularPrice = newAddOn.RegularPrice ?? 0
                    const addOnCalculatedPrice =
                      addOnUnitPrice < addOnRegularPrice
                        ? addOnUnitPrice
                        : addOnRegularPrice

                    return {
                      ...addOn,
                      UnitPrice: addOnCalculatedPrice,
                      RegularPrice: addOn.RegularPrice,
                    }
                  }
                  return addOn
                })

                const productUnitPrice = newProduct.UnitPrice ?? 0
                const productRegularPrice = newProduct.RegularPrice ?? 0
                const productCalculatedPrice =
                  productUnitPrice < productRegularPrice
                    ? productUnitPrice
                    : productRegularPrice

                return {
                  ...product,
                  ...newProduct,
                  UnitPrice: productCalculatedPrice,
                  addOns: updatedAddOns,
                }
              }

              return product
            })

            const allProducts = [...updatedProducts]
            const items = allProducts.reduce(
              (acc, product) => acc + product.quantity,
              0
            )
            const total = allProducts.reduce((acc, product) => {
              const productTotal = product.UnitPrice * product.quantity
              const addOnsTotal = (product.addOns || []).reduce(
                (addOnAcc, addOn) =>
                  addOnAcc + addOn.UnitPrice * product.quantity,
                0
              )
              return acc + productTotal + addOnsTotal
            }, 0)

            return { products: allProducts, items, total }
          }

          return state
        }),
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => cartStorage),
    }
  )
)

export default useBasketStore
