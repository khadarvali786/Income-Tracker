import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import IncomeInput from "./components/IncomeInput.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Investment from "./components/Investment.jsx";
import {Provider} from "react-redux"
import myStore from "./Store/index.js";
import AuthForm from "./components/Login_SignUp_Component/SignUp.jsx";
import LoginForm from "./components/Login_SignUp_Component/Login.jsx";
import SignUp from "./components/Login_SignUp_Component/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <App />,
    children: [
      // Add routes here
      {
        path: "/",
        element: <IncomeInput />,
      },
      { path:"/investments", element:<Investment/>},
      {
        path:"/login",element: <LoginForm/>
      },
      {
        path:"/signup",element: <SignUp/>
      },
    ],
    errorElement:<ErrorPage/>
  },
]);
// // Initialize Lenis
// const lenis = new Lenis();

// // Use requestAnimationFrame to continuously update the scroll
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={myStore}>
   <RouterProvider router={router}/>
   </Provider>
  </StrictMode>
);
