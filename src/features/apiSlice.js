import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend } from '../utils/baseUrl';
import { store } from '../app/store';
import { logout, login } from './userSlice';
import { FRONTEND_URL } from '../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: backend,
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
        const idToken = getState().user.idToken
        if (idToken) {
            headers.set("Authorization", `Bearer ${idToken}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    // If the API call is failed, retry it after refreshing the access token
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const idToken = api.getState().user.idToken
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



