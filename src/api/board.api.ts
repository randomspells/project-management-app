import { MethodsEnum, EndpointsEnum, TagsEnum } from '../enums/index';
import { BoardsPostInterface, BoardsGetInterface } from '../interfaces/index';
import baseApi from './base.api';

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<BoardsGetInterface[], void>({
      query: () => EndpointsEnum.Boards,
      providesTags: [TagsEnum.Boards],
    }),
    createBoard: builder.mutation<void, BoardsPostInterface>({
      query: (body) => ({
        url: `${EndpointsEnum.Boards}awd`,
        method: MethodsEnum.Post,
        body,
      }),
      invalidatesTags: [TagsEnum.Boards],
    }),
  }),
});

export const { useCreateBoardMutation, useGetBoardsQuery } = boardApi;
