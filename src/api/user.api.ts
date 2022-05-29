import { MethodsEnum, EndpointsEnum, TagsEnum } from '../enums/index';

import { UserInterface } from '../interfaces';
import baseApi from './base.api';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserInterface[], void>({
      query: () => EndpointsEnum.Users,
      providesTags: [TagsEnum.Users],
    }),

    updateUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `${EndpointsEnum.Users}/${userId}`,
        method: MethodsEnum.Put,
        body,
      }),
      invalidatesTags: [TagsEnum.Users],
    }),

    deleteUser: builder.mutation({
      query: (body) => ({
        url: `${EndpointsEnum.Users}/${body.id}`,
        method: MethodsEnum.Delete,
        body,
      }),
      invalidatesTags: [TagsEnum.Users],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
