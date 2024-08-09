import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import EnterEmail from "./component/EnterEmail";
import EnterOTP from "./component/EnterOTP";
import ResetPassword from "./component/ResetPassword";
import Welcome from "./component/Welcome";
import Error from "./component/Error";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailId, setEmailId] = useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/reset" element={<EnterEmail setEmailId={setEmailId} />} />
        <Route path="*" element={<Error />} />
        <Route path="/verify" element={<EnterOTP emailId={emailId} />} />
        <Route path="/submit" element={<ResetPassword emailId={emailId} />} />
        {isLoggedIn && <Route path="/welcome" element={<Welcome />} />}
      </Routes>
    </Router>
  );
}

export default App;
