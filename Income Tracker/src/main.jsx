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
      { path:"/investments", element:<Investment/>}
    ],
    errorElement:<ErrorPage/>
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={myStore}>
   <RouterProvider router={router}/>
   </Provider>
  </StrictMode>
);
