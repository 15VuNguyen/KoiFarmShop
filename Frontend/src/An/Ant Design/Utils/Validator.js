const sizeValidator = (_, value) => {
    if (value === undefined || value === null) {
      return Promise.reject(new Error('Vui lòng nhập kích thước!'));
    }
    if (typeof value !== 'number') {
      return Promise.reject(new Error('Kích thước phải là số!'));
    }
    if (value <= 0) {
      return Promise.reject(new Error('Kích thước phải lớn hơn 0!'));
    }
    if (value > 200) {
      return Promise.reject(new Error('Kích thước phải nhỏ hơn 200!'));
    }
    return Promise.resolve();
  };
  

const priceValidator = (_, value) =>
    value >= 1000  ? Promise.resolve() : Promise.reject(new Error('Giá phải lớn hơn 1000 VND!'));

const quantityValidator = (_, value) =>
    value > 0 ? Promise.resolve() : Promise.reject(new Error('Số lượng phải lớn hơn 0!'));

const discountValidator = (_, value) =>
    value >= 0 && value <= 100 ? Promise.resolve() : Promise.reject(new Error('Giảm giá phải nằm trong khoảng 0 đến 100!'));
export { sizeValidator, priceValidator, quantityValidator, discountValidator };  