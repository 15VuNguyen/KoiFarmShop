export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  //FULL_NAME
  FULL_NAME_IS_REQUIRED: 'FullName is required',
  FULL_NAME_MUST_BE_A_STRING: 'FullName must be a string',
  FULL_NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'FullName length must be from 1 to 100',
  //email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  //password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',
  //user
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  VERIFY_EMAIL_SUCCESS: 'Verify email success',
  USER_BANNED: 'User banned',
  RESEND_EMAIL_VERIFY_SUCCESS: 'Resend email verify success',
  EMAIL_VERIFY_TOKEN_IS_INCORRECT: 'Email verify token is incorrect',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  FORGOT_PASSWORD_TOKEN_IS_INCORRECT: 'Forgot password token is incorrect',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token success',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_ME_SUCCESS: 'Get me success',
  USER_IS_NOT_VERIFIED: 'User is not verified',
  IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string',
  IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400: 'Image url length must be from 1 to 400',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 200',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200',
  WEBSITE_MUST_BE_A_VALID_URL: 'Website must be a valid URL',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50',
  UPDATE_ME_SUCCESS: 'Update me success',
  GET_PROFILE_SUCCESS: 'Get profile success',
  INVALID_FOLLOWED_USER_ID: 'Invalid followed user id',
  FOLLOWED_USER_NOT_FOUND: 'Followed user not found',
  FOLLOWED: 'Followed',
  FOLLOW_SUCCESS: 'Follow success',
  INVALID_USER_ID: 'Invalid user id',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  UPLOAD_SUCCESS: 'Upload success',
  ACCESS_DENIED_ADMIN_ONLY: 'Access denied, admin only',
  //address
  ADDRESS_IS_REQUIRED: 'Address is required',
  ADDRESS_MUST_BE_A_STRING: 'Address must be a string',
  ADDRESS_LENGTH_MUST_BE_FROM_1_TO_200: 'Address length must be from 1 to 200',
  //phone number
  PHONE_NUMBER_IS_REQUIRED: 'Phone number is required',
  PHONE_NUMBER_LENGTH_MUST_BE_FROM_10_TO_20: 'Phone number length must be from 10 to 20',
  PHONE_NUMBER_MUST_BE_NUMERIC: 'Phone number must be numeric',
  //position care
  POSITION_CARE_IS_REQUIRED: 'Position care is required',
  //method
  METHOD_IS_REQUIRED: 'Method is required',
  //categoryid
  CATEGORY_ID_IS_REQUIRED: 'Category id is required',
  //koi name
  KOI_NAME_IS_REQUIRED: 'Koi name is required',
  KOI_NAME_MUST_BE_A_STRING: 'Koi name must be a string',
  KOI_NAME_LENGTH_MUST_BE_FROM_1_TO_200: 'Koi name length must be from 1 to 200',
  //koi age
  KOI_AGE_IS_REQUIRED: 'Koi age is required',
  KOI_AGE_MUST_BE_NUMERIC: 'Koi age must be numeric',
  //koi origin
  KOI_ORIGIN_IS_REQUIRED: 'Koi origin is required',
  KOI_ORIGIN_MUST_BE_A_STRING: 'Koi origin must be a string',
  KOI_ORIGIN_LENGTH_MUST_BE_FROM_1_TO_200: 'Koi origin length must be from 1 to 200',
  //koi gender
  KOI_GENDER_IS_REQUIRED: 'Koi gender is required',
  //koi size
  KOI_SIZE_IS_REQUIRED: 'Koi size is required',
  //koi breed
  KOI_BREED_IS_REQUIRED: 'Koi breed is required',
  //koi dailFoodAmount
  KOI_DAILY_FOOD_AMOUNT_IS_REQUIRED: 'Koi daily food amount is required',
  //koi filtering ratio
  KOI_FILTERING_RATIO_IS_REQUIRED: 'Koi filtering ratio is required',
  //koi image
  KOI_IMAGE_IS_REQUIRED: 'Koi image is required',
  //koi video
  KOI_VIDEO_IS_REQUIRED: 'Koi video is required',
  //koi quantity
  GET_AVAILABLE_KOI_QUANTITY: 'Get available koi quantity success',
  //koi price
  GET_MIN_MAX_PRICE: 'Get min max price of koi success',
  //koi not found
  KOI_NOT_FOUND: 'Koi not found',
  GET_KOI_SUCCESS: 'Get koi success',
  OUT_OF_STOCK: 'Out of stock',
  //order
  GET_ORDER_SUCCESS: 'Get order success',
  UPDATE_ORDER_SUCCESS: 'Update order success',
  MAKE_ORDER_SUCCESS: 'Make order success',
  BUY_ORDER_SUCCESS: 'Buy success',
  CREATE_ORDER_SUCCESS: 'Create order success',
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_DETAIL_NOT_FOUND: 'Order detail not found',
  NO_ITEMS: 'No items in order',
  REMOVE_ITEM_SUCCESS: 'Remove item from order detail success',
  //save
  SAVE_TO_DB_SUCCESS: 'Save order to database success',
  //loyalty card
  GET_CARD_SUCCESS: 'Get loyalty card success',
  //phone number validate
  SENT_OTP_SUCCESSFULLY: 'Sent otp code successfully',
  //check authorization
  CHECK_AUTHORIZATION_SUCCESS: 'Check authorization success',
  //get all consign
  GET_ALL_CONSIGNS_SUCCESS: 'Get all consigns success',
  //category
  CATEGORY_NOT_FOUND: 'Category not found',
  //supplier
  SUPPLIER_NOT_FOUND: 'Supplier not found',
  GET_CONSIGNS_SUCCESS: 'Get consigns success',
  CONSIGN_NOT_FOUND: 'Consign not found',
  KOI_NOT_FOUND: 'Koi not found',
  USER_NOT_FOUND: 'User not found',
  //validate update consign
  POSITION_CARE_IS_REQUIRED: 'Position care is required',
  METHOD_IS_REQUIRED: 'Method is required',
  DETAIL_IS_REQUIRED: 'Detail is required',
  CATEGORY_ID_IS_REQUIRED: 'Category id is required',
  KOI_NAME_IS_REQUIRED: 'Koi name is required',
  KOI_AGE_IS_REQUIRED: 'Koi age is required',
  KOI_AGE_MUST_BE_NUMERIC: 'Koi age must be numeric',
  KOI_AGE_MUST_BE_BETWEEN_1_AND_50: 'Koi age must be between 1 and 50',
  KOI_ORIGIN_IS_REQUIRED: 'Koi origin is required',
  KOI_GENDER_IS_REQUIRED: 'Koi gender is required',
  KOI_SIZE_IS_REQUIRED: 'Koi size is required',
  KOI_SIZE_MUST_BE_NUMERIC: 'Koi size must be numeric',
  KOI_SIZE_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_200:
    'Koi size must be larger than 0 and smaller or equal to 200',
  KOI_BREED_IS_REQUIRED: 'Koi breed is required',
  KOI_DESCRIPTION_IS_REQUIRED: 'Koi description is required',
  KOI_DAILY_FOOD_AMOUNT_IS_REQUIRED: 'Koi daily food amount is required',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_NUMERIC: 'Koi daily food amount must be numeric',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_100:
    'Koi daily food amount must be larger than 0 and smaller or equal to 100',
  KOI_FILTERING_RATIO_IS_REQUIRED: 'Koi filtering ratio is required',
  KOI_FILTERING_RATIO_MUST_BE_NUMERIC: 'Koi filtering ratio must be numeric',
  KOI_FILTERING_RATIO_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_100:
    'Koi filtering ratio must be larger than 0 and smaller or equal to 100',
  KOI_CERTIFICATE_ID_IS_REQUIRED: 'Koi certificate id is required',
  KOI_IMAGE_IS_REQUIRED: 'Koi image is required',
  KOI_VIDEO_IS_REQUIRED: 'Koi video is required',
  //update consign
  UPDATE_CONSIGN_SUCCESS: 'Update consign success',
  ADDRESS_CONSIGN_KOI_IS_REQUIRED: 'Address consign koi is required',
  ADDRESS_CONSIGN_KOI_MUST_BE_A_STRING: 'Address consign koi must be a string',
  PHONE_NUMBER_CONSIGN_KOI_IS_REQUIRED: 'Phone number consign koi is required',
  PHONE_NUMBER_CONSIGN_KOI_LENGTH_MUST_BE_FROM_10_TO_20: 'Phone number consign koi length must be from 10 to 20',
  KOI_AGE_MUST_BE_BETWEEN_1_AND_50: 'Tuổi của cá Koi phải nằm trong khoảng từ 1 đến 50',
  KOI_SIZE_MUST_BE_NUMERIC: 'Kích thước của cá Koi phải là số',
  KOI_SIZE_MUST_BE_BETWEEN_5_AND_200: 'Kích thước của cá Koi phải nằm trong khoảng từ 5 đến 200',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_NUMERIC: 'Lượng thức ăn hàng ngày của cá Koi phải là số',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_BETWEEN_1_AND_100:
    'Lượng thức ăn hàng ngày của cá Koi phải nằm trong khoảng từ 1 đến 100',
  KOI_FILTERING_RATIO_MUST_BE_NUMERIC: 'Tỷ lệ lọc của cá Koi phải là số',
  KOI_FILTERING_RATIO_MUST_BE_BETWEEN_1_AND_100: 'Tỷ lệ lọc của cá Koi phải nằm trong khoảng từ 1 đến 100',
  CANCEL_CONSIGN_SUCCESS: 'Cancel consign success'
}
export const ADMINS_MESSAGES = {
  ADD_KOI_SUCCESS: 'Add Fish success',
  ADD_KOI_FAIL: 'Add Fish Fail',
  UPDATE_KOI_SUCCESS: 'Update Fish success'
}
