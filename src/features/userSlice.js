import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState :{
    userId: null,
    idToken: null,
    email: null,
    profiles: null,
    currentProfile: null,
    likes: [],
    myList: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action)=>{
      const { email, localId, idToken } = action.payload
      state.email = email
      state.userId = localId
      state.idToken = idToken
      console.log(idToken);
      localStorage.setItem('userId', localId)
    },
    signUp: (state, action)=>{
      const { email } = action.payload
      state.email = email
    },
    logout: (state)=>{
      state.email = null
      state.userId = null
      state.profiles = null
      state.currentProfile = null
      state.likes = []
      state.myList = []
      localStorage.removeItem('userId')
    },
    addToMyList: (state, action)=>{
      const { movie } = action.payload
      state.myList.push(movie)
    },
    removeFromMyList: (state, action)=>{
      const { movie } = action.payload
      state.myList = state.myList.filter(item => item.id !== movie.id)
    },
    addToLikes: (state, action)=>{
      const { movie } = action.payload
      state.likes.push(movie)
    },
    removeFromLikes: (state, action)=>{
      const { movie } = action.payload
      state.likes = state.likes.filter(item => item.id !== movie.id)
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
      state.profiles = state.profiles.map(item => {
        if(item.id === profile.id){
          return profile
        }
        return item
      })
    },
    addProfile: (state, action)=>{
      const { profile } = action.payload
      state.profiles.push(profile)
    },
    setCurrentProfile: (state, action)=>{
      const { profile } = action.payload
      state.currentProfile = profile
    },
    removeCurrentProfile: (state)=>{
      state.currentProfile = null
    },
    setMyList: (state, action)=>{
      const { myList } = action.payload
      state.myList = myList
    },
    setLikes: (state, action)=>{
      const { likes } = action.payload
      state.likes = likes
    },
  },
});

export const { login, logout, signUp, addToMyList, removeFromMyList, addProfile, removeCurrentProfile, setCurrentProfile, setLikes, removeFromLikes,  } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.userId;
export const selectEmail  = (state) => state.user.email;
export const selectProfiles  = (state) => state.user.profiles;
export const selectCurrentProfile = (state) => state.user.currentProfile;
export const selectLikes  = (state) => state.user.likes;
export const selectMyList  = (state) => state.user.myList;


export default userSlice.reducer;
