import useAsync from "../useAsync";
import useToken from "../useToken";

import * as userApi from "../../services/userApi";

export default function useUserCount() {
  const token = useToken() as string;

  const {
    data: userCount,
    loading: userCountLoading,
    error: userCountError,
    act: getUserCount,
  } = useAsync((newToken: string = token) => userApi.fetchCount(newToken), false);

  return {
    userCount,
    userCountLoading,
    userCountError,
    getUserCount,
  };
}
