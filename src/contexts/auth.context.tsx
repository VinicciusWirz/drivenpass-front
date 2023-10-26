import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthDataType } from "../types";


const AuthContext = createContext<AuthDataType | any>({ token: null });

export default AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = useLocalStorage("auth") as string | null;
  const auth = token === null ? null : { token } as AuthDataType;
  const [authData, setAuthData] = useState<AuthDataType | null>(auth);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
