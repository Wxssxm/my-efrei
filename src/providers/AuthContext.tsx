import { ReactNode, createContext, useState } from "react";
import { LoginPayload } from "../interfaces/login-payload.interface";
import { AuthContextInterface } from "../interfaces/auth-context.interface";

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
    return true;
  };

  const logout = async () => {};
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
