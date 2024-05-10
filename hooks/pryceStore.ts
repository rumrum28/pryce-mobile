// const transaction = async (data: any, t: any) => {
//   try {
//     switch (t) {
//       case 'testGetAllFromPryceTable':
//         const gafpt = await db.getAllAsync('SELECT * FROM pryce')
//         console.log(gafpt)
//         break
//       case 'testGetAllFromUsersTable':
//         const gafut = await db.getAllAsync('SELECT * FROM users')
//         console.log(gafut)
//         break
//       case 'testGetAllFromPryceSettingsTable':
//         const gafpst = await db.getAllAsync('SELECT * FROM pryce_settings')
//         if (gafpst) return gafpst
//         break
//       case 'setPryceSettings':
//         if (data) {
//           await db.execAsync(`
//             CREATE TABLE IF NOT EXISTS pryce_settings (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               type TEXT,
//               value TEXT,
//               status INTEGER
//             );

//           `)

//           const firstRow = await db.getFirstAsync(
//             'SELECT * FROM pryce_settings'
//           )
//           if (!firstRow) {
//             const result = await db.runAsync(
//               'INSERT INTO pryce_settings (type, value, status) VALUES (?, ?, ?)',
//               data.type,
//               data.value,
//               1
//             )
//             console.log(result.lastInsertRowId, result.changes)
//           } else {
//             await db.runAsync(
//               'UPDATE pryce_settings set value=? WHERE type=?',
//               data.value,
//               data.type
//             )
//           }

//           const pryceSettingsResponse = await db.getAllAsync(
//             'SELECT * FROM pryce_settings'
//           )
//           return pryceSettingsResponse
//         }
//         break
//       case 'pryceLogin':
//         if (data && data.accessToken) {
//           console.log(data.email, data.accessToken)

//           let insertToUsers = ''
//           let insertToPryce = `INSERT INTO pryce (email, access_token, selected_user) VALUES ("${data.email}", "${data.accessToken}", 1);`
//           let createTables = `
//             CREATE TABLE IF NOT EXISTS users
//               (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 accountId TEXT NOT NULL,
//                 account_number TEXT NOT NULL,
//                 contact_person TEXT,
//                 mobile_number TEXT NOT NULL,
//                 name TEXT,
//                 first_name TEXT,
//                 middle_name TEXT,
//                 last_name TEXT,
//                 pryce_region TEXT,
//                 pgc_id_number TEXT,
//                 bought_pgc_membership BOOLEAN,
//                 prycegas_club_member BOOLEAN,
//                 expiration_date TEXT,
//                 primary_state_province TEXT,
//                 primary_street TEXT,
//                 primary_barangay TEXT,
//                 primary_city2 TEXT,
//                 pryce_region_2 TEXT,
//                 secondary_city2 TEXT,
//                 secondary_mobile_number TEXT,
//                 secondary_state_province TEXT,
//                 secondary_street TEXT,
//                 pryce_parameter TEXT,
//                 number_of_refills INTEGER,
//                 remaining_refills INTEGER,
//                 price_protection_amount INTEGER,
//                 number_of_cylinders INTEGER,
//                 remaining_cylinders INTEGER,
//                 price_protection_amount_cylinder INTEGER,
//                 remaining_cylinders_2p7 INTEGER,
//                 price_protection_amount_2p7_cylinders INTEGER,
//                 remaining_refills_2p7 INTEGER,
//                 price_protection_amount_2p7_refills INTEGER,
//                 remaining_refills_22 INTEGER,
//                 price_protection_amount_22_refills INTEGER,
//                 remaining_cylinders_22 INTEGER,
//                 price_protection_amount_22_cylinders INTEGER,
//                 number_of_cylinders_50 INTEGER,
//                 remaining_50_cylinders INTEGER,
//                 price_protection_amount_50_cylinders INTEGER,
//                 number_of_refills_50 INTEGER,
//                 remaining_50_refills INTEGER,
//                 price_protection_amount_50_refills INTEGER,
//                 number_of_stoves INTEGER,
//                 remaining_stoves INTEGER,
//                 price_protection_amount_stove INTEGER,
//                 number_of_med_oxygen_tank_flask_type INTEGER,
//                 remaining_medical_oxygen_tank_flask_type INTEGER,
//                 price_protection_amount_mo2_tank_ft INTEGER,
//                 number_of_medical_oxygen_tank_std_type INTEGER,
//                 remaining_medical_oxygen_tank_std_type INTEGER,
//                 price_protection_amount_mo2_tank_std INTEGER,
//                 number_of_medical_oxygen_20lbs_refills INTEGER,
//                 remaining_medical_oxygen_20lbs_refiils INTEGER,
//                 price_protection_amount_mo2_ref_20lbs INTEGER,
//                 number_of_medical_oxygen_105lbs_refills INTEGER,
//                 remaining_medical_oxygen_105lbs_refills INTEGER,
//                 price_protection_amount_mo2_ref_105lbs INTEGER,
//                 number_of_medical_regulator INTEGER,
//                 remaining_medical_regulator INTEGER,
//                 price_protection_amount_med_regulator INTEGER
//               );

//               CREATE TABLE IF NOT EXISTS pryce (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 email TEXT NOT NULL,
//                 access_token TEXT NOT NULL,
//                 selected_user INTEGER NOT NULL
//               );
//           `

//           data.users.records.forEach((dr: ProfileResponseSingle) => {
//             insertToUsers += `INSERT INTO users (
//                 accountId,
//                 account_number,
//                 contact_person,
//                 mobile_number,
//                 name,
//                 first_name,
//                 middle_name,
//                 last_name,
//                 pryce_region,
//                 pgc_id_number,
//                 bought_pgc_membership,
//                 prycegas_club_member,
//                 expiration_date,
//                 primary_state_province,
//                 primary_street,
//                 primary_barangay,
//                 primary_city2,
//                 pryce_region_2,
//                 secondary_city2,
//                 secondary_mobile_number,
//                 secondary_state_province,
//                 secondary_street,
//                 pryce_parameter,
//                 number_of_refills,
//                 remaining_refills,
//                 price_protection_amount,
//                 number_of_cylinders,
//                 remaining_cylinders,
//                 price_protection_amount_cylinder,
//                 remaining_cylinders_2p7,
//                 price_protection_amount_2p7_cylinders,
//                 remaining_refills_2p7,
//                 price_protection_amount_2p7_refills,
//                 remaining_refills_22,
//                 price_protection_amount_22_refills,
//                 remaining_cylinders_22,
//                 price_protection_amount_22_cylinders,
//                 number_of_cylinders_50,
//                 remaining_50_cylinders,
//                 price_protection_amount_50_cylinders,
//                 number_of_refills_50,
//                 remaining_50_refills,
//                 price_protection_amount_50_refills,
//                 number_of_stoves,
//                 remaining_stoves,
//                 price_protection_amount_stove,
//                 number_of_med_oxygen_tank_flask_type,
//                 remaining_medical_oxygen_tank_flask_type,
//                 price_protection_amount_mo2_tank_ft,
//                 number_of_medical_oxygen_tank_std_type,
//                 remaining_medical_oxygen_tank_std_type,
//                 price_protection_amount_mo2_tank_std,
//                 number_of_medical_oxygen_20lbs_refills,
//                 remaining_medical_oxygen_20lbs_refiils,
//                 price_protection_amount_mo2_ref_20lbs,
//                 number_of_medical_oxygen_105lbs_refills,
//                 remaining_medical_oxygen_105lbs_refills,
//                 price_protection_amount_mo2_ref_105lbs,
//                 number_of_medical_regulator,
//                 remaining_medical_regulator,
//                 price_protection_amount_med_regulator
//               ) values (
//                 "${dr?.Id}",
//                 "${dr?.Account_Number__c}",
//                 "${dr?.Contact_Person__pc}",
//                 "${dr?.Mobile_Number__c}",
//                 "${dr?.Name}",
//                 "${dr?.FirstName}",
//                 "${dr?.MiddleName}",
//                 "${dr?.LastName}",
//                 "${dr?.Pryce_Region__c}",
//                 "${dr?.PGC_ID_Number__c}",
//                 "${dr?.Bought_PGC_Membership__c}",
//                 "${dr?.Prycegas_Club_Member__c}",
//                 "${dr?.Expiration_Date__c}",
//                 "${dr?.Primary_State_Province__c}",
//                 "${dr?.Primary_Street__c}",
//                 "${dr?.Primary_Barangay__c}",
//                 "${dr?.Primary_City2__c}",
//                 "${dr?.Pryce_Region_2__c}",
//                 "${dr?.Secondary_City2__c}",
//                 "${dr?.Secondary_Mobile_Number__c}",
//                 "${dr?.Secondary_State_Province__c}",
//                 "${dr?.Secondary_Street__c}",
//                 "${dr?.Pryce_Parameter__c}",
//                 "${dr?.Number_of_Refills__c}",
//                 "${dr?.Remaining_Refills__c}",
//                 "${dr?.Price_Protection_Amount__c}",
//                 "${dr?.Number_of_Cylinders__c}",
//                 "${dr?.Remaining_Cylinders__c}",
//                 "${dr?.Price_Protection_Amount_Cylinder__c}",
//                 "${dr?.Remaining_Cylinders_2p7__c}",
//                 "${dr?.Price_Protection_Amount_2p7_Cylinders__c}",
//                 "${dr?.Remaining_Refills_2p7__c}",
//                 "${dr?.Price_Protection_Amount_2p7_Refills__c}",
//                 "${dr?.Remaining_Refills_22__c}",
//                 "${dr?.Price_Protection_Amount_22_Refills__c}",
//                 "${dr?.Remaining_Cylinders_22__c}",
//                 "${dr?.Price_Protection_Amount_22_Cylinders__c}",
//                 "${dr?.Number_of_Cylinders_50__c}",
//                 "${dr?.Remaining_50_Cylinders__c}",
//                 "${dr?.Price_Protection_Amount_50_Cylinders__c}",
//                 "${dr?.Number_of_Refills_50__c}",
//                 "${dr?.Remaining_50_Refills__c}",
//                 "${dr?.Price_Protection_Amount_50_Refills__c}",
//                 "${dr?.Number_of_Stoves__c}",
//                 "${dr?.Remaining_Stoves__c}",
//                 "${dr?.Price_Protection_Amount_Stove__c}",
//                 "${dr?.Number_of_Med_Oxygen_Tank_Flask_Type__c}",
//                 "${dr?.Remaining_Medical_Oxygen_Tank_Flask_Type__c}",
//                 "${dr?.Price_Protection_Amount_MO2_Tank_FT__c}",
//                 "${dr?.Number_of_Medical_Oxygen_Tank_STD_Type__c}",
//                 "${dr?.Remaining_Medical_Oxygen_Tank_STD_Type__c}",
//                 "${dr?.Price_Protection_Amount_MO2_Tank_STD__c}",
//                 "${dr?.Number_of_Medical_Oxygen_20lbs_Refills__c}",
//                 "${dr?.Remaining_Medical_Oxygen_20lbs_Refiils__c}",
//                 "${dr?.Price_Protection_Amount_MO2_Ref_20lbs__c}",
//                 "${dr?.Number_of_Medical_Oxygen_105lbs_Refills__c}",
//                 "${dr?.Remaining_Medical_Oxygen_105lbs_Refills__c}",
//                 "${dr?.Price_Protection_Amount_MO2_Ref_105lbs__c}",
//                 "${dr?.Number_of_Medical_Regulator__c}",
//                 "${dr?.Remaining_Medical_Regulator__c}",
//                 "${dr?.Price_Protection_Amount_Med_Regulator__c}"
//               );
//             `
//           })

//           await db.execAsync(`
//             ${createTables}
//             DELETE FROM users;
//             DELETE FROM pryce;
//             ${insertToUsers}
//             ${insertToPryce}
//           `)
//         }
//         break
//       default:
//         console.log('Invalid transaction')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// const pryceStore = create<PryceStoreState>((set) => ({
//   users: [],
//   pryceSettings: [],
//   testGetAllFromPryceTable: async () => {
//     const response = await transaction([], 'testGetAllFromPryceTable')
//   },
//   testGetAllFromUsersTable: async () => {
//     const response = await transaction([], 'testGetAllFromUsersTable')
//   },
//   testGetAllFromPryceSettingsTable: async () => {
//     const response = await transaction([], 'testGetAllFromPryceSettingsTable')
//     console.log(response)
//     set(() => ({ pryceSettings: response }))
//   },
//   setPryceSettings: async (type: string, value: string) => {
//     const data = {
//       type,
//       value,
//     }
//     const response = await transaction(data, 'setPryceSettings')
//     set(() => ({ pryceSettings: response }))
//   },
//   pryceLogin: async (data: LoginResponse) => {
//     const response = await transaction(data, 'pryceLogin')
//   },
// }))

import { create } from 'zustand'
import { ProfileResponseSingle } from '~/types/apiresults'

type PryceState = {
  getStarted: boolean
  email: string
  token: string
  selectedUser: number
  users: Array<ProfileResponseSingle>
  setGetStarted: (getStarted: boolean) => void
  setEmail: (email: string) => void
  setToken: (token: string) => void
  setSelectedUser: (selectedUser: number) => void
  setUsers: (userRecords: ProfileResponseSingle[]) => void
}

const usePryceStore = create<PryceState>((set) => ({
  getStarted: true,
  email: '',
  token: '',
  selectedUser: 0,
  users: [],
  setGetStarted: (getStarted: boolean) => set({ getStarted }),
  setEmail: (email: string) => set({ email }),
  setToken: (token: string) => set({ token }),
  setSelectedUser: (selectedUser: number) => set({ selectedUser }),
  setUsers: (userRecords: ProfileResponseSingle[]) => {
    set(() => ({
      users: userRecords,
    }))
  },
}))

export default usePryceStore
