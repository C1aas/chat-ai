// src/store/services/appApi.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getModelsData } from "../../apis/getModelsData";
import { getUserData } from "../../apis/getUserData";

import type { ModelInfo } from "../../types/models";
import type { User } from "../../types/user";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ModelList", "User"],
  endpoints: (builder) => ({
    getModels: builder.query<ModelInfo[], void>({
      queryFn: async () => {
        try {
          const data = (await getModelsData()) as ModelInfo[];
          return { data };
        } catch (err: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              message: String(err?.message ?? err),
            },
          };
        }
      },
      providesTags: ["ModelList"],
    }),
    getUser: builder.query<User, void>({
      queryFn: async () => {
        console.log("Fetching user data");
        try {
          const data = (await getUserData()) as User;
          return { data };
        } catch (err: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              message: String(err?.message ?? err),
            },
          };
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetModelsQuery, useGetUserQuery } = appApi;

// global invalidation helpers
export const forceRefetchModelList =
  () => (dispatch: any) => dispatch(appApi.util.invalidateTags(["ModelList"]));

export const forceRefetchUser =
  () => (dispatch: any) => dispatch(appApi.util.invalidateTags(["User"]));
