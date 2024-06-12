import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { RoleEnum } from "../../enums/role.enum";
import { Navbar } from "../Navbar/Navbar";

export const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return (
    <>
      <Navbar role={user.role} />
      <Outlet />
    </>
  );
};
