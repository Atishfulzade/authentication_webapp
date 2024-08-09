import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const EnterOTP = ({ emailId }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && value) {
        inputs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      // Perform OTP validation here
      try {
        await axios.post(`http://localhost:5000/api/auth/verify-otp`, {
          email: emailId,
          otp: enteredOtp,
        });
        navigate("/submit");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter the complete OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Enter OTP
      </h2>
      <p>send in {emailId}</p>
      <div className="flex space-x-2 mb-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            ref={(el) => (inputs.current[index] = el)}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        ))}
      </div>
      <p className="mb-4 text-sm text-red-600 dark:text-red-500">
        Invalid OTP. Please try again.
      </p>
      <button
        type="button"
        onClick={handleSubmit}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
      >
        Submit OTP
      </button>
    </div>
  );
};

export default EnterOTP;
