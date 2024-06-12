import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { Navbar } from "../Navbar/Navbar";
import path from "path";
import { RoleEnum } from "../../enums/role.enum";

export const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  const roleProtectedRoutes = [
    {
      path: "/promotions",
      roles: [RoleEnum.TEACHER],
    },
    {
      path: "/grades",
      roles: [RoleEnum.STUDENT, RoleEnum.TEACHER],
    },
    {
      path: "/courses",
      roles: [RoleEnum.STUDENT],
    },
  ];

  if (!user) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  if (
    roleProtectedRoutes.some(
      (route) =>
        route.path === location.pathname && !route.roles.includes(user.role)
    )
  ) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Navbar role={user.role} />
      <Outlet />
    </>
  );
};
