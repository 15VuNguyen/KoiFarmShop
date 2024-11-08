import { parsePhoneNumberFromString } from "libphonenumber-js";
import crypto from "crypto"
import databaseService from "../services/database.service.js";

const otpCache = new Map();

// export function setOTP(phoneNumber, code) {
//   otpCache.set(phoneNumber, { code, expiresAt: Date.now() + 5 * 60 * 1000 });
// }

// export function getOTP(phoneNumber) {
//   return otpCache.get(phoneNumber);
// }

// export function deleteOTP(phoneNumber) {
//   otpCache.delete(phoneNumber);
// }

const validatePhoneNumber = (phoneNumber) => {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'VN'); // Sử dụng mã quốc gia VN
  if (parsedNumber && parsedNumber.isValid()) {
    return parsedNumber.number;  // Trả về số điện thoại chuẩn quốc tế
  } else {
    return {message: "Invalid Phone Number"};
  }
};

export async function sendOTPCode(user, payload) {
  if(!payload.PhoneNumber){
    return {message: "Phone number is required!"}
  }
  const validatedPhoneNumber = validatePhoneNumber(payload.PhoneNumber)
  if(validatedPhoneNumber.message){
    return {message: validatedPhoneNumber.message}
  }
  const existedAccount = await databaseService.loyaltyCard.findOne({ UserID: user._id })
  const existedPhoneNumber = await databaseService.users.findOne({
    phone_number: payload.PhoneNumber,
    _id: { $ne: user._id }
  });
  
  console.log("existedAccount: ", existedAccount)
  if (existedAccount) {
    return { message: "The user has a loyalty card already!" }
  }
  if (existedPhoneNumber) {
    return { message: "An account already exists for this phone number!" }
  }
  let userPhoneNumber = user.phone_number
  if (userPhoneNumber && validatedPhoneNumber != userPhoneNumber) {
    return { message: "Please use the phone number associated with this account!" }
  }
  userPhoneNumber = validatedPhoneNumber
  await databaseService.users.updateOne({ _id: user._id }, { $set: { phone_number: userPhoneNumber } })
  const code = crypto.randomInt(100000, 999999).toString()

  otpCache.set(validatedPhoneNumber, { code: code, expiresAt: Date.now() + 5 * 60 * 1000 });

  return {
    validatedPhoneNumber,
    code,
    expiredTime: Date.now() + 5 * 60 * 1000
  }
}

// Hàm kiểm tra mã OTP
export function verifyOTPCode(phoneNumber, userCode) {
  const otpEntry = otpCache.get(phoneNumber);
  if (!otpEntry) {
    return { valid: false, message: "Mã OTP không tồn tại hoặc đã hết hạn" };
  }

  if (Date.now() > otpEntry.expiresAt) {
    otpCache.delete(phoneNumber);
    return { valid: false, message: "Mã OTP đã hết hạn" };
  }

  if (otpEntry.code === userCode) {
    otpCache.delete(phoneNumber); // Xóa mã sau khi xác thực thành công
    return { valid: true, message: "Mã OTP hợp lệ" };
  } else {
    return { valid: false, message: "Mã OTP không đúng" };
  }
}
