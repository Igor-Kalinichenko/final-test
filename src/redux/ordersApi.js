import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.npoint.io/727f65753e9351c16a19'}),
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => `orders`,
            providesTags: (result) => ['Orders']
        }),
        addOrder: build.mutation({
            query: (body) => ({
                url: 'orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Orders']
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders']
        }),
    })
});

export const {useGetOrdersQuery, useAddOrderMutation, useDeleteOrderMutation} = ordersApi;