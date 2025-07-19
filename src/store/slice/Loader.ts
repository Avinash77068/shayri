import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loader:false, // Initial value
};

const Loader = createSlice({
  name: ' ',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload; // Assuming payload contains true/false
    },
    
  },
});

export const { setLoader } = Loader.actions;
export default Loader.reducer;
