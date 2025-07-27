import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AllUser:[], // Initial value
};

const AllUser = createSlice({
  name: 'allUser',
  initialState,
  reducers: {
    setAllUser: (state, action) => {
      state.AllUser = action.payload; // Assuming payload contains true/false
    },
    
  },
});

export const { setAllUser } = AllUser.actions;
export default AllUser.reducer;
