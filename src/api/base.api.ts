import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagsEnum } from '../enums/index';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://team80backend2.herokuapp.com/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.currentUser?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseApi = createApi({
  baseQuery,
  tagTypes: [
    TagsEnum.Boards,
    TagsEnum.Board,
    TagsEnum.Columns,
    TagsEnum.Users,
    TagsEnum.Tasks,
  ],
  endpoints: () => ({}),
});

export default baseApi;
