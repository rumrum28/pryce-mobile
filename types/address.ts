type Barangay = string

export type AddressProps = {
  id: string
  city: string
  province: string
  pgi_region: string
  status: string
  code: string
  barangays?: Barangay[]
}
