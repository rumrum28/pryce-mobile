import { OTPInputs, ProfileResponse, UserInputs } from '~/types/apiresults'
import { env } from '~/types/env'
import { LoginResponse, ProfileProps } from '~/types/userStorage'

// const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`); // check if movie is in favorites
// const [favorites, setFavorites] = useMMKVObject<Favorites[]>('favorites'); // get all favorites

// const movieDetails = useQuery({
//   queryKey: ['user', id],
//   queryFn: () => getMovieDetails(id, mediaType)
// });

export const login = async (userData: UserInputs) => {
  const response = await fetch(`${env.EXPO_PUBLIC_LOCAL_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    cache: 'no-store',
  })
  const data: LoginResponse = await response.json()
  console.log(data)
  return data
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
  const loginResponse: LoginResponse = await response.json()

  if (loginResponse.success) {
    const fetchProfile = await fetch(
      `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginResponse.access_token}`,
        },
        cache: 'no-store',
      }
    )
    const profileResponse: ProfileProps = await fetchProfile.json()

    const firstTrueMember = profileResponse.find(
      (item) => item.Prycegas_Club_Member__c === true
    )

    if (firstTrueMember) {
      const fetchFirstTrueMember = await fetch(
        `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginResponse.access_token}`,
          },
          body: JSON.stringify({
            account_number: firstTrueMember.Account_Number__c,
          }),
          cache: 'no-store',
        }
      )
      const changeAddressResponse: ProfileProps =
        await fetchFirstTrueMember.json()
      return { loginResponse, profileResponse, changeAddressResponse }
    }

    return { loginResponse, profileResponse }
  }
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
  console.log(data)
  return data
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
