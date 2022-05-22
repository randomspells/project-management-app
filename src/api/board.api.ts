import { MethodsEnum, EndpointsEnum, TagsEnum } from '../enums/index';
import { BoardsPostInterface, BoardsGetInterface } from '../interfaces/index';
import baseApi from './base.api';

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<BoardsGetInterface[], void>({
      query: () => EndpointsEnum.Boards,
      providesTags: [TagsEnum.Boards],
    }),
    getBoardId: builder.query<BoardsGetInterface, string>({
      query: (boardId: string) => `${EndpointsEnum.Boards}/${boardId}`,
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
    })
  }),
});

export const { 
  useCreateBoardMutation, 
  useGetBoardsQuery, 
  useGetBoardIdQuery, 
  useDeleteBoardMutation 
} = boardApi;
