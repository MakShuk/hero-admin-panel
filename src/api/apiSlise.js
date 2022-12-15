import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Heroes'],
  endpoints: (bulder) => ({
    getHerois: bulder.query({
      query: () => '/heroes',
      providesTags: ['Heroes'],
    }),
    createHerow: bulder.mutation({
      query: (hero) => ({
        url: '/heroes',
        method: 'POST',
        body: hero,
      }),
      invalidatesTags: ['Heroes'],
    }),
    deleteHerow: bulder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes'],
    }),
  }),
});

export const { useGetHeroisQuery, useCreateHerowMutation, useDeleteHerowMutation } = apiSlice;
