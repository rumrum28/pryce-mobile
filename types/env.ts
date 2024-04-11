import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_LOCAL_URL: z.string().url(),
  EXPO_PUBLIC_TEST_URL: z.string().url(),
  EXPO_PUBLIC_LIVE_URL: z.string().url(),
  EXPO_PUBLIC_ENCRYPT_KEY: z.string().url(),
})

export const env = envSchema.parse(process.env)
