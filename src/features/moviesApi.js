import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './apiSlice'

export const moviesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (query) => (`netflix/shows/${query}`)
        }),
        searchShows: builder.query({
            query: (args) => {
                const { query, page } = args
                console.log(args);
                return {url: (`netflix/search/${query}/${page}`)}
            }
        }),
    })
})

export const { useGetMoviesQuery, useSearchShowsQuery } = moviesApi