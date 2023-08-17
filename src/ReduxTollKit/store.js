import {configureStore} from '@reduxjs/toolkit';
import {stepneyApi} from './Stepney/stepney';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {stepneyUserDetailsApi} from './Stepney/stepneyUser';
import counterReducer from './Slices/slice';
export const store = configureStore({
  reducer: {
    useData: counterReducer,

    // Add the generated reducer as a specific top-level slice
    [stepneyApi.reducerPath]: stepneyApi.reducer,
    [stepneyUserDetailsApi.reducerPath]: stepneyUserDetailsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      stepneyApi.middleware,
      stepneyUserDetailsApi.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
