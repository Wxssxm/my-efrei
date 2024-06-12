import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { Loader } from "../../components/Loader/Loader";

export const Logout = () => {
  const { logout } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      logout();
      setIsLoggedOut(true);
    }, 2000);
  }, []);
  if (!isLoggedOut) {
    return <Loader />;
  }
  return null;
};
