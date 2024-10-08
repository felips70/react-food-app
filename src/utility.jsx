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

export const nameRegex = /^[a-z]+$/i;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
