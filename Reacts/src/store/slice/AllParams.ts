import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
  AllParams:[], // Initial value
};

const DataSlice = createSlice({
  name: ' ',
  initialState,
  reducers: {
    SetAllParams: (state, action) => {
      state.AllParams = action.payload; // Assuming payload contains true/false
    },
    
  },
});

export const { SetAllParams } = DataSlice.actions;
export default DataSlice.reducer;
