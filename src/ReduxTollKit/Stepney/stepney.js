// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorageData} from '../../Async/AsyncStorage';

// Define a service using a base URL and expected endpoints
export const stepneyApi = createApi({
  reducerPath: 'stepneyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stepney.onrender.com',
    prepareHeaders: async (headers, {getState}) => {
      // Get your authentication token from state (assuming you store it in Redux)
      // const token = getState().auth.token;
      // const token = await getStorageData('userToken');

      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyOTg4OTc5LCJpYXQiOjE2OTIxMjQ5NzksImp0aSI6Ijc2NmJkOWZmZTczNTRjZTliMDgzNWI4ZWUzYjE2MWZiIiwidXNlcl9pZCI6OH0.n9dR2RN0aB1G-H2baTHSeqU8izu1i6nty-HHpf2WdyA'; // await getStorageData('userToken');
      console.log('token', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    signUpUser: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/mechanicsignup/`,
          method: 'POST',
          body: body,
        };
      },
    }),
    otpConfirmation: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/customersignup/`,
          method: 'PUT',
          body: body,
        };
      },
    }),
    userLogIn: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/mechaniclogin/`,
          method: 'POST',
          body: body,
        };
      },
    }),
    userHelpSupport: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/help/`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpUserMutation,
  useOtpConfirmationMutation,
  useUserLogInMutation,
  useUserHelpSupportMutation,
} = stepneyApi;
