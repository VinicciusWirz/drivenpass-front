import useAsync from "../useAsync";
import useToken from "../useToken";

import * as credentialsApi from "../../services/credentialsApi";

export default function useCredentialsCreate() {
  const token = useToken() as string;

  const {
    data: credentialsCreate,
    loading: credentialsCreateLoading,
    error: credentialsCreateError,
    act: postCredentialsCreate,
  } = useAsync(
    (newToken: string = token, body: Credential) =>
      credentialsApi.post(newToken, body),
    false
  );

  return {
    credentialsCreate,
    credentialsCreateLoading,
    credentialsCreateError,
    postCredentialsCreate,
  };
}
