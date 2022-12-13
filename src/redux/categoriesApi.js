import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    tagTypes: ['Categories'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.npoint.io/727f65753e9351c16a19'}),
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories`,
            providesTags: (result) => ['Categories']
        }),
        addCategory: build.mutation({
            query: (category) => ({
                url: 'categories',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Categories']
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories']
        }),
        editCategory: build.mutation({
            query: ({id, ...body}) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Categories']
        })
    })
});

export const {useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation} = categoriesApi;