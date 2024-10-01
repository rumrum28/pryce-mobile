import { useMutation } from '@tanstack/react-query'
import { fetchOrderByUser } from '~/server/api' // API function to fetch orders
import { queryClient } from './queryClient' // Query client instance
import { UserOrderResponseProps } from '~/types/userStorage' // Type definition

// Define the type of the mutation's argument (with token and type)
interface FetchOrdersVariables {
  token: string
  type: string
}

export const useFetchOrderDetails = () => {
  const mutation = useMutation<
    UserOrderResponseProps,
    Error,
    FetchOrdersVariables
  >({
    mutationFn: ({ token, type }) => fetchOrderByUser(token, type),
    onSuccess: (data: UserOrderResponseProps) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchOrdersOnLoad'],
      })
    },
  })

  return {
    ...mutation,
    fetchOrdersDetails: mutation.mutate,
    isPending: mutation.isPending,
  }
}
