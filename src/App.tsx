import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Login } from "./pages/Login/Login";
import { AuthContextProvider } from "./providers/AuthContext";
import { Home } from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
