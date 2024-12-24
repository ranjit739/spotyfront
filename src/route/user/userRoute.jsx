import MyPlaylist from "../../components/MyPlayList";
import ViewAllSongs from "../../components/ViewAllSongs";
import Dashboard from "../../pages/Dashboard";
import ProtectedRoute from "../ProtectedRoute";

export const userRoute = () => {
  return [
    {
      element: <ProtectedRoute element={<Dashboard />} />,
      path: "/dashboard",
    },
    {
      element: <ProtectedRoute element={<MyPlaylist />} />,
      path: "/myplaylist",
    },
    {
      element: <ProtectedRoute element={<ViewAllSongs />} />,
      path: "/myplaylist/:id",
    },
  ];
};
