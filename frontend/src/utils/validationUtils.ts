export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};


export const validateInputField = (field: string): boolean => {
  return !(!field || !field.replaceAll(' ', ''));
}


export const validatePassword = (password: string): boolean => {
  if (password.length < 6) {
    return false;
  }
  return true;
}
