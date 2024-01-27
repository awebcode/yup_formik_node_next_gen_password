import generatePassword from "generate-password";
import * as Yup from "yup";
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




export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  name: Yup.string().required().min(4).max(8),
  age: Yup.number().required().positive().integer(),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      "Password must contain at least one letter, one digit, and be at least 6 characters long"
    )
    .min(6, "Password must be at least 6 characters")
    .required("Password Is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is Required"),
  rememberMe: Yup.boolean().oneOf([true], "Please accept the terms"),
  category: Yup.string()
    .oneOf(["admin", "user", "sub-admin"], "Invalid category")
    .required("Category is Required"),
});