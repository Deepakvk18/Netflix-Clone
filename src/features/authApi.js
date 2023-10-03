import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        login: builder.query({
            query: (url) => ({ url: url })
        }),
        logout: builder.query({

        }),
        refresh: builder.query({
            query: ()=> ({ 
                url: '/auth/refresh'
            })
        }),
        verifyIdentity: builder.query({

        }),
        signUp: builder.mutation({

        })
    })
})

export const { useLoginQuery, 
                useLogoutQuery, 
                useSignUpMutation, 
                useRefreshQuery, 
                useVerifyIdentityQuery } = authApi