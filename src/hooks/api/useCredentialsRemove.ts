import useAsync from "../useAsync";
import useToken from "../useToken";

import * as credentialsApi from "../../services/credentialsApi";

export default function useCredentialsRemove() {
  const token = useToken() as string;

  const {
    data: credentialsRemove,
    loading: credentialsRemoveLoading,
    error: credentialsRemoveError,
    act: deleteCredentialsRemove,
  } = useAsync(
    (newToken: string = token, id: number) =>
      credentialsApi.remove(newToken, id),
    false
  );

  return {
    credentialsRemove,
    credentialsRemoveLoading,
    credentialsRemoveError,
    deleteCredentialsRemove,
  };
}
