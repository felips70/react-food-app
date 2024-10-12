export const validateFieldFormat = (field, fieldRegex, setContentError) => {
  if (!fieldRegex.test(field)) {
    setContentError(true);
    return false;
  } else {
    setContentError(false);
    return true;
  }
};

export const validateFieldLength = (field, setEmptyError) => {
  if (field.length === 0) {
    setEmptyError(true);
    return false;
  } else {
    setEmptyError(false);
    return true;
  }
};

export const validateField = (
  field,
  setEmptyError,
  setContentError,
  fieldRegex
) => {
  if (field.length === 0) {
    setEmptyError(true);
    return false;
  } else {
    setEmptyError(false);
    if (!fieldRegex.test(field)) {
      setContentError(true);
      return false;
    } else {
      setContentError(false);
      return true;
    }
  }
};

export function emptyFields() {
  [...arguments].forEach((setState) => setState(""));
}

export const getIndexOfEmailInLocalStorage = (users, email) =>
  users.map((user) => user.email).indexOf(email);

export const getEnrichedCart = (dishes, userCart) => {
  if (!userCart) return [];
  const cartProductKeys = Object.keys(userCart);

  return dishes
    .filter(({ _id }) => cartProductKeys.includes(_id.$oid))
    .map((product) => ({ ...product, quantity: userCart[product._id.$oid] }));
};

export const displayDissapearingMessage = (setState, dissapearTime = 2500) => {
  setState(true);
  setTimeout(() => setState(false), dissapearTime);
};

export const getTotalProductQuantity = (userCart) => {
  if (!userCart) return 0;
  if (Object.keys(userCart).length === 0) return 0;
  return Object.values(userCart).reduce((a, b) => a + b, 0);
};

export const nameRegex = /^[a-z]+$/i;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
