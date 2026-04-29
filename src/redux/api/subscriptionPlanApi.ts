import { baseApi } from "./baseApi";

const subscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPlan: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["plans"]
    }),
    getAllPlans: builder.query({
      query: (params) => ({
        url: "/packages",
        method: "GET",
        params
      }),
      providesTags: ["plans"]
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `/packages/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["plans"]
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plans"]
    })
  }),
})

export const { useAddPlanMutation, useGetAllPlansQuery, useUpdatePlanMutation, useDeletePlanMutation } = subscriptionPlanApi;