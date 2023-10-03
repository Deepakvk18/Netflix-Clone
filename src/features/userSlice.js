import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState :{
    userId: null,
    email: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action)=>{
      const { email, localId } = action.payload
      state.email = email
      state.userId = localId
      localStorage.setItem('userId', localId)
    },
    logout: (state)=>{
      state.email = null
      state.userId = null
      localStorage.setItem('userId', null)
    }
  },
});

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.userId;
export const selectEmail  = (state) => state.email;

export default userSlice.reducer;
