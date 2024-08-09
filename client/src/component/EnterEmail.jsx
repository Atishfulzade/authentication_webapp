import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const EnterEmail = ({ setEmailId }) => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Here you would typically send the OTP
      try {
        await axios.post(
          `http://localhost:5000/api/auth/forgot-password`,
          values
        );
        setEmailId(values.email);
        navigate("/verify");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-4 text-2xl text-center font-bold text-gray-900 dark:text-white">
          Email Authentication
        </h2>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          Please enter your email address to receive an OTP for authentication.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-1 text-sm text-red-600" id="email-error">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterEmail;
