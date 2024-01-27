"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { generateStrongPassword } from "./functions";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const validationSchema = Yup.object().shape({
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

type UserTypes = {
  name: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  category: string;
};

const FormValidator = () => {
  const [error, setError] = useState<any | string>();
  //password suggestion
  const [suggestedPassword, setSuggestedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePasswordSuggestion = () => {
    const newPassword = generateStrongPassword();
    setSuggestedPassword(newPassword);
    return newPassword;
  };
  const initialValues: UserTypes = {
    name: "",
    email: "",
    password: suggestedPassword,
    confirmPassword: "",
    age: 0,
    category: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: UserTypes, { setSubmitting }: any) => {
    // Your submit logic here

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data?.message);
      }
    } catch (error: any) {
      setError(error?.message);
      //   console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center my-20"
    >
      {({ isSubmitting, touched, errors, handleBlur, setFieldValue }) => (
        <Form className="max-w-sm mx-auto mt-8 bg-white py-8 px-8 rounded-lg border-teal-400 my-20 shadow-md border hover:border-violet-500 duration-300">
          <h1 className="text-gray-700 text-2xl text-center my-4">Validation Form</h1>
          {error && <h1 className="text-red-500 text-xl bold">{error}</h1>}
          {/* name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>

            <Field
              placeholder="Name"
              type="text"
              id="name"
              name="name"
              onBlur={handleBlur}
              className={`mt-1 p-3 outline-none rounded-md w-full text-black ${
                touched.name && errors.name
                  ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
              }`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <Field
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              onBlur={handleBlur}
              className={`mt-1 p-3 outline-none rounded-md w-full text-black ${
                touched.email && errors.email
                  ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>
          {/* age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>

            <Field
              placeholder="Age"
              type="number"
              id="age"
              name="age"
              onBlur={handleBlur}
              className={`mt-1 p-3 outline-none rounded-md w-full text-black ${
                touched.age && errors.age
                  ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
              }`}
            />
            <ErrorMessage
              name="age"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>
          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Field
              as="select"
              id="category"
              name="category"
              onBlur={handleBlur}
              className={`mt-1 p-2 outline-none rounded-md w-full text-black ${
                touched.category && errors.category
                  ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
              }`}
            >
              <option value="" label="Select Category" />
              <option value="admin" label="Admin" />
              <option value="user" label="User" />
              <option value="sub-admin" label="Sub Admin" />
              <option value="Not Valid" label="Unknown" />
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>

          {/* password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Field
                placeholder="Password"
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`mt-1 p-3 border outline-none rounded-md w-full text-black ${
                  touched.password && errors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
                }`}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoMdEyeOff className="text-gray-700 text-2xl" />
                ) : (
                  <IoMdEye className="text-gray-700 text-2xl" />
                )}
              </span>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-2"
            />

            {/* Suggested Password */}
            <div className="my-2">
              <button
                type="button"
                className="text-blue-500 underline cursor-pointer"
                onClick={() => {
                  const newPassword = handlePasswordSuggestion();
                  setFieldValue("password", newPassword);
                }}
              >
                Generate Strong Password
              </button>
              {suggestedPassword && (
                <div className="text-gray-500 text-sm mt-2">
                  Suggested Password: {suggestedPassword}
                </div>
              )}
            </div>
          </div>
          {/* Confirm Password */}
          {/* password */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Field
                placeholder="Confirm Password"
                onBlur={handleBlur}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={`mt-1 p-3 border outline-none rounded-md w-full text-black ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
                }`}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <IoMdEyeOff className="text-gray-700 text-2xl" />
                ) : (
                  <IoMdEye className="text-gray-700 text-2xl" />
                )}
              </span>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>
          {/* Remember Me */}
          <div className="mb-4 flex flex-col  justify-start">
            <div>
              {" "}
              <Field
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className={`mr-2 outline-none   rounded w-4 h-4   checked:bg-blue-500 checked:border-transparent focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 ${
                  touched.rememberMe && errors.rememberMe
                    ? "ring-1 offset-none rounded-md outline-none border-none ring-red-500"
                    : ""
                }`}
              />
              <label
                htmlFor="rememberMe"
                className={`text-sm text-gray-700 ${
                  touched.rememberMe && errors.rememberMe ? "text-red-500" : ""
                }`}
              >
                Remember Me
              </label>
            </div>
            <ErrorMessage
              name="rememberMe"
              component="div"
              className="text-red-500 text-sm mt-2 block"
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white rounded-md px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed ${
              isSubmitting ? "opacity-50 cursor-wait" : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormValidator;
