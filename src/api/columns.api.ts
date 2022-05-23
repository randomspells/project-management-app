import baseApi from './base.api'
import { TagsEnum } from '../enums/index';

export const columnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumn: builder.query({
      query: (boardId) => (`boards/${boardId}/columns`),
      providesTags: [TagsEnum.Columns],
    }),
    createColumn: builder.mutation({
      query: ({body, boardId}) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body
      }),
      invalidatesTags: [TagsEnum.Columns],
    }),
    deleteColumn: builder.mutation({
      query: ({boardId, columnId}) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagsEnum.Columns],
    }),
  })
})

export const { useCreateColumnMutation, useDeleteColumnMutation, useGetAllColumnQuery} = columnsApi
