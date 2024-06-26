import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

export const loadDatabase = async () => {
  const dbName = 'PryceDB'
  const dbAsset = require('../database/pryce.db')
  const dbUri = Asset.fromModule(dbAsset).uri
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath)
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite',
      {
        intermediates: true,
      }
    )
    await FileSystem.downloadAsync(dbUri, dbFilePath)
  }
}
