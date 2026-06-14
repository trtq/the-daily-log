export const getEmailError = (email: string): string | null => {
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
  return null;
};

export const getPasswordError = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "At least 6 characters";
  return null;
};

export const getConfirmError = (
  confirmationPassword: string,
  password: string,
): string | null => {
  if (!confirmationPassword) return "Please confirm your password";
  if (confirmationPassword !== password) return "Passwords do not match";
  return null;
};
