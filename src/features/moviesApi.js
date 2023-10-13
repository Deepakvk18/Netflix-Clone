import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './apiSlice'

export const moviesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (query) => (`netflix/shows/${query}/`)
        }),
        getMoreMovies: builder.query({
            query: (query) => (`netflix/moreShows/${query}/`)
        }),
        searchMoviesOrTV: builder.query({
            query: (args) => {
                const { query, type } = args
                return {url: (`netflix/search/${query}/${type}/`)}
            }
        }),
        getShowDetails: builder.query({
            query: (args) => {
                const { type, id } = args
              return { url: (`netflix/details/${type}/${id}`) }
            }
        }),
        getRecommendations: builder.query({
            query: (args) => {
                const { type, id } = args
              return { url: (`netflix/recommend/${type}/${id}`) }
            }
        }),
        getSeasonDetails: builder.query({
            query: (args) => {
                const { id, season } = args
              return { url: (`netflix/season/${id}/${season}`) }
            }
        }),
        getVideos: builder.query({
            query: (args) => {
                const { type, id } = args
              return { url: (`netflix/videos/${type}/${id}`) }
            }
        }),
    })
})

export const { useGetMoviesQuery, useSearchMoviesOrTVQuery, useGetMoreMoviesQuery, useGetShowDetailsQuery, useGetRecommendationsQuery, useGetSeasonDetailsQuery, useGetVideosQuery } = moviesApi