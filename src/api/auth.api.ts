import { TagsEnum } from '../enums';
import { SignUpInterface, UserInterface } from '../interfaces';
import baseApi from './base.api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<UserInterface, SignUpInterface>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagsEnum.Users],
    }),

    signin: builder.mutation({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagsEnum.Users],
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
