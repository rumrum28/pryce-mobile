export type MultipleRecords = {
  attributes: {
    type: string
    url: string
  }
  Id: string
  Name: string
  FirstName: string
  MiddleName: string | null
  LastName: string
  Suffix: string | null
  Account_Number__c: string
  OwnerId: string
  RecordTypeId: string
  Affiliation__c: string | null
  Bought_PGC_Membership__c: boolean
  Contact_Address_Source__pc: string | null
  Contact_Person__pc: string
  Corporate_Partner__c: boolean
  CreatedById: string
  Dealer_Contact_Name__c: string | null
  Description: string | null
  PersonEmail: string | null
  Expiration_Date__c: string | null
  Inactive_Date__c: string | null
  Is_Active__c: boolean
  LastModifiedById: string
  Membership_Date__c: string | null
  PersonMobilePhone: string | null
  Mobile_Number__c: string
  Nearest_Landmark_Primary__c: string | null
  Nearest_Landmark_Secondary__c: string | null
  Number_of_Cylinders__c: Number
  Number_of_Med_Oxygen_Tank_Flask_Type__c: Number
  Number_of_Medical_Oxygen_105lbs_Refills__c: Number
  Number_of_Medical_Oxygen_20lbs_Refills__c: Number
  Number_of_Medical_Oxygen_Tank_STD_Type__c: Number
  Number_of_Medical_Regulator__c: Number
  Number_of_Refills__c: Number
  Number_of_Stoves__c: Number
  Order_Handling__c: string
  Ordering_Channel__c: string
  Outlet_Type__c: string | null
  IsPartner: boolean
  PGC_ID_Date_Delivered__c: string | null
  PGC_ID_Date_Printed__c: string | null
  PGC_ID_Number__c: string | null
  PGC_Status__c: string | null
  Phone: string | null
  Preferred_Dealer__c: string | null
  Price_Protection_Amount_Cylinder__c: Number
  Price_Protection_Amount_Med_Regulator__c: Number
  Price_Protection_Amount_MO2_Ref_105lbs__c: Number
  Price_Protection_Amount_MO2_Ref_20lbs__c: Number
  Price_Protection_Amount_MO2_Tank_FT__c: Number
  Price_Protection_Amount_MO2_Tank_STD__c: Number
  Price_Protection_Amount__c: Number
  Price_Protection_Amount_Stove__c: Number
  Primary_City2__c: string
  Primary_State_Province__c: string
  Primary_Street__c: string
  Pryce_Parameter__c: string
  Pryce_Region__c: string
  Pryce_Region_2__c: string | null
  Prycegas_Club_Member__c: boolean
  Rating: string | null
  Remaining_Cylinders__c: Number
  Remaining_Medical_Oxygen_105lbs_Refills__c: Number
  Remaining_Medical_Oxygen_20lbs_Refiils__c: Number
  Remaining_Medical_Oxygen_Tank_Flask_Type__c: Number
  Remaining_Medical_Oxygen_Tank_STD_Type__c: Number
  Remaining_Medical_Regulator__c: Number
  Remaining_Refills__c: Number
  Remaining_Stoves__c: Number
  Secondary_City2__c: string | null
  Secondary_Mobile_Number__c: string | null
  Secondary_State_Province__c: string | null
  Secondary_Street__c: string | null
  Survey__c: string | null
  Remaining_Refills_2p7__c: Number
  Remaining_Refills_22__c: Number
  Remaining_Cylinders_2p7__c: Number
  Remaining_Cylinders_22__c: Number
  Price_Protection_Amount_2p7_Cylinders__c: Number
  Price_Protection_Amount_2p7_Refills__c: Number
  Price_Protection_Amount_22_Cylinders__c: Number
  Price_Protection_Amount_22_Refills__c: Number
  Primary_Barangay__c: string
  Remaining_50_Cylinders__c: Number
  Price_Protection_Amount_50_Cylinders__c: Number
  Number_of_Cylinders_50__c: Number
  Remaining_50_Refills__c: Number
  Price_Protection_Amount_50_Refills__c: Number
  Number_of_Refills_50__c: Number
}

export type LoginResponse = {
  success: boolean
  message: string
  access_token: string
}

export type UseUser = {
  totalSize: number
  done: boolean
  records: MultipleRecords[]
}

export type Profile = {
  attributes: {
    type: string
    url: string
  }
  Id: string
  Name: string
  FirstName: string | null
  MiddleName: string | null
  LastName: string | null
  Account_Number__c: string
  Mobile_Number__c: string
  Prycegas_Club_Member__c: boolean
  Bought_PGC_Membership__c: boolean
  Primary_Street__c: string
  Primary_Barangay__c: string
  Primary_City2__c: string
  Primary_State_Province__c: string
  Pryce_Region__c: string
  ref?: string
}

export type ProfileProps = Profile[]

export type UserOrderProps = {
  attributes: {
    type: string
    url: string
  }
  Id: string
  Total_Amount_Due__c: number
  Receipt_Number__c: string | null
  Name: string | null
  OrderNumber: string
  CreatedDateTime__c: string
  Payment_Option__c: string
  Paymongo_Reference_ID__c: string | null
  Dealer_Contact_Name__c: string | null
  ChangeFor__c: number
  Total_PGC_Discount__c: number
  Status: string
  Deliver_To_Street__c: string
  Deliver_To_City__c: string
  Deliver_To_Province__c: string
  Contact_Number__c: string
  Total_Items__c: number
}

export type CompositeBody = {
  totalSize: number
  done: boolean
  records: UserOrderProps[]
}

// Define the structure of each composite response
export type CompositeResponse = {
  body: CompositeBody
  httpHeaders: any[] // Assuming this is an array, adjust based on actual API response
  httpStatusCode: number
  referenceId: string
}

// Update the response type to reflect the composite response structure
export type UserOrderResponseProps = {
  compositeResponse: CompositeResponse[]
}
