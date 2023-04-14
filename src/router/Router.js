import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const Router = () => {
  const [logged, setLogged] = useState(undefined);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       getUsers(user.uid)
  //         .then((response) => {
  //           dispatch(loginUser(response, { status: false, message: "" }));
  //           setLogged(true)
  //         })
  //         .catch((error) => {
  //           dispatch(loginUser({}, { status: true, message: error.message }));

  //         });
  //     } else {
  //       console.log("No tas");
  //       setLogged(false)
  //       navigate('/signIn')

  //     }
  //   });

  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navbar />}>
          <Route path="user" element={<UserInfo />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="foro" element={<Foro />} />
          <Route path="newPlace" element={<NewPlace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
