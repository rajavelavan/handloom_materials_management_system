import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: [],
    selectedData: null,
    error: null,
    loading: false,
  },
  reducers: {
    getData: (state, action)=> {
        state.userData = action.payload;
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload; 
    },
  }
});

export const {getData, setSelectedData} = userSlice.actions;
export default userSlice.reducer;
