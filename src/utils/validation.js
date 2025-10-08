export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateNumber = (value) => {
  return !isNaN(value) && Number(value) >= 0;
};

export const validateUser = (user) => {
  const errors = {};
  
  if (!validateRequired(user.name)) {
    errors.name = 'Nama harus diisi';
  }
  
  if (!validateRequired(user.email)) {
    errors.email = 'Email harus diisi';
  } else if (!validateEmail(user.email)) {
    errors.email = 'Format email tidak valid';
  }
  
  if (!validateRequired(user.role)) {
    errors.role = 'Role harus dipilih';
  }
  
  if (!validateRequired(user.status)) {
    errors.status = 'Status harus dipilih';
  }
  
  return errors;
};

export const validateProduct = (product) => {
  const errors = {};
  
  if (!validateRequired(product.name)) {
    errors.name = 'Nama produk harus diisi';
  }
  
  if (!validateRequired(product.category)) {
    errors.category = 'Kategori harus diisi';
  }
  
  if (!validateRequired(product.price)) {
    errors.price = 'Harga harus diisi';
  } else if (!validateNumber(product.price)) {
    errors.price = 'Harga harus berupa angka valid';
  }
  
  if (!validateRequired(product.stock)) {
    errors.stock = 'Stok harus diisi';
  } else if (!validateNumber(product.stock)) {
    errors.stock = 'Stok harus berupa angka valid';
  }
  
  return errors;
};