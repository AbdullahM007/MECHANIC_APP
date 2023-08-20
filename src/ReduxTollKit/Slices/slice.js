import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userToken: false,
  value: 0,
  userId: 0,
  locationaccess: true,
  lat: 0,
  lon: 0,
  location: {lat: 0, lon: 0},
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    setLocationaccess: (state, action) => {
      state.locationaccess = action.payload;
    },
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
    setLAtitude: (state, action) => {
      state.lat = action.payload;
    },
    setLongitude: (state, action) => {
      state.lon = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLAtitude,
  setLongitude,
  increment,
  decrement,
  incrementByAmount,
  setLocation,
  setLocationaccess,
  setToken,
  setUserId,
} = counterSlice.actions;

export default counterSlice.reducer;
