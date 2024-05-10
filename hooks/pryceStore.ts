import { useMMKVObject } from 'react-native-mmkv'

const [favorites, setFavorites] = useMMKVObject<Favorites[]>('favorites')
