import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AllUser:[], // Initial value
};

const DataSlice = createSlice({
  name: ' ',
  initialState,
  reducers: {
    setAllUser: (state, action) => {
      state.AllUser = action.payload; // Assuming payload contains true/false
    },
    
  },
});

export const { setAllUser } = DataSlice.actions;
export default DataSlice.reducer;
