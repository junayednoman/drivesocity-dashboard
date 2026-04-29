import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: () => ({
        url: "/payments/dashboard-data",
        method: "GET",
      }),
      providesTags: ["earning"]
    }),
  }),
})

export const { useGetEarningsQuery } = earningApi;