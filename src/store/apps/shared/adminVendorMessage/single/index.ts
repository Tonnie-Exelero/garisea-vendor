// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_SEEN,
  DELETE_MESSAGE,
} from "@api/shared/adminVendorMessage";

// ** Others
import { AdminVendorMessage } from "../types";

// Initial state.
const adminVendorMessageInitialState = {
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
};

// ** Create AdminVendorMessage
export const addAdminVendorMessage = createAsyncThunk<
  AdminVendorMessage,
  any,
  {}
>(
  "appAdminVendorMessage/addAdminVendorMessage",
  async (adminVendorMessageData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MESSAGE,
        variables: { ...adminVendorMessageData },
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

// ** Update AdminVendorMessage
export const editAdminVendorMessage = createAsyncThunk<
  AdminVendorMessage,
  any,
  {}
>(
  "appAdminVendorMessage/editAdminVendorMessage",
  async (adminVendorMessageData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MESSAGE,
        variables: { ...adminVendorMessageData },
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

// ** Update AdminVendorMessageSeen
export const editAdminVendorMessageSeen = createAsyncThunk<
  AdminVendorMessage,
  any,
  {}
>(
  "appAdminVendorMessage/editAdminVendorMessageSeen",
  async (adminVendorMessageData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MESSAGE_SEEN,
        variables: { ...adminVendorMessageData },
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

// ** Delete AdminVendorMessage
export const removeAdminVendorMessage = createAsyncThunk<
  AdminVendorMessage,
  any,
  {}
>(
  "appAdminVendorMessage/removeAdminVendorMessage",
  async (adminVendorMessageData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MESSAGE,
        variables: { id: adminVendorMessageData.id },
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

export const appAdminVendorMessageSlice = createSlice({
  name: "appAdminVendorMessage",
  initialState: {
    adminVendorMessage: <AdminVendorMessage>{
      ...adminVendorMessageInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdminVendorMessage.fulfilled, (state, { payload }) => {
        // Reset adminVendorMessage state.
        state.adminVendorMessage = { ...adminVendorMessageInitialState };

        const { createAdminVendorMessage }: any = payload;

        state.adminVendorMessage = { ...createAdminVendorMessage };
      })
      .addCase(editAdminVendorMessage.fulfilled, (state, { payload }) => {
        // Reset adminVendorMessage state.
        state.adminVendorMessage = { ...adminVendorMessageInitialState };

        const { updateAdminVendorMessage }: any = payload;

        state.adminVendorMessage = { ...updateAdminVendorMessage };
      })
      .addCase(editAdminVendorMessageSeen.fulfilled, (state, { payload }) => {
        const { updateAdminVendorMessageSeen }: any = payload;

        state.adminVendorMessage.isSeen = updateAdminVendorMessageSeen.isSeen;
      })
      .addCase(removeAdminVendorMessage.fulfilled, (state, { payload }) => {
        const { deleteAdminVendorMessage }: any = payload;
      });
  },
});

export default appAdminVendorMessageSlice.reducer;
