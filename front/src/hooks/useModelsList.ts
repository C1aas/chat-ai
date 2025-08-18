import { useGetModelsQuery } from "../Redux/reducers/appApi";
export const useModelsList = () =>
  useGetModelsQuery(undefined, {
    pollingInterval: 30_000,
    refetchOnMountOrArgChange: true
  });
