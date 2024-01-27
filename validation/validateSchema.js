import { number, object, string } from "yup";
export const registerSchema = object().shape({
  name: string().required().min(6),
  email: string().required().email(),
  age: number().required(),
  password: string().required().min(8),
});
