import { useGetUserQuery } from "../Redux/reducers/appApi";
export const useUserData = () =>
  useGetUserQuery(undefined, {refetchOnMountOrArgChange: true});