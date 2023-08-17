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
    updateUserProfile: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        console.log('ERRRODATE', body);
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
      query: ({body}) => {
        console.log('ERRRODATE', body);
        return {
          url: `/resetpassword/`,
          method: 'POST',
          body: body,
          // headers: {'Content-Type': 'application/json'},
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
        };
      },
    }),
    getAllMechanics: builder.query({
      query: () => `/findmechanics/${'Gujrat'}`,
    }),
    getAllFeedBack: builder.query({
      query: ({id}) => `/feedbacks/${id}`,
    }),
    getUserProfile: builder.query({
      query: () => `/profile/`,
    }),
    getallOrders: builder.query({
      query: () => `/orders/`,
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
  useGetallOrdersQuery,
} = stepneyUserDetailsApi;
