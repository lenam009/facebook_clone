import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userRrkReduxApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8088/api/' }),
    endpoints: (builder) => ({
        getUsers: builder.query<IBackendRes<IModelPaginate<IUser>>, void>({
            query: () => `user/getall`,
        }),
        getUserById: builder.query<IBackendRes<IUser>, string>({
            query: (idUser) => `user/?_id=${idUser}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetUserByIdQuery } = userRrkReduxApi;
