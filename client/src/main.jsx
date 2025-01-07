import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/login',
    element: <App/>,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/register',
    element: <App/>,
    children: [
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: '/verify-email',
    element: <App/>,
    children: [
      {
        path: '/verify-email',
        element: <VerifyEmail />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);