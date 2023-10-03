import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend } from '../utils/baseUrl';
import { store } from '../app/store';
import { logout, login } from './userSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: backend,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().token
        if (token) {
            headers.set("authorization", `Bearer ${localStorage.getItem('idToken')}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {


    // If the API call is failed, retry it after refreshing the access token
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const idToken = api.getState().idToken
            console.log(idToken)
            // store the new token 
            api.dispatch(login({ ...refreshResult.data, idToken }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})



