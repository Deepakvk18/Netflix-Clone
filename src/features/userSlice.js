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
    dislikes: [],
    myList: [],
    nowWatching: []
  },
  reducers: {
    login: (state, action)=>{
      const { email, userId, idToken, plan, user, refreshToken } = action.payload
      state.email = email
      state.userId = userId
      state.user = user
      state.idToken = idToken
      state.plan = plan
      localStorage.setItem('userId', userId)
      localStorage.setItem('refreshToken', refreshToken)
    },
    logout: (state)=>{
      state = undefined
      localStorage.clear()
    },
    addToMyList: (state, action)=>{
      const { showId } = action.payload
      if (state.myList.includes(showId)){
        state.myList = state.myList.filter(item => item !== showId)
      }else{
        state.myList.push(showId)
      }
    },
    addToLikes: (state, action)=>{
      const { showId } = action.payload
      if (state.likes.includes(showId)){
        state.likes = state.likes.filter(item => item !== showId)
      } else{
        state.likes.push(showId)
      }
    },
    addToDislikes: (state, action)=>{
      const { showId } = action.payload
      if (state.dislikes.includes(showId)){
        state.dislikes = state.dislikes.filter(item => item !== showId)
      } else{
        state.dislikes.push(showId)
      }
    },
    addToNowWatching: (state, action)=>{
      const { showId } = action.payload
      if (state.nowWatching.includes(showId)){ return }
      state.nowWatching.push(showId)
    },
    removeFromNowWatching: (state, action)=>{
      const { showId } = action.payload
      state.nowWatching = state.nowWatching.filter(item => item !== showId)
    },
    setProfiles: (state, action)=>{
      const { profiles } = action.payload
      state.profiles = profiles
    },
    deleteFromProfiles: (state, action)=>{
      const { profile } = action.payload
      if (profile.name === 'Children') return
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
    setDislikes: (state, action)=>{
      const { dislikes } = action.payload
      state.dislikes = dislikes
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
export const selectDisLikes  = (state) => state.user.dislikes;
export const selectMyList  = (state) => state.user.myList;

export const { login, logout, addToMyList, addToLikes, addProfile, removeCurrentProfile, setCurrentProfile, setLikes, setProfiles, deleteFromProfiles, updateProfiles, setNowWatching, setMyList, addToNowWatching, addToDislikes, setDislikes, removeFromNowWatching } = userSlice.actions;

export default userSlice.reducer;
