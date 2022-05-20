import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://team80backend.herokuapp.com',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.currentUser?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseApi = createApi({
  baseQuery,
  tagTypes: ['Boards'],
  endpoints: () => ({}),
})

export default baseApi

