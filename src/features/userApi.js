import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        signUpEmail: builder.mutation({
            query: (body) => ({ 
                url: '/users/signup',
                method: 'POST',
                body: body
             })
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: '/users/delete'
            })
        }),
        plans: builder.query({
            query: () => ({
                url: '/users/plans'
            })
        }),
        subscribe: builder.mutation({
            query: (plan) => ({
                url: `/users/subscribe/${plan}`,
                method: 'PUT'
            })
        }),
        getPlans: builder.query({
            query: () => ({
                url: '/users/plans'
            })
        }),
        
    })
})

export const { useSignUpEmailMutation,
                useDeleteUserMutation,
                usePlansQuery,
                useSubscribeMutation,
                useGetPlansQuery} = userApi