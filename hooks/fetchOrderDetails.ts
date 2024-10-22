import { UserOrderResponse } from '~/types/userStorage'
import { queryClient } from './queryClient'
import { useMutation } from '@tanstack/react-query'
import { fetchOrderByUser } from '~/server/api'

export const useFetchOrderDetails = () => {
  const mutation = useMutation<
    UserOrderResponse,
    Error,
    { token: string; type: string }
  >({
    mutationFn: ({ token, type }) => fetchOrderByUser(token, type),
    onSuccess: () => {
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
