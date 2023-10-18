import { apiSlice } from './apiSlice';

export const profileApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getAllProfiles: builder.query({
            query: () => ({
                url: '/profile/allProfiles'
            }),
            providesTags: ['Profile']
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: '/profile/edit',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Profile'],
        }),
        addProfile: builder.mutation({
            query: (body) => ({
                url: '/profile/add',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Profile']
        }),
        deleteProfile: builder.mutation({
            query: (profile_id) => ({
                url: `/profile/delete/${profile_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Profile'],
        }),
        migrateProfile: builder.mutation({
            query: (body) => ({
                url: '/profile/migrate',
                method: 'POST',
                body: body
            })
        }),
        updateLikes: builder.mutation({
            query: (body) => ({
                url: '/profile/like',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Ratings'],
        }),
        updateMyList: builder.mutation({
            query: (body) => ({
                url: '/profile/updateMylist',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['MyList'],
        }),
        updateNowWatching: builder.mutation({
            query: (body) => ({
                url: '/profile/updateNowWatching',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['NowWatching'],
        }),
        getNowWatching: builder.query({
            query: (profile_id) => ({
                url: `/profile/getNowWatching/${profile_id}`
            }),
            providesTags: ['NowWatching'],
            transformResponse: (response) => {
                // console.log("Now Watching", response);
                const data = response?.shows.reverse()
                // console.log("Transform", data);
                return {shows: data}
            }
        }),
        getMyList: builder.query({
            query: (profile_id) => ({
                url: `/profile/getMyList/${profile_id}`
            }),
            providesTags: ['MyList'],
            transformResponse: (response) => {
                const data = response?.shows.reverse()
                // console.log("Transform", data);
                return {shows: data}
            }
        }),
        getRatings: builder.query({
            query: (profile_id) => ({
                url: `/profile/getRatings/${profile_id}`
            }),
            providesTags: ['Ratings']
        }),
        getNextEpisode: builder.mutation({
            query: (trackingId) => ({
                url: `/profile/getNextEpisode/${trackingId}`,
                method: 'PUT',
            })
        }),
        getCurrentEpisode: builder.mutation({
            query: (body) => ({
                url: `/profile/getCurrentEpisode`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['NowWatching'],
        }),
        getProfileRecommendations: builder.query({
            query: (profileId) => ({
                url: `/profile/getRecommendations/${profileId}`
            }),
        }),
        setCurrentEpisode: builder.mutation({
            query: (body) => ({
                url: `/profile/setCurrentEpisode`,
                method: 'PUT',
                body: body
            })
        }),
        getMyListIds: builder.query({  
            query: (profile_id) => ({
                url: `/profile/getmlids/${profile_id}`
            }),
            providesTags: ['MyList']
        }),
        getNowWatchingIds: builder.query({  
            query: (profile_id) => ({
                url: `/profile/getnwids/${profile_id}`
            }),
            providesTags: ['NowWatching']
        }),

    })
})

export const { useAddProfileMutation,
                useDeleteProfileMutation,
                useEditProfileMutation,
                useGetAllProfilesQuery,
                useGetMyListQuery,
                useGetNowWatchingQuery,
                useGetRatingsQuery,
                useUpdateLikesMutation,
                useUpdateMyListMutation,
                useUpdateNowWatchingMutation,
                useMigrateProfileMutation,
                useGetCurrentEpisodeMutation,
                useGetNextEpisodeMutation,
                useGetProfileRecommendationsQuery,
                useSetCurrentEpisodeMutation,
                useGetNowWatchingIdsQuery,
                useGetMyListIdsQuery } = profileApi