import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({ 
                url: '/auth/signin',
                method: 'POST',
                body: body
             })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'DELETE'
            })
        }),
        refresh: builder.query({
            query: ()=> ({ 
                url: '/auth/refresh'
            })
        }),
        verifyIdentity: builder.query({
            query: () => 'auth/verifyIdentity'
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body: body
            })
        })
    })
})

export const { useLoginMutation, 
                useLogoutMutation, 
                useSignUpMutation, 
                useRefreshQuery, 
                useVerifyIdentityQuery } = authApi