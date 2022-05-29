import { ColumnInterface } from '../interfaces/index';
import baseApi from './base.api';
import { TagsEnum, MethodsEnum, EndpointsEnum } from '../enums/index';

export const columnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumn: builder.query({
      query: (boardId) =>
        `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}`,
      providesTags: [TagsEnum.Columns],
    }),

    getColumn: builder.query<ColumnInterface, unknown>({
      query: ({ boardId, columnId }) =>
        `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}`,
      providesTags: [TagsEnum.Column],
    }),

    createColumn: builder.mutation({
      query: ({ body, boardId }) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}`,
        method: MethodsEnum.Post,
        body,
      }),
      invalidatesTags: [TagsEnum.Columns, TagsEnum.Board],
    }),

    deleteColumn: builder.mutation({
      query: ({ boardId, columnId }) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}`,
        method: MethodsEnum.Delete,
      }),
      invalidatesTags: [TagsEnum.Columns, TagsEnum.Board],
    }),

    updateColumn: builder.mutation({
      query: ({ body, boardId, columnId }) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}`,
        method: MethodsEnum.Put,
        body,
      }),
      invalidatesTags: [TagsEnum.Columns, TagsEnum.Board],
    }),
  }),
});

export const {
  useCreateColumnMutation,
  useGetColumnQuery,
  useDeleteColumnMutation,
  useGetAllColumnQuery,
  useUpdateColumnMutation,
} = columnsApi;
