import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query({
      query: (params) => ({
        url: "/contents",
        method: "GET",
        params
      }),
      providesTags: ["content"]
    }),
    updateContent: builder.mutation({
      query: (data) => ({
        url: `/contents`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["content"]
    })
  }),
})

export const { useGetContentsQuery, useUpdateContentMutation } = contentApi;