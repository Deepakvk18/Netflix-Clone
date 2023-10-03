import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (url) => ({ url: url })
        }),
    })
})

export const { useGetMoviesQuery } = moviesApi