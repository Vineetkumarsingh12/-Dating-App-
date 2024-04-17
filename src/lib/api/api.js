import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


 const baseUrl = process.env.BASE_URL;

 console.log("baseUrl",baseUrl);

if (!baseUrl) {
  throw new Error("BASE_URL environment variable is not defined");
}

const getmyChat =  createApi({
  reducerPath: 'getmyChat',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["Chat","User"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/getMyChats",
        credentials: "same-origin",
          }),
      providesTags: ["Chat"],
    }),
    serachUser:builder.query({
      query: (name) => ({
      url: `user/serachUsers?name=${name}`,
      credentials: "same-origin",
    }),
    providesTags: ["User"],
  }),

     sendFriendRequest:builder.mutation({
      query: (data) => ({
        url: `user/sendRequest`,
        method: "PUT",
        credentials: "same-origin",
        body:data,
      }),
      invalidatesTags: ["User"],
    }),

    getNotifications:builder.query({
      query: () => ({
        url: `user/getAllNotification`,
        credentials: "same-origin",
      }),
    keepUnusedDataFor: 0,// do not do cache
    }),


    acceptFriendRequest:builder.mutation({
      query: (data) => ({
        url: `user/acceptRequest`,
        method: "PUT",
        credentials: "same-origin",
        body:data,
      }),
      invalidatesTags: ["Chat"],
    }),

  })
});

// Export the API and its associated query hook
export default getmyChat;
export const { useMyChatsQuery,useLazySerachUserQuery,useSendFriendRequestMutation,
useGetNotificationsQuery,
useAcceptFriendRequestMutation
 } = getmyChat;
