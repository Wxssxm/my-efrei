import { ReactNode, createContext, useState } from "react";
import { LoginPayload } from "../interfaces/login-payload.interface";
import { AuthContextInterface } from "../interfaces/auth-context.interface";
import { users } from "../db/users";

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const login = async (payload: LoginPayload) => {
    const filteredUsers = users.filter(
      (a) => a.email === payload.mail && a.password === payload.password
    );

    if (filteredUsers.length > 0) {
      localStorage.setItem("userProfile", JSON.stringify(filteredUsers[0]));
      setUser(filteredUsers[0]);
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("userProfile");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
