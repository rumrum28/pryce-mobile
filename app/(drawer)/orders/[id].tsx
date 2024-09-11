import { useLocalSearchParams } from 'expo-router'
import OrdersPage from '~/components/orders'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  return <OrdersPage id={id} />
}
