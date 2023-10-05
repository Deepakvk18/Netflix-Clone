import { apiSlice } from './apiSlice';

export const paymentsApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ('/payments/products')
        }),
        checkOut: builder.mutation({
            query: (body) => ({url: '/payments/checkout', method: 'POST', body: body})
        })
    })
})

export const { useGetProductsQuery } = paymentsApi