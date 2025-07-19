import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenDropDown: true, // Initial value
};

const counterSlice = createSlice({
  name: ' ',
  initialState,
  reducers: {
    setIsOpenDropDown: (state, action) => {
      state.isOpenDropDown = action.payload; // Assuming payload contains true/false
    },
  },
});

export const { setIsOpenDropDown } = counterSlice.actions;
export default counterSlice.reducer;
