import { useMutation } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { changeAddressOnLoad, fetchProductsQuery } from '~/server/api'
import usePryceStore from './pryceStore'
import { router } from 'expo-router'

export const useFetchProducts = () => {
  const setAddressRef = usePryceStore((state) => state.setAddressRef)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const setToken = usePryceStore((state) => state.setToken)
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const setUsers = usePryceStore((state) => state.setUsers)
  const setEmail = usePryceStore((state) => state.setEmail)

  const mutation = useMutation({
    mutationFn: changeAddressOnLoad,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchProductsOnLoad'],
      })

      if (data?.addressRef) {
        setAddressRef(data.addressRef)
      }

      if (!data?.productsResponse) {
        setSelectedUser(null)
        setToken('')
        setUsers([])
        setEmail('')
        setChangeAddressTrigger(false)
        setAddressRef('')
        router.push('/onboarding/login')
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return {
    ...mutation,
    fetchProducts: mutation.mutate,
    isPending: mutation.isPending,
  }
}
