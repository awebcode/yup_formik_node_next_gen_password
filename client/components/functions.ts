import generatePassword from "generate-password";

export const generateStrongPassword = () => {
  const password = generatePassword.generate({
    length: 16,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    exclude: "asik",
    excludeSimilarCharacters: true,
    strict: true,
  });

  return password;
};
