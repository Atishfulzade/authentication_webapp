import React, { useState } from "react";

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Captcha = ({ onChange }) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputValue, setInputValue] = useState("");

  const handleRefresh = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setInputValue("");
    onChange("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="captcha-container">
      <div className="captcha-display">{captcha}</div>
      <button type="button" onClick={handleRefresh}>
        Refresh
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter the captcha"
      />
    </div>
  );
};

export default Captcha;
