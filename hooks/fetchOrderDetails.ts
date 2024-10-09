import { UserOrderResponseProps } from '~/types/userStorage'
import { queryClient } from './queryClient'
import { useMutation } from '@tanstack/react-query'
import { fetchOrderByUser } from '~/server/api'

export const useFetchOrderDetails = () => {
  const mutation = useMutation<
    UserOrderResponseProps,
    Error,
    { token: string }
  >({
    mutationFn: ({ token }) => fetchOrderByUser(token), // Only token is passed now
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
