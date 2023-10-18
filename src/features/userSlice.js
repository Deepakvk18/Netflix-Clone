import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState :{
    plan: null,
    userId: null,
    idToken: null,
    email: null,
    profiles: null,
    currentProfile: null,
    likes: [],
    myList: [],
    nowWatching: []
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action)=>{
      const { email, userId, idToken, plan, user } = action.payload
      state.email = email
      state.userId = userId
      state.user = user
      state.idToken = idToken
      state.plan = plan
      localStorage.setItem('userId', userId)
    },
    logout: (state)=>{
      state.user = null
      state.email = null
      state.userId = null
      state.idToken = null
      state.profiles = null
      state.currentProfile = null
      state.likes = []
      state.myList = []
      state.nowWatching = []
      localStorage.removeItem('userId')
    },
    addToMyList: (state, action)=>{
      const { movie } = action.payload
      if (state.myList.includes(movie)){
        state.myList = state.myList.filter(item => item.id !== movie.id)
      }else{
        state.myList.push(movie)
      }
    },
    addToLikes: (state, action)=>{
      const { movie } = action.payload
      if (state.likes.includes(movie)){
        state.likes = state.likes.filter(item => item.id !== movie.id)
      } else{
        state.likes.push(movie)
      }
    },
    addToNowWatching: (state, action)=>{
      const { movie } = action.payload
      if (state.nowWatching.includes(movie)){
        state.nowWatching = state.nowWatching.filter(item => item.id !== movie.id)
      } else{
        state.nowWatching.push(movie)
      }
    },
    setProfiles: (state, action)=>{
      const { profiles } = action.payload
      state.profiles = profiles
    },
    deleteFromProfiles: (state, action)=>{
      const { profile } = action.payload
      state.profiles = state.profiles.filter(item => item.id !== profile.id)
    },
    updateProfiles: (state, action)=>{
      const { profile } = action.payload
      if (state.profiles.filter(p=>p.name==profile.name)){ return }
      if (profile.name === 'Children') return
      state.profiles = state.profiles.map(item => {
        if(item.id === profile.id){
          return profile
        }
        return item
      })
    },
    addProfile: (state, action)=>{
      const { profile } = action.payload
      if (state.profiles.length >= 5){ return }
      if (state.profiles.filter(p=>p.name==profile.name)){ return }
      if (profile.name === 'Children') return
      state.profiles.push(profile)
    },
    setCurrentProfile: (state, action)=>{
      const { profile } = action.payload
      state.currentProfile = profile
    },
    setMyList: (state, action)=>{
      const { myList } = action.payload
      state.myList = myList
    },
    setLikes: (state, action)=>{
      const { likes } = action.payload
      state.likes = likes
    },
    setNowWatching: (state, action)=>{
      const { nowWatching } = action.payload
      state.nowWatching = nowWatching
    }
  },
});




export const selectUserId = (state) => state.user.userId;
export const selectUser = (state) => state.user.user;
export const selectPlan = (state) => state.user.plan;
export const selectEmail  = (state) => state.user.email;
export const selectProfiles  = (state) => state.user.profiles;
export const selectCurrentProfile = (state) => state.user.currentProfile;
export const selectNowWatching = (state) => state.user.nowWatching;
export const selectLikes  = (state) => state.user.likes;
export const selectMyList  = (state) => state.user.myList;

export const { login, logout, addToMyList, addToLikes, addProfile, removeCurrentProfile, setCurrentProfile, setLikes, setProfiles, deleteFromProfiles, updateProfiles, setNowWatching, setMyList, addToNowWatching } = userSlice.actions;

export default userSlice.reducer;
