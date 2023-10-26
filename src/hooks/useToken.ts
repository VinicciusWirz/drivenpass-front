import { useContext } from "react";

import AuthContext from "../contexts/auth.context";

export default function useToken(): string | null {
  const { authData } = useContext(AuthContext);

  return authData?.token;
}
