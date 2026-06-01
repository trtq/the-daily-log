export type TField = { value: string; touched: boolean };

export const field = (value = ""): TField => ({ value, touched: false });

export const validateEmail = (v: string): string | null => {
  if (!v) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(v)) return "Enter a valid email";
  return null;
};

export const validatePassword = (v: string): string | null => {
  if (!v) return "Password is required";
  if (v.length < 6) return "At least 6 characters";
  return null;
};

export const validateConfirm = (v: string, password: string): string | null => {
  if (!v) return "Please confirm your password";
  if (v !== password) return "Passwords do not match";
  return null;
};
