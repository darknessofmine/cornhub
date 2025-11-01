export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email);
};
