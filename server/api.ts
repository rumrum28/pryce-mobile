import { OTPInputs, OTPResponse, UserInputs } from '~/types/apiresults'
import { env } from '~/types/env'
import { ProductsProps } from '~/types/product'
import { LoginResponse, Profile, ProfileProps } from '~/types/userStorage'

// const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`); // check if movie is in favorites
// const [favorites, setFavorites] = useMMKVObject<Favorites[]>('favorites'); // get all favorites

// const movieDetails = useQuery({
//   queryKey: ['user', id],
//   queryFn: () => getMovieDetails(id, mediaType)
// });

export const login = async (userData: UserInputs) => {
  console.log('test')
  const response = await fetch(`${env.EXPO_PUBLIC_LOCAL_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    cache: 'no-store',
  })
  const loginResponse: LoginResponse = await response.json()

  console.log(loginResponse)

  if (loginResponse.success) {
    const fetchProfile = await fetch(
      `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginResponse.access_token}`,
        },
        cache: 'no-store',
      }
    )
    const profileResponse: ProfileProps = await fetchProfile.json()

    if (profileResponse.length > 0) {
      return { loginResponse, profileResponse }
    } else {
      console.log('error on /api/user/profile')
    }
  } else {
    console.log('error on /login/api')
  }
}

export const getOtp = async (userData: OTPInputs) => {
  const response = await fetch(`${env.EXPO_PUBLIC_LOCAL_URL}/api/get-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    cache: 'no-store',
  })
  const OTPResponse: OTPResponse = await response.json()
  return OTPResponse
}

export const profile = async (token: string) => {
  const response = await fetch(
    `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/profile`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  )
  const data: ProfileProps = await response.json()
  return data
}

export const changeAddressOnLoad = async (data: {
  token: string
  accountNumber: string
}) => {
  const changeAddress = await fetch(
    `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/change-address`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        account_number: data.accountNumber,
      }),
      cache: 'no-store',
    }
  )
  const changeAddressResponse: Profile = await changeAddress.json()

  if (changeAddressResponse) {
    const getAllProducts = await fetch(
      `${env.EXPO_PUBLIC_LOCAL_URL}/api/products?ref=${changeAddressResponse?.ref}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )
    const getAllProductsResponse: ProductsProps = await getAllProducts.json()

    return getAllProductsResponse
  } else {
    console.log('error on /api/user/change-address')
  }
}

export const changeAddress = async (data: {
  token: string
  accountNumber: string
}) => {
  const changeAddress = await fetch(
    `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/change-address`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        account_number: data.accountNumber,
      }),
      cache: 'no-store',
    }
  )
  const changeAddressResponse: ProfileProps = await changeAddress.json()
  return changeAddressResponse
}

// export const getSearchResults = async (
//   query: string
// ): Promise<TrendingResult> => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${API_KEY}&query=${query}`
//   )
//   const data = await response.json()
//   return data
// }

// export const getMovieDetails = async (id: string, type: MediaType) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`
//   )
//   const data = await response.json()
//   return data
// }
