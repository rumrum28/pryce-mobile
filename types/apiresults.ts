export type UserInputs = {
  phone_number: string
  value: string
  type: 'otp' | 'password'
}

type ProfileAtributes = {
  type: string
  url: string
}

export type ProfileResponseSingle = {
  attributes: ProfileAtributes
  Id: string
  Name: string
  FirstName: string
  MiddleName: string | null
  LastName: string
  Account_Number__c: string
  Bought_PGC_Membership__c: boolean
  Contact_Person__pc: string
  Expiration_Date__c: string | null
  Mobile_Number__c: string
  Number_of_Cylinders__c: number
  Number_of_Med_Oxygen_Tank_Flask_Type__c: number
  Number_of_Medical_Oxygen_105lbs_Refills__c: number
  Number_of_Medical_Oxygen_20lbs_Refills__c: number
  Number_of_Medical_Oxygen_Tank_STD_Type__c: number
  Number_of_Medical_Regulator__c: number
  Number_of_Refills__c: number
  Number_of_Stoves__c: number
  PGC_ID_Number__c: string | null
  Price_Protection_Amount_Cylinder__c: number
  Price_Protection_Amount_Med_Regulator__c: number
  Price_Protection_Amount_MO2_Ref_105lbs__c: number
  Price_Protection_Amount_MO2_Ref_20lbs__c: number
  Price_Protection_Amount_MO2_Tank_FT__c: number
  Price_Protection_Amount_MO2_Tank_STD__c: number
  Price_Protection_Amount__c: number
  Price_Protection_Amount_Stove__c: number
  Primary_City2__c: string
  Primary_State_Province__c: string
  Primary_Street__c: string
  Pryce_Parameter__c: string
  Pryce_Region__c: string
  Pryce_Region_2__c: string | null
  Prycegas_Club_Member__c: boolean
  Remaining_Cylinders__c: number
  Remaining_Medical_Oxygen_105lbs_Refills__c: number
  Remaining_Medical_Oxygen_20lbs_Refiils__c: number
  Remaining_Medical_Oxygen_Tank_Flask_Type__c: number
  Remaining_Medical_Oxygen_Tank_STD_Type__c: number
  Remaining_Medical_Regulator__c: number
  Remaining_Refills__c: number
  Remaining_Stoves__c: number
  Secondary_City2__c: string | null
  Secondary_Mobile_Number__c: string | null
  Secondary_State_Province__c: string | null
  Secondary_Street__c: string | null
  Remaining_Refills_2p7__c: number
  Remaining_Refills_22__c: number
  Remaining_Cylinders_2p7__c: number
  Remaining_Cylinders_22__c: number
  Price_Protection_Amount_2p7_Cylinders__c: number
  Price_Protection_Amount_2p7_Refills__c: number
  Price_Protection_Amount_22_Cylinders__c: number
  Price_Protection_Amount_22_Refills__c: number
  Primary_Barangay__c: string
  Remaining_50_Cylinders__c: number
  Price_Protection_Amount_50_Cylinders__c: number
  Number_of_Cylinders_50__c: number
  Remaining_50_Refills__c: number
  Price_Protection_Amount_50_Refills__c: number
  Number_of_Refills_50__c: number
}

export type ProfileResponse = ProfileResponseSingle[]

export type UsersArray = {
  totalSize: number
  done: boolean
  records: ProfileResponseSingle[]
}

export type LoginResponse = {
  success: boolean
  message: string
  email: string
  accessToken: string
  password: boolean
  users: UsersArray
}

export type GetUserChecker = {
  access_token: string
  email: string
  id: number
  selected_user: number
}
