import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeta: builder.query({
      query: (params) => ({
        url: "/meta",
        method: "GET",
        params
      }),
      providesTags: ["meta"]
    }),
  }),
})

export const { useGetMetaQuery } = dashboardApi;