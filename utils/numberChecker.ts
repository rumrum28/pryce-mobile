import { z } from 'zod'

// tell zod to only accept number that start with 09
export const mobileOrDigitSchema = z
  .string()
  .refine((data) => data.startsWith('09'), {
    message: 'Invalid phone number',
  })

export const formatPhoneNumber = (input: string) => {
  const numbers = input.replace(/\D/g, '')
  const match = numbers.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/)

  if (match) {
    return `${match[1]}${match[2] ? ' ' + match[2] : ''}${match[3] ? ' ' + match[3] : ''}`
  }

  return numbers
}

export const formatOTP = (input: string) => {
  const numbers = input.replace(/\D/g, '')
  const match = numbers.match(/^(\d{0,3})(\d{0,3})$/)

  if (match) {
    return `${match[1]}${match[2] ? ' ' + match[2] : ''}${match[3] ? ' ' + match[3] : ''}`
  }

  return numbers
}
