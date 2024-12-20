import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    salesData: [],
    selectedData: null,
    error: null,
    loading: false
  },
  reducers: {
    getData: (state, action) => {
      state.salesData = action.payload;
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload; 
    },
  },
});

export const { getData, setSelectedData} = salesSlice.actions;
export default salesSlice.reducer;
