import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Login } from "./pages/Login/Login";
import { AuthContextProvider } from "./providers/AuthContext";
import { Home } from "./pages/Home/Home";
import { Logout } from "./pages/Logout/Logout";
import { Promotions } from "./pages/Promotions/Promotions";
import { Grades } from "./pages/Grades/Grades";
import { GradesPromotion } from "./pages/Grades/GradesPromotion/GradesPromotion";
import { Courses } from "./pages/Courses/Courses";
import { Profile } from "./pages/Profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/promotions",
                element: <Promotions />,
            },
            {
                path: "/grades",
                element: <Grades />,
            },
            {
                path: "/grades/:promotionId",
                element: <GradesPromotion />,
            },
            {
                path: "/courses",
                element: <Courses />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/profile",
                element: <Profile />,
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
