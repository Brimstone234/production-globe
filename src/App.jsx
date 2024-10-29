// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Sidebar from "./pages/Sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;