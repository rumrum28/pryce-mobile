import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

const pstorage = new MMKV({
  id: 'pryce-storage',
})

const ustorage = new MMKV({
  id: 'user-storage',
})

const cstorage = new MMKV({
  id: 'cart-storage',
})

export const pryceStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return pstorage.set(name, value)
  },
  getItem: (name: string) => {
    const value = pstorage.getString(name)
    return value ?? null
  },
  removeItem: (name: string) => {
    return pstorage.delete(name)
  },
}

export const userStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return ustorage.set(name, value)
  },
  getItem: (name: string) => {
    const value = ustorage.getString(name)
    return value ?? null
  },
  removeItem: (name: string) => {
    return ustorage.delete(name)
  },
}

export const cartStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return cstorage.set(name, value)
  },
  getItem: (name: string) => {
    const value = cstorage.getString(name)
    return value ?? null
  },
  removeItem: (name: string) => {
    return cstorage.delete(name)
  },
}
