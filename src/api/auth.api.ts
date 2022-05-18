import baseApi from './base.api'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body
      })
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body
      })
    }),
  })
})

export const { useSignupMutation, useSigninMutation} = authApi

