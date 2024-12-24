import Login from "../../pages/authPages/Login";
import Signup from "../../pages/authPages/SignUp";

export const authRoute = () => {
  return [
    {
      element: <Login />,
      path: "/login",
    },
    {
        element: <Signup />,
        path: "/signup",
      },
  ];
};
