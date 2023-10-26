import useAsync from "../useAsync";
import useToken from "../useToken";

import * as credentialsApi from "../../services/credentialsApi";

export default function useCredentials() {
  const token = useToken() as string;

  const {
    data: credentials,
    loading: credentialsLoading,
    error: credentialsError,
    act: getCredentials,
  } = useAsync(
    (newToken: string = token) => credentialsApi.get(newToken),
    false
  );

  return {
    credentials,
    credentialsLoading,
    credentialsError,
    getCredentials,
  };
}
