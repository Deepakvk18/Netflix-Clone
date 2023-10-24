import { apiSlice } from './apiSlice';

export const paymentsApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ('/payments/products'),
        }),
        checkOut: builder.mutation({
            query: (body) => ({
                url: '/payments/create-checkout-session', 
                method: 'POST', 
                body:body})
        }),
        changeSubscription: builder.mutation({
            query: (priceId) => ({
                url: `/payments/changeSubscription/${priceId}`, 
                method: 'PUT'})
        }),
        cancelSubscription: builder.mutation({
            query: () => ({
                url: '/payments/cancelSubscription', 
                method: 'DELETE'})
        }),
        getPrice: builder.query({
            query: (priceId) => ({
                url: `/payments/price/${priceId}`
            })
        })
    })
})

export const { useGetProductsQuery, useCheckOutMutation, useChangeSubscriptionMutation, useCancelSubscriptionMutation, useGetPriceQuery } = paymentsApi