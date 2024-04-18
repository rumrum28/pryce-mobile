//shorten useEffect data TESTING - calculate pgc price
export function discountedPricePGC({
  userLength,
  priceProtectionAmount,
}: {
  userLength: number
  priceProtectionAmount: number
}) {
  let calculatePrice = 0

  if (userLength > 0) {
    calculatePrice = priceProtectionAmount ? priceProtectionAmount : 0
  }

  return calculatePrice
}

//shorten useEffect data TESTING - calculate remaining refills
export function remainingRefillsPGC({
  userLength,
  remainingRefills,
}: {
  userLength: number
  remainingRefills: number
}) {
  let calculatePrice = 0

  if (userLength > 0) {
    calculatePrice = remainingRefills ? remainingRefills : 0
  }

  return calculatePrice
}

//shorten useEffect data TESTING - calculate final price
export function calculatedPrice({
  orignalPrice,
  pgc,
  remainingRefills,
  discountedPrice,
}: {
  orignalPrice: number
  pgc: boolean
  remainingRefills: number
  discountedPrice: number
}) {
  let calculatePrice = orignalPrice

  if (pgc && remainingRefills > 0) {
    calculatePrice =
      orignalPrice >= discountedPrice ? discountedPrice : orignalPrice
  }

  return calculatePrice
}

export function isDiscountActive({
  orignalPrice,
  remainingRefills,
  discountedPrice,
  isPGCMember,
}: {
  orignalPrice: number
  remainingRefills: number
  discountedPrice: number
  isPGCMember: boolean
}) {
  let isDiscount = false

  if (isPGCMember) {
    if (orignalPrice > discountedPrice) {
      isDiscount = remainingRefills > 0 ? true : false
    }
  }

  return isDiscount
}
