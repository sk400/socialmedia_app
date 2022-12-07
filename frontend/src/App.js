import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

import { Login } from "./components";
import Home from "./container/Home";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logInUser, logOutUser } from "./features/user/user";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);

        navigate("/");

        dispatch(logInUser(user?.providerData[0]));
      } else {
        // dispatch(logOutUser());
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
