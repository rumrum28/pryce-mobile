import * as SQLite from 'expo-sqlite'
import { GetUserChecker, LoginResponse } from '~/types/apiresults'

export const db = SQLite.openDatabase('PryceDB', '1.0')
const readOnly = true

//create a `pryce` table with id primary, email, access_token, selected_user
export const createTablePryce = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pryce (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      access_token TEXT,
      selected_user INTEGER
    );
  `

  const resetAutoIncrement = `
    ALTER TABLE pryce AUTO_INCREMENT = 1;
  `

  const deleteTableData = `
    DELETE FROM pryce;
  `

  db.transaction((tx) => {
    tx.executeSql(createTableQuery, [], () => {
      console.log('table created')
    })
  })
}

//create a user table with "id", "account_number", "contact_person", "mobile_number", "name", "first_name", "middle_name", "last_name", "pryce_region", "pgc_id_number", "bought_pgc_membership", "prycegas_club_member", "expiration_date", "primary_state_province", "primary_street", "primary_barangay", "primary_city2", "pryce_region_2", "secondary_city2", "secondary_mobile_number", "secondary_state_province", "secondary_street", "pryce_parameter", "number_of_refills", "remaining_refills", "price_protection_amount", "number_of_cylinders", "remaining_cylinders", "price_protection_amount_cylinder", "remaining_cylinders_2p7", "price_protection_amount_2p7_cylinders", "remaining_refills_2p7", "price_protection_amount_2p7_refills", "remaining_refills_22", "price_protection_amount_22_refills", "remaining_cylinders_22", "price_protection_amount_22_cylinders", "number_of_cylinders_50", "remaining_50_cylinders", "price_protection_amount_50_cylinders", "number_of_refills_50", "remaining_50_refills", "price_protection_amount_50_refills", "number_of_stoves", "remaining_stoves", "price_protection_amount_stove", "number_of_med_oxygen_tank_flask_type", "remaining_medical_oxygen_tank_flask_type", "price_protection_amount_mo2_tank_ft", "number_of_medical_oxygen_tank_std_type", "remaining_medical_oxygen_tank_std_type", "price_protection_amount_mo2_tank_std", "number_of_medical_oxygen_20lbs_refills", "remaining_medical_oxygen_20lbs_refiils", "price_protection_amount_mo2_ref_20lbs", "number_of_medical_oxygen_105lbs_refills", "remaining_medical_oxygen_105lbs_refills", "price_protection_amount_mo2_ref_105lbs", "number_of_medical_regulator", "remaining_medical_regulator", "price_protection_amount_med_regulator",
// const createTableUsers = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, account_number TEXT, contact_person TEXT, mobile_number TEXT, name TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, pryce_region TEXT, pgc_id_number TEXT, bought_pgc_membership BOOLEAN, prycegas_club_member BOOLEAN, expiration_date TEXT, primary_state_province TEXT, primary_street TEXT, primary_barangay TEXT, primary_city2 TEXT, pryce_region_2 TEXT, secondary_city2 TEXT, secondary_mobile_number TEXT, secondary_state_province TEXT, secondary_street TEXT, pryce_parameter TEXT, number_of_refills INTEGER, remaining_refills INTEGER, price_protection_amount INTEGER, number_of_cylinders INTEGER, remaining_cylinders INTEGER, price_protection_amount_cylinder INTEGER, remaining_cylinders_2p7 INTEGER, price_protection_amount_2p7_cylinders INTEGER, remaining_refills_2p7 INTEGER, price_protection_amount_2p7_refills INTEGER, remaining_refills_22 INTEGER, price_protection_amount_22_refills INTEGER, remaining_cylinders_22 INTEGER, price_protection_amount_22_cylinders INTEGER, number_of_cylinders_50 INTEGER, remaining_50_cylinders INTEGER, price_protection_amount_50_cylinders INTEGER, number_of_refills_50 INTEGER, remaining_50_refills INTEGER, price_protection_amount_50_refills INTEGER, number_of_stoves INTEGER, remaining_stoves INTEGER, price_protection_amount_stove INTEGER, number_of_med_oxygen_tank_flask_type INTEGER, remaining_medical_oxygen_tank_flask_type INTEGER, price_protection_amount_mo2_tank_ft INTEGER, number_of_medical_oxygen_tank_std_type INTEGER, remaining_medical_oxygen_tank_std_type INTEGER, price_protection_amount_mo2_tank_std INTEGER, number_of_medical_oxygen_20lbs_refills INTEGER, remaining_medical_oxygen_20lbs_refiils INTEGER, price_protection_amount_mo2_ref_20lbs INTEGER, number_of_medical_oxygen_105lbs_refills INTEGER, remaining_medical_oxygen_105lbs_refills INTEGER, price_protection_amount_mo2_ref_105lbs INTEGER, number_of_medical_regulator INTEGER, remaining_medical_regulator INTEGER, price_protection_amount_med_regulator INTEGER)',
//       [],
//       () => {
//         console.log('Table created')
//       }
//     )
//   })
// }

function insertRecord(email: string, accessToken: string) {
  const insertQuery = `INSERT INTO pryce (id, email, access_token, selected_user) VALUES (1, ?, ?, ?)`

  db.transaction((tx) => {
    tx.executeSql(insertQuery, [email, accessToken, 0], (_, result) => {
      console.log('Insert successful, new record ID:', result.insertId)
    })
  })
}

//INSERT INTO pryce (email, access_token, selected_user) VALUES (?, ?, ?)
export const insertToPryce = async (data: LoginResponse) => {
  await db.transactionAsync(async (tx) => {
    const updateQuery = `UPDATE pryce SET email = ?, access_token = ?, selected_user = ? WHERE id = 1`

    db.transaction((tx) => {
      tx.executeSql(
        updateQuery,
        [data.email, data.accessToken, 0],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Update successful, rows affected:', rowsAffected)
          } else {
            // Proceed to insert if no rows were updated
            insertRecord(data.email, data.accessToken)
          }
        }
      )
    })
  }, false)
}

//SELECT * FROM pryce
export const getFromPryce = async () => {
  return new Promise<GetUserChecker>(async (resolve, reject) => {
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync('SELECT * FROM pryce', [])
      const data = result.rows[0]

      resolve(data as GetUserChecker)
    }, readOnly)
  })
}
