import { ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUserDetails: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/adduser`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/allusers`,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        getAllAgents: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/allagents`,
            }),
            providesTags: ['Agent'],
            keepUnusedDataFor: 5,
        }),
        sendMails: builder.mutation({
            query: ({ subject, message }) => ({
                url: `${ADMIN_URL}/announcements`,
                method: "POST",
                body: { subject, message },
            }),
            invalidatesTags: ['Admin']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${ADMIN_URL}/deleteuser/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        acceptAgent: builder.mutation({
            query: (agentId) => ({
                url: `${ADMIN_URL}/acceptagent/${agentId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Agent']
        }),
        rejectAgent: builder.mutation({
            query: (agentId) => ({
                url: `${ADMIN_URL}/rejectagent/${agentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Agent'],
        }),
        
        blockAgent: builder.mutation({
            query: (agentId) => ({
                url: `${ADMIN_URL}/blockagent/${agentId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Agent']
        }),
        unblockAgent: builder.mutation({
            query: (agentId) => ({
                url: `${ADMIN_URL}/unblockagent/${agentId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Agent']
        }),
        editUserDetails: builder.mutation({
            query: ({ userId, data }) => ({
                url: `${ADMIN_URL}/editProfile/${userId}`,
                method: 'PUT',
                body: data
            }),
            invalidateTags: ['User']
        }),
    })
});

export const {
    useAddUserDetailsMutation,
    useGetAllUsersQuery,
    useGetAllAgentsQuery,
    useSendMailsMutation,
    useDeleteUserMutation,
    useAcceptAgentMutation,
    useRejectAgentMutation,
    useBlockAgentMutation,
    useUnblockAgentMutation,
    useEditUserDetailsMutation
} = adminApiSlice;
