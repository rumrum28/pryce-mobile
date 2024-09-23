export const formatCurrency = (price: number) => {
  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(price)

  return formattedPrice.replace('₱', '₱ ')
}
