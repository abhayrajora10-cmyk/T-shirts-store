import User from '../models/User.js';

export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const isValidMongoId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};

export const isValidPrice = (price) => {
  return !isNaN(price) && price >= 0;
};

export const isValidDiscount = (discount) => {
  return !isNaN(discount) && discount >= 0 && discount <= 100;
};

export const isValidQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};
