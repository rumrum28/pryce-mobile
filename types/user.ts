export type RegisterDataProps = {
  phoneNumber: string
  email: string
  password: string
  firstName: string
  lastName: string
  province: string
  city: string
  street: string
  barangay: string
  region: string
}

export type UserProfileProps = {
  name: string
  phoneNumber: string
  address: string
  email: string
  password: string
}

export type PryceSettings = {
  id: number
  status: number
  type: string
  value: string
}[]
