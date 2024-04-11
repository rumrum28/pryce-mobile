import {
  calculatedPrice,
  discountedPricePGC,
  isDiscountActive,
  remainingRefillsPGC,
} from '~/utils/calculateDiscount'

export default function getPrice(
  productCode: string,
  unitPrice: number,
  isPGCMember: boolean,
  user: any,
  selectedUser: any
) {
  const userLength = user?.records.length

  const lpg11KgProtection = selectedUser.Price_Protection_Amount__c
  const lpg11KgRefill = selectedUser.Remaining_Refills__c
  const lpg11KgCylinderRemaining = selectedUser.Remaining_Cylinders__c // cylinder remaining
  const lpg11KgCylinderPriceProtection =
    selectedUser.Price_Protection_Amount_Cylinder__c // cylinder price protection

  const lpg27KgProtection = selectedUser.Price_Protection_Amount_2p7_Refills__c
  const lpg27KgRefill = selectedUser.Remaining_Refills_2p7__c
  const lpg27KgCylinderRemaining = selectedUser.Remaining_Cylinders_2p7__c // cylinder remaining
  const lpg27KgCylinderPriceProtection =
    selectedUser.Price_Protection_Amount_2p7_Cylinders__c // cylinder price protection

  const lpg22KgProtection = selectedUser.Price_Protection_Amount_22_Refills__c
  const lpg22KgRefill = selectedUser.Remaining_Refills_22__c
  const lpg22KgCylinderRemaining = selectedUser.Remaining_Cylinders_22__c // cylinder remaining
  const lpg22KgCylinderPriceProtection =
    selectedUser.Price_Protection_Amount_22_Cylinders__c // cylinder price protection

  const lpg50KgProtection = selectedUser.Price_Protection_Amount_50_Refills__c
  const lpg50KgRefill = selectedUser.Remaining_50_Refills__c
  const lpg50KgCylinderRemaining = selectedUser.Remaining_50_Cylinders__c // cylinder remaining
  const lpg50KgCylinderPriceProtection =
    selectedUser.Price_Protection_Amount_50_Cylinders__c // cylinder price protection

  const mo220cProtection = selectedUser.Price_Protection_Amount_MO2_Ref_20lbs__c
  const mo220cRefill = selectedUser.Remaining_Medical_Oxygen_20lbs_Refiils__c

  const mo220TftProtection = selectedUser.Price_Protection_Amount_MO2_Tank_FT__c
  const mo220TftRefill =
    selectedUser.Remaining_Medical_Oxygen_Tank_Flask_Type__c

  const mo2105cProtection =
    selectedUser.Price_Protection_Amount_MO2_Ref_105lbs__c
  const mo2105cRefill = selectedUser.Remaining_Medical_Oxygen_105lbs_Refills__c

  const mo220TstProtection =
    selectedUser.Price_Protection_Amount_MO2_Tank_STD__c
  const mo220TstRefill = selectedUser.Remaining_Medical_Oxygen_Tank_STD_Type__c

  const burnerProtection = selectedUser.Price_Protection_Amount_Stove__c
  const burnerRefill = selectedUser.Remaining_Stoves__c

  const medregProtection = selectedUser.Price_Protection_Amount_Med_Regulator__c
  const medregRefill = selectedUser.Remaining_Medical_Regulator__c

  // data?.product_code replace by productCode
  // data?.unit_price replace by unitPrice
  if (productCode === 'LPG11C') {
    const discountPriceProtectionAmount11 = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg11KgProtection,
    })

    const discountRemainingProtectionRefills11 = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg11KgRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionRefills11,
      discountedPrice: discountPriceProtectionAmount11,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionRefills11,
      discountedPrice: discountPriceProtectionAmount11,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionRefills11,
    }

    return calculate
  } else if (productCode === 'LPG2.7C') {
    const discountPriceProtectionAmount2p7 = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg27KgProtection,
    })

    const discountRemainingProtectionRefills2p7 = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg27KgRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionRefills2p7,
      discountedPrice: discountPriceProtectionAmount2p7,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionRefills2p7,
      discountedPrice: discountPriceProtectionAmount2p7,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionRefills2p7,
    }

    return calculate
  } else if (productCode === 'LPG22C') {
    const discountPriceProtectionAmount22 = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg22KgProtection,
    })

    const discountRemainingProtectionRefills22 = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg22KgRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionRefills22,
      discountedPrice: discountPriceProtectionAmount22,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionRefills22,
      discountedPrice: discountPriceProtectionAmount22,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionRefills22,
    }

    return calculate
  } else if (productCode === 'LPG50C') {
    const discountPriceProtectionAmount50 = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg50KgProtection,
    })

    const discountRemainingProtectionRefills50 = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg50KgRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionRefills50,
      discountedPrice: discountPriceProtectionAmount50,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionRefills50,
      discountedPrice: discountPriceProtectionAmount50,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionRefills50,
    }

    return calculate
  } else if (productCode === 'MO220C') {
    const discountPriceProtectionMO2Ref20Lbs = discountedPricePGC({
      userLength,
      priceProtectionAmount: mo220cProtection,
    })

    const discountRemainingProtectionMO2Ref20Lbs = remainingRefillsPGC({
      userLength,
      remainingRefills: mo220cRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionMO2Ref20Lbs,
      discountedPrice: discountPriceProtectionMO2Ref20Lbs,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionMO2Ref20Lbs,
      discountedPrice: discountPriceProtectionMO2Ref20Lbs,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionMO2Ref20Lbs,
    }

    return calculate
  } else if (productCode === 'MO2TFT') {
    const discountPriceProtectionMO2TankFT = discountedPricePGC({
      userLength,
      priceProtectionAmount: mo220TftProtection,
    })

    const discountRemainingProtectionMO2TankFT = remainingRefillsPGC({
      userLength,
      remainingRefills: mo220TftRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionMO2TankFT,
      discountedPrice: discountPriceProtectionMO2TankFT,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionMO2TankFT,
      discountedPrice: discountPriceProtectionMO2TankFT,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionMO2TankFT,
    }

    return calculate
  } else if (productCode === 'MO2105C') {
    const discountPriceProtectionMO2Ref105Lbs = discountedPricePGC({
      userLength,
      priceProtectionAmount: mo2105cProtection,
    })

    const discountRemainingProtectionMO2Ref105Lbs = remainingRefillsPGC({
      userLength,
      remainingRefills: mo2105cRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionMO2Ref105Lbs,
      discountedPrice: discountPriceProtectionMO2Ref105Lbs,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionMO2Ref105Lbs,
      discountedPrice: discountPriceProtectionMO2Ref105Lbs,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionMO2Ref105Lbs,
    }

    return calculate
  } else if (productCode === 'MO2TST') {
    const discountPriceProtectionMO2TankSTD = discountedPricePGC({
      userLength,
      priceProtectionAmount: mo220TstProtection,
    })

    const discountRemainingProtectionMO2TankSTD = remainingRefillsPGC({
      userLength,
      remainingRefills: mo220TstRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionMO2TankSTD,
      discountedPrice: discountPriceProtectionMO2TankSTD,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionMO2TankSTD,
      discountedPrice: discountPriceProtectionMO2TankSTD,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionMO2TankSTD,
    }

    return calculate
  } else if (productCode === 'ACCPGS') {
    const discountPriceProtectionStove = discountedPricePGC({
      userLength,
      priceProtectionAmount: burnerProtection,
    })

    const discountRemainingProtectionStove = remainingRefillsPGC({
      userLength,
      remainingRefills: burnerRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionStove,
      discountedPrice: discountPriceProtectionStove,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionStove,
      discountedPrice: discountPriceProtectionStove,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionStove,
    }

    return calculate
  } else if (productCode === 'MEDREG') {
    const discountPriceProtectionMedReg = discountedPricePGC({
      userLength,
      priceProtectionAmount: medregProtection,
    })

    const discountRemainingProtectionMedReg = remainingRefillsPGC({
      userLength,
      remainingRefills: medregRefill,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: discountRemainingProtectionMedReg,
      discountedPrice: discountPriceProtectionMedReg,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: discountRemainingProtectionMedReg,
      discountedPrice: discountPriceProtectionMedReg,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: discountRemainingProtectionMedReg,
    }

    return calculate
  } else if (productCode === 'PGCM') {
    const calculate = {
      price: unitPrice,
      discount: false,
      remainingRefills: 1,
    }

    return calculate
  } else if (productCode === 'CYL11') {
    const remainingProtection = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg11KgCylinderPriceProtection,
    })

    const remainingCylinders = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg11KgCylinderRemaining,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: remainingCylinders,
    }

    return calculate
  } else if (productCode === 'CYL2.7') {
    const remainingProtection = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg27KgCylinderPriceProtection,
    })

    const remainingCylinders = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg27KgCylinderRemaining,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: remainingCylinders,
    }

    return calculate
  } else if (productCode === 'CYL22') {
    const remainingProtection = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg22KgCylinderPriceProtection,
    })

    const remainingCylinders = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg22KgCylinderRemaining,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: remainingCylinders,
    }

    return calculate
  } else if (productCode === 'CYL50') {
    const remainingProtection = discountedPricePGC({
      userLength,
      priceProtectionAmount: lpg50KgCylinderPriceProtection,
    })

    const remainingCylinders = remainingRefillsPGC({
      userLength,
      remainingRefills: lpg50KgCylinderRemaining,
    })

    const priceReCalculate = calculatedPrice({
      orignalPrice: unitPrice,
      pgc: isPGCMember,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
    })

    const isDiscountActiveVerify = isDiscountActive({
      orignalPrice: unitPrice,
      remainingRefills: remainingCylinders,
      discountedPrice: remainingProtection,
      isPGCMember,
    })

    const calculate = {
      price: priceReCalculate,
      discount: isDiscountActiveVerify,
      remainingRefills: remainingCylinders,
    }

    return calculate
  }
}
