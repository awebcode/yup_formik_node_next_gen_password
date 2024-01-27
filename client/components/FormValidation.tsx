"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  name: Yup.string().required().min(4).max(8),
  age: Yup.number().required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Is Required"),
});

type UserTypes = {
  name: string;
  email: string;
  age: number;
  password: string;
};

const FormValidator = () => {
  const [error, setError] = useState<any | string>();
  const initialValues: UserTypes = {
    name: "",
    email: "",
    password: "",
    age: 0,
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
  console.log("x", error);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center"
    >
      {({ isSubmitting, touched, errors, handleBlur }) => (
        <Form className="max-w-sm mx-auto mt-8 bg-white py-8 px-6 rounded-lg shadow-md ">
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
          {/* password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              placeholder="Password"
              onBlur={handleBlur}
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-3 border outline-none rounded-md w-full text-black ${
                touched.password && errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
              }`}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-2"
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
