import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AllData:[], // Initial value
};

const DataSlice = createSlice({
  name: ' ',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.AllData = action.payload; // Assuming payload contains true/false
    },
    
  },
});

export const { setAllData } = DataSlice.actions;
export default DataSlice.reducer;
