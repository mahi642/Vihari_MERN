import { AGENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const agentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Buses CRUD operations
        addBusDetails: builder.mutation({
            query: (data) => ({
                url: `${AGENT_URL}/addbus`,
                method: 'POST',
                body: data
            }),
            invalidateTags: ['Bus']
        }),
        editBusDetails: builder.mutation({
            query: ({ busId, data }) => ({
                url: `${AGENT_URL}/editbus/${busId}`,
                method: 'PUT',
                body: data
            }),
            invalidateTags: ['Bus']
        }),
        getAllBuses: builder.query({
            query: () => ({
                url: `${AGENT_URL}/allbuses`,
            }),
            providesTags: ['Bus'],
            keepUnusedDataFor: 5,
        }),
        getBus: builder.query({
            query: (id) => ({
                url: `${AGENT_URL}/getbus/${id}`,
            }),
            providesTags: ['Bus'],
            keepUnusedDataFor: 5,
        }),
        deleteBus: builder.mutation({
            query: (busId) => ({
                url: `${AGENT_URL}/deletebus/${busId}`,
                method: 'DELETE',
            }),
            invalidateTags: ['Bus']
        }),
        getAgentBuses: builder.query({
            query: (agentId) => ({
                url: `${AGENT_URL}/agentbuses/${agentId}`
            }),
            providesTags: ['Bus'],
            keepUnusedDataFor: 5,
        }),

        
        addTourDetails: builder.mutation({
            query: (data) => ({
                url: `${AGENT_URL}/addtour`,
                method: 'POST',
                body: data
            }),
            invalidateTags: ['Tour']
        }),
        editTourDetails: builder.mutation({
            query: ({ tourId, data }) => ({
                url: `${AGENT_URL}/edittour/${tourId}`,
                method: 'PUT',
                body: data
            }),
            invalidateTags: ['Tour']
        }),
        getAllTours: builder.query({
            query: () => ({
                url: `${AGENT_URL}/alltours`,
            }),
            providesTags: ['Tour'],
            keepUnusedDataFor: 5,
        }),
        getTour: builder.query({
            query: (id) => ({
                url: `${AGENT_URL}/gettour/${id}`,
            }),
            providesTags: ['Tour'],
            keepUnusedDataFor: 5,
        }),
        deleteTour: builder.mutation({
            query: (tourId) => ({
                url: `${AGENT_URL}/deletetour/${tourId}`,
                method: 'DELETE',
            }),
            invalidateTags: ['Tour']
        }),
        getAgentTours: builder.query({
            query: (agentId) => ({
                url: `${AGENT_URL}/agenttours/${agentId}`
            }),
            providesTags: ['Tour'],
            keepUnusedDataFor: 5,
        }),

        addPlaceDetails: builder.mutation({
            query: ({tourId,data}) => ({
                url: `${AGENT_URL}/addplace/${tourId}`,
                method: 'POST',
                body: data
            }),
            invalidateTags: ['Place']
        }),
        editPlaceDetails: builder.mutation({
            query: ({ placeId, data }) => ({
                url: `${AGENT_URL}/editplace/${placeId}`,
                method: 'PUT',
                body: data
            }),
            invalidateTags: ['Place']
        }),
    
        deletePlace: builder.mutation({
            query: (placeId) => ({
                url: `${AGENT_URL}/deleteplace/${placeId}`,
                method: 'DELETE',
            }),
            invalidateTags: ['Place']
        }),
        getTourPlaces: builder.query({
            query: (tourId) => ({
                url: `${AGENT_URL}/tourplaces/${tourId}`
            }),
            providesTags: ['Place'],
            keepUnusedDataFor: 5,
        }),
        getAgentProfile: builder.query({
            query: (agentId) => ({
                url: `${AGENT_URL}/agentProfile/${agentId}`
            }),
            providesTags: ['Place'],
            keepUnusedDataFor: 5,
        }),

        editAgentDetails: builder.mutation({
            query: ({ agentId, data }) => ({
                url: `${AGENT_URL}/editProfile/${agentId}`,
                method: 'PUT',
                body: data
            }),
            invalidateTags: ['Place']
        }),

        createAgent : builder.mutation({
            query: (formData) => ({
                url: `/agentSignUp`,
                method: 'POST',
                body: formData
            }),
            invalidateTags: ['Agent']
        }),

    })
});

export const {
    useAddBusDetailsMutation,
    useEditBusDetailsMutation,
    useGetAllBusesQuery,
    useGetBusQuery,
    useDeleteBusMutation,
    useGetAgentBusesQuery,
    useAddTourDetailsMutation,
    useEditTourDetailsMutation,
    useGetAllToursQuery,
    useGetTourQuery,
    useDeleteTourMutation,
    useGetAgentToursQuery,
    useAddPlaceDetailsMutation,
    useEditPlaceDetailsMutation,
    useDeletePlaceMutation,
    useGetTourPlacesQuery,
    useGetAgentProfileQuery,
    useEditAgentDetailsMutation,
    useCreateAgentMutation
} = agentApiSlice;
