// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import API_URL from '../APIURL/ApiUrl';
import {getStorageData} from '../../Async/AsyncStorage';
// Define a service using a base URL and expected endpoints
export const stepneyUserDetailsApi = createApi({
  reducerPath: 'stepneyUserDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, {getState}) => {
      // Get your authentication token from state (assuming you store it in Redux)
      // const token = getState().auth.token;
      const token = await getStorageData('userToken');

      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMzI1NDkyLCJpYXQiOjE2OTI0NjE0OTIsImp0aSI6IjlhODgwOWUwOWZkYjRkZmViYWMwYjQ3YWIyM2RkMjg0IiwidXNlcl9pZCI6Mn0.i4ETlKfhAU4m-A2kJ0KbGIYQsh0UnVoiN5dJMbxRDo8'; // await getStorageData('userToken');
      console.log('token', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['userData'],

  endpoints: builder => ({
    updateUserProfile: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/updatemechanicprofile/`,
          method: 'PUT',
          body: body,
          // headers: {'Content-Type': 'application/json'},
        };
      },
    }),
    forgotPassword: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        console.log('ERRRODATE', body);
        return {
          url: `/resetpassword/`,
          method: 'POST',
          body: body,
          // headers: {'Content-Type': 'application/json'},
          providesTags: ['refetchuser'],
        };
      },
    }),
    placeOrder: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        // console.log('ERRRODATE', body);
        return {
          url: `/order/`,
          method: 'POST',
          body: body,
          // headers: {'Content-Type': 'application/json'},
          providesTags: ['refetchuser'],
        };
      },
    }),
    orderResponce: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        // console.log('ERRRODATE', body);
        return {
          url: `/mechanicresponse/`,
          method: 'POST',
          body: body,
          // headers: {'Content-Type': 'application/json'},
          providesTags: ['refetchuser'],
        };
      },
    }),
    updateLocation: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        // console.log('ERRRODATE', body);
        return {
          url: `/setlocation/`,
          method: 'PUT',
          body: body,
          // headers: {'Content-Type': 'application/json'},
          providesTags: ['userData'],
        };
      },
    }),
    setDeviceToken: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        // console.log('ERRRODATE', body);
        return {
          url: `/setdevicetoken/`,
          method: 'PUT',
          body: body,
          // headers: {'Content-Type': 'application/json'},
          providesTags: ['refetchuser'],
        };
      },
    }),
    getAllMechanics: builder.query({
      query: () => `/findmechanics/${'Gujrat'}`,
      invalidatesTags: ['refetchuser'],
    }),
    getAllFeedBack: builder.query({
      query: ({id}) => `/feedbacks/${id}`,
      invalidatesTags: ['refetchuser'],
    }),
    getUserProfile: builder.query({
      query: () => `/profile/`,
      invalidatesTags: ['refetchuser'],
    }),
    getallOrders: builder.query({
      query: () => `/orders/`,
      invalidatesTags: ['refetchuser'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateUserProfileMutation,
  useGetAllMechanicsQuery,
  useGetAllFeedBackQuery,
  useForgotPasswordMutation,
  useGetUserProfileQuery,
  usePlaceOrderMutation,
  useSetDeviceTokenMutation,
  useGetallOrdersQuery,
  useOrderResponceMutation,
  useUpdateLocationMutation,
} = stepneyUserDetailsApi;
