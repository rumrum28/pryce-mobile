import { router } from 'expo-router'
import { ProfileProps } from '~/types/userStorage'

export const logout = (
  setSelectedUser: (selectedUser: string | null) => void,
  setToken: (token: string) => void,
  setUsers: (userRecords: ProfileProps) => void,
  setEmail: (email: string) => void,
  setChangeAddressTrigger: (e: boolean) => void,
  setAddressRef: (e: string) => void
) => {
  setSelectedUser(null)
  setToken('')
  setUsers([])
  setEmail('')
  setChangeAddressTrigger(false)
  setAddressRef('')
  router.push('/onboarding/login')
}
