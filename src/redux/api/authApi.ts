import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "PATCH"
      }),
      invalidatesTags: ["auth"]
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"]
    }),
    forgetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ token, credentials }) => ({
        url: "/otp/verify-otp",
        method: "POST",
        headers: {
          "Authorization": `${token}`
        },
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, credentials }) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: {
          "Authorization": `${token}`
        },
        body: credentials,
      }),
    })
  }),
})

export const { useLoginMutation, useLogoutMutation, useChangePasswordMutation, useForgetPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation } = authApi;