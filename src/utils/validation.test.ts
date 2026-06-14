import { getEmailError, getPasswordError, getConfirmError } from "./validation";

describe("getEmailError", () => {
  test("valid email returns null", () => {
    expect(getEmailError("user@example.com")).toBeNull();
  });

  test("empty string returns required message", () => {
    expect(getEmailError("")).toBe("Email is required");
  });

  test("missing @ returns invalid message", () => {
    expect(getEmailError("notanemail")).toBe("Enter a valid email");
  });

  test("missing domain extension returns invalid message", () => {
    expect(getEmailError("user@nodot")).toBe("Enter a valid email");
  });
});

describe("getPasswordError", () => {
  test("password with 6+ characters returns null", () => {
    expect(getPasswordError("123456")).toBeNull();
  });

  test("empty string returns required message", () => {
    expect(getPasswordError("")).toBe("Password is required");
  });

  test("exactly 5 characters is too short", () => {
    expect(getPasswordError("12345")).toBe("At least 6 characters");
  });
});

describe("getConfirmError", () => {
  test("matching values return null", () => {
    expect(getConfirmError("babooga", "babooga")).toBeNull();
  });

  test("empty confirm returns required message", () => {
    expect(getConfirmError("", "babooga")).toBe("Please confirm your password");
  });

  test("non-matching values return mismatch message", () => {
    expect(getConfirmError("123456", "babooga")).toBe("Passwords do not match");
  });
});
