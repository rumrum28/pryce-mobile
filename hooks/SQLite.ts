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

// function insertRecord(email: string, accessToken: string) {
//   const insertQuery = `INSERT INTO pryce (id, email, access_token, selected_user) VALUES (1, ?, ?, ?)`

//   db.transaction((tx) => {
//     tx.executeSql(insertQuery, [email, accessToken, 0], (_, result) => {
//       console.log('Insert successful, new record ID:', result.insertId)
//     })
//   })
// }

// export const insertToPryce = async (data: LoginResponse) => {
//   const updateQuery = `UPDATE pryce SET email = ?, access_token = ?, selected_user = ? WHERE id = 1`

//   db.transaction((tx) => {
//     tx.executeSql(
//       updateQuery,
//       [data.email, data.accessToken, 0],
//       (txObj, resultSet) => {
//         if (resultSet.rowsAffected > 0) {
//           console.log(
//             'Update successful, rows affected:',
//             resultSet.rowsAffected
//           )
//         } else {
//           console.log('wer')
//           insertRecord(data.email, data.accessToken)
//         }
//       }
//     )
//   })
// }

//SELECT * FROM pryce
// export const getFromPryce = async () => {
//   const result = await db.getAllAsync('SELECT * FROM pryce')
//   console.log(result)
// }

//intro page get started button
// export const getStartedCheck = async () => {
//   console.log('test')
//   await db.transactionAsync(async (tx) => {
//     const result = await tx.executeSqlAsync(
//       'SELECT * FROM pryce_settings WHERE `type`=?',
//       []
//     )
//     const data = result.rows
//     console.log(data)
//   })
// }

// //set get started add to pryce_settings
// const insertGetStartedInitialValue = async () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'INSERT INTO pryce_settings (type, value, status) VALUES (?, ?, ?)',
//       ['getStarted', 'true', 1],
//       (txObj, result) => {
//         if (result.rowsAffected > 0) {
//           console.log('success')
//         } else {
//           console.log('failed')
//         }
//       }
//     )
//   })
// }

// export const updateGetStartedValue = async (option: {
//   type: string
//   value: string
//   status: number
// }) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'UPDATE pryce_settings SET value = ?, status = ? WHERE type = ?',
//       [option.value, option.status, option.type],
//       (txObj, result) => {
//         if (result.rowsAffected > 0) {
//           console.log(result)
//           return result
//         } else {
//           insertGetStartedInitialValue()
//         }
//       }
//     )
//   })
// }
