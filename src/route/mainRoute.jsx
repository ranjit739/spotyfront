import { authRoute } from "./public/authRoute";
import { userRoute } from "./user/userRoute";

export const mainRoute = () => {
  return [
    ...authRoute(),...userRoute(),
    {
      path: "*", // Catch-all route for invalid paths
      element: <div>404 Page Not Found</div>,
    },
  ];
};
