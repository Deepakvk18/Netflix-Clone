import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './apiSlice'

export const moviesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (query) => (`netflix/shows/${query}`)
        }),
    })
})

export const { useGetMoviesQuery } = moviesApi