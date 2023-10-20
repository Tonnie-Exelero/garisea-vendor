// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_MESSAGES } from "@api/shared/adminVendorMessage";

// ** Others
import { AdminVendorMessage } from "./types";

// Initial state.
const adminVendorMessagesInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        user: {
          id: "",
        },
        vendor: {
          id: "",
        },
        senderId: "",
        type: "",
        message: "",
        timeSent: "",
        isSent: false,
        isSeen: false,
      },
    },
  ],
  pageInfo: {
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
  },
  totalCount: 0,
};

interface AdminVendorMessagesState {
  edges: {
    cursor: string;
    node: AdminVendorMessage;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch AdminVendorMessages
export const fetchAdminVendorMessages = createAsyncThunk<
  AdminVendorMessage,
  any,
  {}
>(
  "appAdminVendorMessages/fetchAdminVendorMessages",
  async (adminVendorMessageData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_MESSAGES,
        variables: adminVendorMessageData,
      });

      return data;
    } catch (err) {
      let error: any = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Fetch More AdminVendorMessages
export const fetchMoreAdminVendorMessages = createAsyncThunk<
  AdminVendorMessage,
  any,
  {}
>(
  "appAdminVendorMessages/fetchMoreAdminVendorMessages",
  async (adminVendorMessageData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_MESSAGES,
        variables: adminVendorMessageData,
      });

      return data;
    } catch (err) {
      let error: any = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const appAdminVendorMessagesSlice = createSlice({
  name: "appAdminVendorMessages",
  initialState: {
    adminVendorMessages: <AdminVendorMessagesState>{
      ...adminVendorMessagesInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminVendorMessages.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchAdminVendorMessages.fulfilled, (state, { payload }) => {
        // Reset state.
        state.adminVendorMessages = { ...adminVendorMessagesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { adminVendorMessages }: any = payload;
        state.adminVendorMessages = adminVendorMessages;
      })
      .addCase(fetchAdminVendorMessages.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchMoreAdminVendorMessages.fulfilled, (state, { payload }) => {
        const { adminVendorMessages }: any = payload;

        state.adminVendorMessages.edges = [
          ...adminVendorMessages.edges,
          ...state.adminVendorMessages.edges,
        ];

        state.adminVendorMessages.pageInfo = adminVendorMessages.pageInfo;
      });
  },
});

export default appAdminVendorMessagesSlice.reducer;
