export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Lỗi xác thực',
  //FULL_NAME
  FULL_NAME_IS_REQUIRED: 'Tên đầy đủ là bắt buộc',
  FULL_NAME_MUST_BE_A_STRING: 'Tên đầy đủ phải là chuỗi',
  FULL_NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Độ dài tên đầy đủ phải từ 1 đến 100 ký tự',
  //email
  EMAIL_ALREADY_EXISTS: 'Email đã tồn tại',
  EMAIL_IS_REQUIRED: 'Email là bắt buộc',
  EMAIL_IS_INVALID: 'Email không hợp lệ',
  //password
  PASSWORD_IS_REQUIRED: 'Mật khẩu là bắt buộc',
  PASSWORD_MUST_BE_A_STRING: 'Mật khẩu phải là chuỗi',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Độ dài mật khẩu phải từ 8 đến 50 ký tự',
  PASSWORD_MUST_BE_STRONG:
    'Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 số và 1 ký tự đặc biệt',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Xác nhận mật khẩu là bắt buộc',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Xác nhận mật khẩu phải là chuỗi',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Độ dài xác nhận mật khẩu phải từ 8 đến 50 ký tự',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Xác nhận mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 số và 1 ký tự đặc biệt',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Xác nhận mật khẩu phải giống với mật khẩu',
  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Ngày sinh phải theo định dạng ISO8601',
  //user
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email hoặc mật khẩu không đúng',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token là bắt buộc',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token là bắt buộc',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token không hợp lệ',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Refresh token đã được sử dụng hoặc không tồn tại',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token là bắt buộc',
  USER_NOT_FOUND: 'Không tìm thấy người dùng',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email đã được xác minh trước đó',
  VERIFY_EMAIL_SUCCESS: 'Xác minh email thành công',
  USER_BANNED: 'Người dùng bị cấm',
  RESEND_EMAIL_VERIFY_SUCCESS: 'Gửi lại email xác minh thành công',
  EMAIL_VERIFY_TOKEN_IS_INCORRECT: 'Email verify token không đúng',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Kiểm tra email để đặt lại mật khẩu',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token là bắt buộc',
  FORGOT_PASSWORD_TOKEN_IS_INCORRECT: 'Forgot password token không đúng',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Xác minh forgot password token thành công',
  RESET_PASSWORD_SUCCESS: 'Đặt lại mật khẩu thành công',
  GET_ME_SUCCESS: 'Lấy thông tin cá nhân thành công',
  USER_IS_NOT_VERIFIED: 'Người dùng chưa được xác minh',
  IMAGE_URL_MUST_BE_A_STRING: 'URL hình ảnh phải là chuỗi',
  IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400: 'Độ dài URL hình ảnh phải từ 1 đến 400 ký tự',
  BIO_MUST_BE_A_STRING: 'Tiểu sử phải là chuỗi',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Độ dài tiểu sử phải ít hơn 200 ký tự',
  LOCATION_MUST_BE_A_STRING: 'Địa điểm phải là chuỗi',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Độ dài địa điểm phải ít hơn 200 ký tự',
  WEBSITE_MUST_BE_A_STRING: 'Website phải là chuỗi',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Độ dài website phải ít hơn 200 ký tự',
  WEBSITE_MUST_BE_A_VALID_URL: 'Website phải là URL hợp lệ',
  USERNAME_MUST_BE_A_STRING: 'Tên người dùng phải là chuỗi',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Độ dài tên người dùng phải ít hơn 50 ký tự',
  UPDATE_ME_SUCCESS: 'Cập nhật thông tin cá nhân thành công',
  GET_PROFILE_SUCCESS: 'Lấy thông tin hồ sơ thành công',
  INVALID_FOLLOWED_USER_ID: 'ID người dùng theo dõi không hợp lệ',
  FOLLOWED_USER_NOT_FOUND: 'Không tìm thấy người dùng theo dõi',
  FOLLOWED: 'Đã theo dõi',
  FOLLOW_SUCCESS: 'Theo dõi thành công',
  INVALID_USER_ID: 'ID người dùng không hợp lệ',
  ALREADY_UNFOLLOWED: 'Đã bỏ theo dõi',
  UNFOLLOW_SUCCESS: 'Bỏ theo dõi thành công',
  USERNAME_ALREADY_EXISTS: 'Tên người dùng đã tồn tại',
  OLD_PASSWORD_NOT_MATCH: 'Mật khẩu cũ không khớp',
  CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
  REFRESH_TOKEN_SUCCESS: 'Làm mới token thành công',
  EMAIL_NOT_VERIFIED: 'Email chưa được xác minh',
  UPLOAD_SUCCESS: 'Tải lên thành công',
  ACCESS_DENIED_ADMIN_ONLY: 'Truy cập bị từ chối, chỉ dành cho quản trị viên',
  //address
  ADDRESS_IS_REQUIRED: 'Địa chỉ là bắt buộc',
  ADDRESS_MUST_BE_A_STRING: 'Địa chỉ phải là chuỗi',
  ADDRESS_LENGTH_MUST_BE_FROM_1_TO_200: 'Độ dài địa chỉ phải từ 1 đến 200 ký tự',
  //phone number
  PHONE_NUMBER_IS_REQUIRED: 'Số điện thoại là bắt buộc',
  PHONE_NUMBER_LENGTH_MUST_BE_FROM_10_TO_20: 'Độ dài số điện thoại phải từ 10 đến 20 ký tự',
  PHONE_NUMBER_MUST_BE_NUMERIC: 'Số điện thoại phải là số',
  //position care
  POSITION_CARE_IS_REQUIRED: 'Vị trí chăm sóc là bắt buộc',
  //method
  METHOD_IS_REQUIRED: 'Phương pháp là bắt buộc',
  //categoryid
  CATEGORY_ID_IS_REQUIRED: 'ID danh mục là bắt buộc',
  //koi name
  KOI_NAME_IS_REQUIRED: 'Tên cá Koi là bắt buộc',
  KOI_NAME_MUST_BE_A_STRING: 'Tên cá Koi phải là chuỗi',
  KOI_NAME_LENGTH_MUST_BE_FROM_1_TO_200: 'Độ dài tên cá Koi phải từ 1 đến 200 ký tự',
  //koi age
  KOI_AGE_IS_REQUIRED: 'Tuổi cá Koi là bắt buộc',
  KOI_AGE_MUST_BE_NUMERIC: 'Tuổi cá Koi phải là số',
  //koi origin
  KOI_ORIGIN_IS_REQUIRED: 'Nguồn gốc cá Koi là bắt buộc',
  KOI_ORIGIN_MUST_BE_A_STRING: 'Nguồn gốc cá Koi phải là chuỗi',
  KOI_ORIGIN_LENGTH_MUST_BE_FROM_1_TO_200: 'Độ dài nguồn gốc cá Koi phải từ 1 đến 200 ký tự',
  //koi gender
  KOI_GENDER_IS_REQUIRED: 'Giới tính cá Koi là bắt buộc',
  //koi size
  KOI_SIZE_IS_REQUIRED: 'Kích thước cá Koi là bắt buộc',
  //koi breed
  KOI_BREED_IS_REQUIRED: 'Giống cá Koi là bắt buộc',
  //koi dailFoodAmount
  KOI_DAILY_FOOD_AMOUNT_IS_REQUIRED: 'Lượng thức ăn hàng ngày của cá Koi là bắt buộc',
  //koi filtering ratio
  KOI_FILTERING_RATIO_IS_REQUIRED: 'Tỷ lệ lọc của cá Koi là bắt buộc',
  //koi image
  KOI_IMAGE_IS_REQUIRED: 'Hình ảnh cá Koi là bắt buộc',
  //koi video
  KOI_VIDEO_IS_REQUIRED: 'Video cá Koi là bắt buộc',
  //koi quantity
  GET_AVAILABLE_KOI_QUANTITY: 'Lấy số lượng cá Koi có sẵn thành công',
  //koi price
  GET_MIN_MAX_PRICE: 'Lấy giá tối thiểu và tối đa của cá Koi thành công',
  //koi not found
  KOI_NOT_FOUND: 'Không tìm thấy cá Koi',
  GET_KOI_SUCCESS: 'Lấy cá Koi thành công',
  OUT_OF_STOCK: 'Hết hàng',
  //order
  GET_ORDER_SUCCESS: 'Lấy đơn hàng thành công',
  UPDATE_ORDER_SUCCESS: 'Cập nhật đơn hàng thành công',
  MAKE_ORDER_SUCCESS: 'Tạo đơn hàng thành công',
  BUY_ORDER_SUCCESS: 'Mua thành công',
  CREATE_ORDER_SUCCESS: 'Tạo đơn hàng thành công',
  ORDER_NOT_FOUND: 'Không tìm thấy đơn hàng',
  ORDER_DETAIL_NOT_FOUND: 'Không tìm thấy chi tiết đơn hàng',
  NO_ITEMS: 'Không có mặt hàng nào trong đơn hàng',
  REMOVE_ITEM_SUCCESS: 'Xóa mặt hàng khỏi chi tiết đơn hàng thành công',
  //save
  SAVE_TO_DB_SUCCESS: 'Lưu đơn hàng vào cơ sở dữ liệu thành công',
  //loyalty card
  GET_CARD_SUCCESS: 'Lấy thẻ thành viên thành công',
  //phone number validate
  SENT_OTP_SUCCESSFULLY: 'Gửi mã OTP thành công',
  //check authorization
  CHECK_AUTHORIZATION_SUCCESS: 'Kiểm tra quyền truy cập thành công',
  //get all consign
  GET_ALL_CONSIGNS_SUCCESS: 'Lấy tất cả đơn ký gửi thành công',
  //category
  CATEGORY_NOT_FOUND: 'Không tìm thấy danh mục',
  //supplier
  SUPPLIER_NOT_FOUND: 'Không tìm thấy nhà cung cấp',
  GET_CONSIGNS_SUCCESS: 'Lấy đơn ký gửi thành công',
  CONSIGN_NOT_FOUND: 'Không tìm thấy đơn ký gửi',
  KOI_NOT_FOUND: 'Không tìm thấy cá Koi',
  USER_NOT_FOUND: 'Không tìm thấy người dùng',
  //validate update consign
  POSITION_CARE_IS_REQUIRED: 'Vị trí chăm sóc là bắt buộc',
  METHOD_IS_REQUIRED: 'Phương pháp là bắt buộc',
  DETAIL_IS_REQUIRED: 'Chi tiết là bắt buộc',
  CATEGORY_ID_IS_REQUIRED: 'ID danh mục là bắt buộc',
  KOI_NAME_IS_REQUIRED: 'Tên cá Koi là bắt buộc',
  KOI_AGE_IS_REQUIRED: 'Tuổi cá Koi là bắt buộc',
  KOI_AGE_MUST_BE_NUMERIC: 'Tuổi cá Koi phải là số',
  KOI_AGE_MUST_BE_BETWEEN_1_AND_50: 'Tuổi cá Koi phải nằm trong khoảng từ 1 đến 50',
  KOI_ORIGIN_IS_REQUIRED: 'Nguồn gốc cá Koi là bắt buộc',
  KOI_GENDER_IS_REQUIRED: 'Giới tính cá Koi là bắt buộc',
  KOI_SIZE_IS_REQUIRED: 'Kích thước cá Koi là bắt buộc',
  KOI_SIZE_MUST_BE_NUMERIC: 'Kích thước cá Koi phải là số',
  KOI_SIZE_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_200:
    'Kích thước cá Koi phải lớn hơn 0 và nhỏ hơn hoặc bằng 200',
  KOI_BREED_IS_REQUIRED: 'Giống cá Koi là bắt buộc',
  KOI_DESCRIPTION_IS_REQUIRED: 'Mô tả cá Koi là bắt buộc',
  KOI_DAILY_FOOD_AMOUNT_IS_REQUIRED: 'Lượng thức ăn hàng ngày của cá Koi là bắt buộc',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_NUMERIC: 'Lượng thức ăn hàng ngày của cá Koi phải là số',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_100:
    'Lượng thức ăn hàng ngày của cá Koi phải lớn hơn 0 và nhỏ hơn hoặc bằng 100',
  KOI_FILTERING_RATIO_IS_REQUIRED: 'Tỷ lệ lọc của cá Koi là bắt buộc',
  KOI_FILTERING_RATIO_MUST_BE_NUMERIC: 'Tỷ lệ lọc của cá Koi phải là số',
  KOI_FILTERING_RATIO_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_100:
    'Tỷ lệ lọc của cá Koi phải lớn hơn 0 và nhỏ hơn hoặc bằng 100',
  KOI_CERTIFICATE_ID_IS_REQUIRED: 'ID chứng nhận cá Koi là bắt buộc',
  KOI_IMAGE_IS_REQUIRED: 'Hình ảnh cá Koi là bắt buộc',
  KOI_VIDEO_IS_REQUIRED: 'Video cá Koi là bắt buộc',
  //update consign
  UPDATE_CONSIGN_SUCCESS: 'Cập nhật đơn ký gửi thành công',
  ADDRESS_CONSIGN_KOI_IS_REQUIRED: 'Địa chỉ ký gửi cá Koi là bắt buộc',
  ADDRESS_CONSIGN_KOI_MUST_BE_A_STRING: 'Địa chỉ ký gửi cá Koi phải là chuỗi',
  PHONE_NUMBER_CONSIGN_KOI_IS_REQUIRED: 'Số điện thoại ký gửi cá Koi là bắt buộc',
  PHONE_NUMBER_CONSIGN_KOI_LENGTH_MUST_BE_FROM_10_TO_20: 'Độ dài số điện thoại ký gửi cá Koi phải từ 10 đến 20 ký tự',
  KOI_AGE_MUST_BE_BETWEEN_1_AND_50: 'Tuổi của cá Koi phải nằm trong khoảng từ 1 đến 50',
  KOI_SIZE_MUST_BE_NUMERIC: 'Kích thước của cá Koi phải là số',
  KOI_SIZE_MUST_BE_BETWEEN_5_AND_200: 'Kích thước của cá Koi phải nằm trong khoảng từ 5 đến 200',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_NUMERIC: 'Lượng thức ăn hàng ngày của cá Koi phải là số',
  KOI_DAILY_FOOD_AMOUNT_MUST_BE_BETWEEN_1_AND_100:
    'Lượng thức ăn hàng ngày của cá Koi phải nằm trong khoảng từ 1 đến 100',
  KOI_FILTERING_RATIO_MUST_BE_NUMERIC: 'Tỷ lệ lọc của cá Koi phải là số',
  KOI_FILTERING_RATIO_MUST_BE_BETWEEN_1_AND_100: 'Tỷ lệ lọc của cá Koi phải nằm trong khoảng từ 1 đến 100',
  CANCEL_CONSIGN_SUCCESS: 'Hủy đơn ký gửi thành công',
  KOI_AGE_MUST_BE_BETWEEN_1900_AND_CURRENTYEAR: 'Tuổi của cá Koi phải nằm trong khoảng từ 1 đến năm hiện tại'
}

export const ADMINS_MESSAGES = {
  ADD_KOI_SUCCESS: 'Thêm cá thành công',
  ADD_KOI_FAIL: 'Thêm cá thất bại',
  UPDATE_KOI_SUCCESS: 'Cập nhật cá thành công'
}
