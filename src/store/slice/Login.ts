import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginUser: null, // Store logged-in user object (null initially)
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.loginUser = action.payload; // Save user data to state
    },
    clearLoginUser: (state) => {
      state.loginUser = null; // For logout functionality
    }
  },
});

export const { setLoginUser, clearLoginUser } = DataSlice.actions;
export default DataSlice.reducer;
