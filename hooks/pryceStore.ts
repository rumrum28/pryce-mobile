import { create } from 'zustand'
import { ProfileResponseSingle } from '~/types/apiresults'
import { createJSONStorage, persist } from 'zustand/middleware'
import { pryceStorage } from '~/server/mmkv'
import { ProfileProps } from '~/types/userStorage'

type PryceState = {
  getStarted: boolean
  email: string
  token: string
  selectedUser: string | null
  users: ProfileProps
  setGetStarted: (getStarted: boolean) => void
  setEmail: (email: string) => void
  setToken: (token: string) => void
  setSelectedUser: (selectedUser: string) => void
  setUsers: (userRecords: ProfileProps) => void
}

const usePryceStore = create<PryceState>()(
  persist(
    (set, get) => ({
      getStarted: true,
      email: '',
      token: '',
      selectedUser: null,
      users: [],
      setGetStarted: (value: boolean) => {
        set(() => ({
          getStarted: value,
        }))
      },
      setEmail: (email: string) => {
        set(() => ({ email: email }))
      },
      setToken: (token: string) => {
        set(() => ({
          token: token,
        }))
      },
      setSelectedUser: (selectedUser: string) => {
        set(() => ({ selectedUser: selectedUser }))
      },
      setUsers: (userRecords: ProfileProps) => {
        set(() => ({
          users: userRecords,
        }))
      },
    }),
    {
      name: 'pryce-storage',
      storage: createJSONStorage(() => pryceStorage),
    }
  )
)

export default usePryceStore
