import baseApi from './base.api'
import { TagsEnum, MethodsEnum, EndpointsEnum } from '../enums/index';

export const columnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumn: builder.query({
      query: (boardId) => (`${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}`),
      providesTags: [TagsEnum.Columns],
    }),
    createColumn: builder.mutation({
      query: ({body, boardId}) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}`,
        method: MethodsEnum.Post,
        body
      }),
      invalidatesTags: [TagsEnum.Columns],
    }),
    deleteColumn: builder.mutation({
      query: ({boardId, columnId}) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}`,
        method: MethodsEnum.Delete,
      }),
      invalidatesTags: [TagsEnum.Columns],
    }),
  })
})

export const { useCreateColumnMutation, useDeleteColumnMutation, useGetAllColumnQuery} = columnsApi
