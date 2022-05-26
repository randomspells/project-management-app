import { EndpointsEnum, MethodsEnum, TagsEnum } from '../enums';
import baseApi from './base.api';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({boardId, columnId}) => (`${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}/${EndpointsEnum.Tasks}`),
      transformResponse: (response: Record<string, string>[]) => response.sort((a, b) => a.order > b.order ? 1 : -1),
      providesTags: [TagsEnum.Tasks]
    }),
    createTask: builder.mutation({
      query: ({ body , boardId, columnId }) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}/${EndpointsEnum.Tasks}`,
        method: MethodsEnum.Post,
        body,
      }),
      invalidatesTags: [TagsEnum.Tasks, TagsEnum.Board],
    }),
    deleteTask: builder.mutation({
      query: ({boardId, columnId, taskId}) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}/${EndpointsEnum.Tasks}/${taskId}`,
        method: MethodsEnum.Delete,
      }),
      invalidatesTags: [TagsEnum.Tasks, TagsEnum.Board],
    }),
    updateTask: builder.mutation({
      query: ({boardId, columnId, taskId, body}) => ({
        url: `${EndpointsEnum.Boards}/${boardId}/${EndpointsEnum.Columns}/${columnId}/${EndpointsEnum.Tasks}/${taskId}`,
        method: MethodsEnum.Put,
        body,
      }),
      invalidatesTags: [TagsEnum.Tasks, TagsEnum.Board],
    }),
  })
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation  } = taskApi;
