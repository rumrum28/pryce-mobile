import { MMKV } from 'react-native-mmkv'
import { LoginResponse, ProfileResponse, UserInputs } from '~/types/apiresults'
import { env } from '~/types/env'

// const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`); // check if movie is in favorites
// const [favorites, setFavorites] = useMMKVObject<Favorites[]>('favorites'); // get all favorites

// const movieDetails = useQuery({
//   queryKey: ['user', id],
//   queryFn: () => getMovieDetails(id, mediaType)
// });

export const login = async (userData: UserInputs) => {
  try {
    const response = await fetch(`${env.EXPO_PUBLIC_LOCAL_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    const data: LoginResponse = await response.json()

    const storage = new MMKV({
      id: `user-${data.access_token}-storage`,
      encryptionKey: `${env.EXPO_PUBLIC_ENCRYPT_KEY}`,
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export const profile = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    const response = await fetch(
      `${env.EXPO_PUBLIC_LOCAL_URL}/api/user/profile`
    )
    const data: ProfileResponse = await response.json()
    return data
    return data
  } catch (error) {
    console.log(error)
  }
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
