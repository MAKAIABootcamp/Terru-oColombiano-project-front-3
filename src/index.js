import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/Router";
import "./styles.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
