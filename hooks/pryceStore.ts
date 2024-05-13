import { create } from 'zustand'
import { ProfileResponseSingle } from '~/types/apiresults'

type PryceState = {
  getStarted: boolean
  email: string
  token: string
  selectedUser: number
  users: Array<ProfileResponseSingle>
  setGetStarted: (getStarted: boolean) => void
  setEmail: (email: string) => void
  setToken: (token: string) => void
  setSelectedUser: (selectedUser: number) => void
  setUsers: (userRecords: ProfileResponseSingle[]) => void
}

const usePryceStore = create<PryceState>((set) => ({
  getStarted: true,
  email: '',
  token: '',
  selectedUser: 0,
  users: [],
  setGetStarted: (value: boolean) => {
    console.log(value + 'test')

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
  setSelectedUser: (selectedUser: number) => {
    set(() => ({ selectedUser: selectedUser }))
  },
  setUsers: (userRecords: ProfileResponseSingle[]) => {
    set(() => ({
      users: userRecords,
    }))
  },
}))

export default usePryceStore
