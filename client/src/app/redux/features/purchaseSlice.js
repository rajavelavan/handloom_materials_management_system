import { createSlice } from '@reduxjs/toolkit';

const purchaseSlice = createSlice({
  name: 'purchases',
  initialState: {
    purchaseData: [],
    selectedData: null,
    error: null,
    loading: false
  },
  reducers: {
    getData: (state, action) => {
      state.purchaseData = action.payload;
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload; 
    },
  },
});

export const { getData, setSelectedData} = purchaseSlice.actions;
export default purchaseSlice.reducer;
