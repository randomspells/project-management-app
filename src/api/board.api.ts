import { MethodsEnum, EndpointsEnum, TagsEnum } from '../enums/index';
import {
  BoardsPostInterface,
  BoardsGetInterface,
  BoardInterface,
} from '../interfaces/index';
import baseApi from './base.api';

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<BoardsGetInterface[], void>({
      query: () => EndpointsEnum.Boards,
      providesTags: [TagsEnum.Boards],
    }),

    getBoard: builder.query<BoardInterface, string>({
      query: (boardId: string) => `${EndpointsEnum.Boards}/${boardId}`,
      transformResponse: (response: BoardInterface) => {
        response.columns.sort((a, b) => a.order > b.order ? 1 : -1)
        response.columns.forEach((column) => column.tasks.sort((a, b) => a.order > b.order ? 1 : -1))
        return response;
      },
      providesTags: [TagsEnum.Board],
    }),

    createBoard: builder.mutation<void, BoardsPostInterface>({
      query: (body) => ({
        url: EndpointsEnum.Boards,
        method: MethodsEnum.Post,
        body,
      }),
      invalidatesTags: [TagsEnum.Boards],
    }),

    deleteBoard: builder.mutation<void, string>({
      query: (boardId: string) => ({
        url: `${EndpointsEnum.Boards}/${boardId}`,
        method: MethodsEnum.Delete,
      }),
      invalidatesTags: [TagsEnum.Boards],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useGetBoardQuery,
  useDeleteBoardMutation,
} = boardApi;
