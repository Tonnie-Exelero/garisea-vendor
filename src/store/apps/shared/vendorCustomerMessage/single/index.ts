// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_SEEN,
  DELETE_MESSAGE,
} from "@api/shared/vendorCustomerMessage";

// ** Others
import { VendorCustomerMessage } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const vendorCustomerMessageInitialState = {
  id: "",
  vendor: {
    id: "",
  },
  customer: {
    id: "",
  },
  vehicle: {
    id: "",
  },
  senderId: "",
  type: "",
  message: "",
  timeSent: "",
  isSent: false,
  isSeen: false,
};

// ** Create VendorCustomerMessage
export const addVendorCustomerMessage = createAsyncThunk<
  VendorCustomerMessage,
  any,
  {}
>(
  "appVendorCustomerMessage/addVendorCustomerMessage",
  async (vendorCustomerMessageData, { rejectWithValue }) => {
    const encryptedData = encryptData(vendorCustomerMessageData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MESSAGE,
        variables: { pl: encryptedData },
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

// ** Update VendorCustomerMessage
export const editVendorCustomerMessage = createAsyncThunk<
  VendorCustomerMessage,
  any,
  {}
>(
  "appVendorCustomerMessage/editVendorCustomerMessage",
  async (vendorCustomerMessageData, { rejectWithValue }) => {
    const encryptedData = encryptData(vendorCustomerMessageData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MESSAGE,
        variables: { pl: encryptedData },
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

// ** Update VendorCustomerMessageSeen
export const editVendorCustomerMessageSeen = createAsyncThunk<
  VendorCustomerMessage,
  any,
  {}
>(
  "appVendorCustomerMessage/editVendorCustomerMessageSeen",
  async (vendorCustomerMessageData, { rejectWithValue }) => {
    const encryptedData = encryptData(vendorCustomerMessageData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MESSAGE_SEEN,
        variables: { pl: encryptedData },
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

// ** Delete VendorCustomerMessage
export const removeVendorCustomerMessage = createAsyncThunk<
  VendorCustomerMessage,
  any,
  {}
>(
  "appVendorCustomerMessage/removeVendorCustomerMessage",
  async (vendorCustomerMessageData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: vendorCustomerMessageData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MESSAGE,
        variables: { pl: encryptedData },
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

export const appVendorCustomerMessageSlice = createSlice({
  name: "appVendorCustomerMessage",
  initialState: {
    vendorCustomerMessage: <VendorCustomerMessage>{
      ...vendorCustomerMessageInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVendorCustomerMessage.fulfilled, (state, { payload }) => {
        // Reset vendorCustomerMessage state.
        state.vendorCustomerMessage = { ...vendorCustomerMessageInitialState };

        const { createVendorCustomerMessage }: any = payload;

        state.vendorCustomerMessage = { ...createVendorCustomerMessage };
      })
      .addCase(editVendorCustomerMessage.fulfilled, (state, { payload }) => {
        // Reset vendorCustomerMessage state.
        state.vendorCustomerMessage = { ...vendorCustomerMessageInitialState };

        const { updateVendorCustomerMessage }: any = payload;

        state.vendorCustomerMessage = { ...updateVendorCustomerMessage };
      })
      .addCase(
        editVendorCustomerMessageSeen.fulfilled,
        (state, { payload }) => {
          const { updateVendorCustomerMessageSeen }: any = payload;

          state.vendorCustomerMessage.isSeen =
            updateVendorCustomerMessageSeen.isSeen;
        }
      )
      .addCase(removeVendorCustomerMessage.fulfilled, (state, { payload }) => {
        const { deleteVendorCustomerMessage }: any = payload;
      });
  },
});

export default appVendorCustomerMessageSlice.reducer;
