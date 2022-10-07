import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const brandsApi = createApi({
    reducerPath: 'brandsApi',
    tagTypes: ['Brands'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://immense-forest-97338.herokuapp.com/'}),
    endpoints: (build) => ({
        getBrands: build.query({
            query: () => `brands`,
            providesTags: (result) => ['Brands']
        }),
        addBrand: build.mutation({
            query: (brand) => ({
                url: 'brands',
                method: 'POST',
                body: brand,
            }),
            invalidatesTags: ['Brands']
        }),
        deleteBrand: build.mutation({
            query: (id) => ({
                url: `brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brands']
        }),
        editBrand: build.mutation({
            query: ({id, ...body}) => ({
                url: `brands/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Brands']
        })
    })
});

export const {useGetBrandsQuery, useAddBrandMutation, useDeleteBrandMutation, useEditBrandMutation} = brandsApi;