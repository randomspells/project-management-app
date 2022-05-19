import baseApi from './base.api'

//  template
export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body
      })
    }),
  })
})

export const { useCreateBoardMutation } = boardApi

