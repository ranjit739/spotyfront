import { useRoutes } from "react-router-dom";
import { mainRoute } from "./route/mainRoute";
import CreatePlaylist from "./pages/playlist/CreatePlaylist.js";
import { toast, ToastContainer } from 'react-toastify';
import Header from "./components/Header.jsx";

const App = () => {
  const routes = useRoutes(mainRoute()); // Use consistent naming for `routes`.

  return <>
  <ToastContainer />
  <Header />
  {routes}
 
  </>;
};

export default App;
