import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend } from '../utils/baseUrl';
import { logout, login } from './userSlice';
import axios from 'axios';

const baseQuery = fetchBaseQuery({
    baseUrl: backend,
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
        const idToken = getState().user.idToken
        if (idToken) {
            headers.set("Authorization", `Bearer ${idToken}`)
        }
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Content-Type', 'application/json')
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    // If the API call is failed, retry it after refreshing the access token
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        try{
            const refreshResult = await axios.post(`${backend}/auth/refresh`, 
                { 
                    refreshToken: localStorage.getItem('refreshToken') }, 
                    { 
                        withCredentials: true,
                        credentials: 'include',
                        mode: 'cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        } 
                    })
                // console.log(refreshResult)
                // const idToken = api.getState().user.idToken
                // console.log(idToken)
                // store the new token 
                api.dispatch(login( refreshResult?.data ))
                // retry the original query with new access token 
                result = await baseQuery(args, api, extraOptions)
        } catch (err) {
            console.log(err)
            api.dispatch(logout())
        }

    }

    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})



