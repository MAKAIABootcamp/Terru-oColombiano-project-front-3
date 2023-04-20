import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import { onAuthStateChanged } from "firebase/auth";
import { getUsers } from "../services/getUsers";
import UserInfo from "../components/profile/UserInfo";
import Navbar from "../components/navbar/Navbar";
import Favorites from "../components/places/favorites/Favorites";
import Foro from "../components/foro/Foro";
import NewPlace from "../components/newPlace/NewPlace";
import UpdateUser from "../components/profile/logout/UpdateUser";
import LoginWithPhone from "../components/loginWithPhone/LoginWithPhone";
import Verification from "../components/loginWithPhone/Verification";
import Phone from "../components/loginWithPhone/Phone";
import UpdateInfo from "../components/login/UpdateInfo";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import PrivateRouter from "./PrivateRouter";
import Welcome from "../components/welcome/Welcome";

const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUsers(user.uid)
          .then((response) => {
            dispatch(loginUser(response, { status: false, message: "" }));
          })
          .catch((error) => {
            dispatch(loginUser({}, { status: true, message: error.message }));
          });
      } else {
        console.log("No tas");
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="loginWithPhone" element={<LoginWithPhone />}>
          <Route path="phone" element={<Phone />} />
          <Route path="verification" element={<Verification />} />
          <Route path="updateInfo" element={<UpdateInfo />} />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRouter>
              <Navbar />
            </PrivateRouter>
          }
        >
          <Route path="user" element={<UserInfo />} />
          <Route path='/update-user' element={<UpdateUser />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="foro" element={<Foro />} />
          <Route path="newPlace" element={<NewPlace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
