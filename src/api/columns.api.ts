import baseApi from './base.api'

export const columnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation({
      query: ({body, boardId}) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body
      })
    }),
    deleteColumn: builder.mutation({
      query: ({boardId, columnId}) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE'
      })
    }),
  })
})

export const { useCreateColumnMutation, useDeleteColumnMutation} = columnsApi
