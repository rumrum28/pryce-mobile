import { useMutation } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { changeAddressOnLoad, fetchProductsQuery } from '~/server/api'
import usePryceStore from './pryceStore'

export const useFetchProducts = () => {
  const setAddressRef = usePryceStore((state) => state.setAddressRef)

  const mutation = useMutation({
    mutationFn: changeAddressOnLoad,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchProductsOnLoad'],
      })

      if (data?.addressRef) {
        setAddressRef(data.addressRef)
      }
    },
  })

  return {
    ...mutation,
    fetchProducts: mutation.mutate,
    isPending: mutation.isPending,
  }
}
