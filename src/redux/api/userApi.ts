import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/profiles",
        method: "GET",
        params
      }),
      providesTags: ["user"]
    }),
    changeUseStatus: builder.mutation({
      query: (data) => ({
        url: `/profiles/change-status`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["user"]
    }),
  }),
})

export const { useGetUsersQuery, useChangeUseStatusMutation } = userApi;