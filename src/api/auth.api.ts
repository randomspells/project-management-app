import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://team80backend.herokuapp.com'
  }),
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

