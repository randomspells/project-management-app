import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({url: 'signup', method: 'POST', body})
    }),
    login: builder.mutation({
      query: (body) => ({url: 'login', method: 'POST', body})
    }),
  })
})

export const { useSignupMutation, useLoginMutation } = authApi

