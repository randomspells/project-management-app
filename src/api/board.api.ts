import { MethodsEnum, EndpointsEnum, TagsEnum } from '../enums/index';
import {
  BoardsPostInterface,
  BoardsGetInterface,
  BoardInterface,
  ColumnInterface,
  TaskInterface,
} from '../interfaces/index';
import baseApi from './base.api';

const sortItems = (
  a: TaskInterface | ColumnInterface,
  b: TaskInterface | ColumnInterface,
) => a.order - b.order;

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<BoardsGetInterface[], void>({
      query: () => EndpointsEnum.Boards,
      providesTags: [TagsEnum.Boards],
    }),

    getBoard: builder.query<BoardInterface, string>({
      query: (boardId: string) => `${EndpointsEnum.Boards}/${boardId}`,
      transformResponse: (board: BoardInterface) => {
        const columns = [...board.columns];
        const sortedColumns: ColumnInterface[] = columns
          .map((column) => ({ ...column, tasks: column.tasks.sort(sortItems) }))
          .sort(sortItems);
        const sortedData = {
          ...board,
          columns: [...sortedColumns],
        };
        return sortedData;
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
