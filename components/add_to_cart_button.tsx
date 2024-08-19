import { Text } from 'tamagui'
import StyledButton from '~/components/styled_button'
import useCartStore from '~/hooks/productsStore'

export default function AddToCartButton({
  addToCart,
}: {
  addToCart: () => void
}) {
  const cart = useCartStore((state) => state.cart)

  return (
    <StyledButton
      style={{
        flex: 1,
      }}
      onPress={addToCart}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 14,
        }}
      >
        Add to cart {cart.length > 0 ? '(' + cart.length + ')' : null}
      </Text>
    </StyledButton>
  )
}
