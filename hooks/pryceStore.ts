import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { pryceStorage } from '~/server/mmkv'
import { ProfileProps } from '~/types/userStorage'
import { FavoriteProps, FavoritesList } from '~/types/product'

type PryceState = {
  getStarted: boolean
  email: string
  token: string
  selectedUser: string | null
  users: ProfileProps
  changeAddressTrigger: boolean
  addressRef: string
  favorites: FavoriteProps | []
  setFavorites: (fav: string) => void
  setAddressRef: (e: string) => void
  setChangeAddressTrigger: (e: boolean) => void
  setGetStarted: (getStarted: boolean) => void
  setEmail: (email: string) => void
  setToken: (token: string) => void
  setSelectedUser: (selectedUser: string | null) => void
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
      changeAddressTrigger: false,
      addressRef: '',
      favorites: [],
      setFavorites: (fav: string) =>
        set((state) => {
          const checkFavoriteIfExists = state.favorites.filter(
            (favFind: FavoritesList) => favFind.productCode === fav
          )

          if (checkFavoriteIfExists.length > 0) {
            // Optionally handle the case where the item already exists, for example, by removing it
            return {
              favorites: state.favorites.filter(
                (favFind: FavoritesList) => favFind.productCode !== fav
              ),
            }
          } else {
            return {
              favorites: [...state.favorites, { ...{ productCode: fav } }],
            }
          }
        }),
      setAddressRef: (e: string) => {
        set(() => ({
          addressRef: e,
        }))
      },
      setChangeAddressTrigger: (e: boolean) => {
        set(() => ({
          changeAddressTrigger: e,
        }))
      },
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
      setSelectedUser: (selectedUser: string | null) => {
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
