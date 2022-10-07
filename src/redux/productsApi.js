import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://immense-forest-97338.herokuapp.com/'}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => `products`,
            providesTags: (result) => ['Products']
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'products',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),
        editProduct: build.mutation({
            query: ({id, ...body}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Products']
        }),
        getProduct: build.query({
            query: (id) => `products/${id}`,
            providesTags: (result) => ['Products']
        })
    })
});

export const {useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductQuery} = productsApi;