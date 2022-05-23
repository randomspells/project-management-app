import { EndpointsEnum } from '../enums';
import { UserInterface } from '../interfaces';
import baseApi from './base.api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserInterface[], void>({
      query: () => EndpointsEnum.Users,
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),

    signin: builder.mutation({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useGetUsersQuery } = authApi;
