import { useMutation } from '@tanstack/react-query'
import { fetchProductsQuery } from '~/server/api'
import { queryClient } from './queryClient'

export const useFetchProductsDetails = () => {
  const mutation = useMutation({
    mutationFn: fetchProductsQuery,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchProductsOnLoad'],
      })
    },
    // onError: (error) => {
    //   console.error('Error placing order:', error);
    // },
  })

  return {
    ...mutation,
    isPending: mutation.isPending,
  }
}
