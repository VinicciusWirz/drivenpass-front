import useAsync from "../useAsync";

import * as authApi from "../../services/userApi";

export default function useSignUp() {
  const {
    loading: signInLoading,
    error: signInError,
    act: signIn,
  } = useAsync(authApi.signIn, false);

  return {
    signInLoading,
    signInError,
    signIn,
  };
}
