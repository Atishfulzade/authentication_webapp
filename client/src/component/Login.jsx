import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const siteKey = import.meta.env.VITE_SITE_KEY;

const Login = ({ setIsLoggedIn }) => {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState(null); // For displaying errors
  const [loading, setLoading] = useState(false); // For loading state

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .min(7, "Password must be at least 7 characters long")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!captchaValue) {
        alert("Please complete the CAPTCHA");
        return;
      }
      setLoading(true);
      try {
        await axios.post(`http://localhost:5000/api/auth/login`, {
          ...values,
          captcha: captchaValue,
        });
        setIsLoggedIn(true);
        navigate("/welcome");
      } catch (error) {
        setError(
          error.response?.data?.msg || "Login failed. Please try again."
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Login
        </h2>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.username && formik.errors.username
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter your username"
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="mt-1 text-sm text-red-600" id="username-error">
              {formik.errors.username}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="mt-1 text-sm text-red-600" id="password-error">
              {formik.errors.password}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="captcha"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Captcha
          </label>
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center justify-between">
          <Link
            to="/reset"
            className="text-sm text-blue-600 hover:underline dark:text-blue-500"
          >
            Forgot password?
          </Link>
          <Link
            to="/register"
            className="text-sm text-blue-600 hover:underline dark:text-blue-500"
          >
            Create an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
