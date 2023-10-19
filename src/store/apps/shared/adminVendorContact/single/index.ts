// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from "@api/shared/adminVendorContact";

// ** Others
import { AdminVendorContact } from "../types";

// Initial state.
const adminVendorContactInitialState = {
  id: "",
  user: {
    id: "",
    firstName: "",
    lastName: "",
    image: "",
    onlineStatus: "",
  },
  vendor: {
    id: "",
    firstName: "",
    lastName: "",
    image: "",
    onlineStatus: "",
  },
  latestMessageTime: "",
};

// ** Create AdminVendorContact
export const addAdminVendorContact = createAsyncThunk<
  AdminVendorContact,
  any,
  {}
>(
  "appAdminVendorContact/addAdminVendorContact",
  async (adminVendorContactData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CONTACT,
        variables: { ...adminVendorContactData },
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

// ** Update AdminVendorContact
export const editAdminVendorContact = createAsyncThunk<
  AdminVendorContact,
  any,
  {}
>(
  "appAdminVendorContact/editAdminVendorContact",
  async (adminVendorContactData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CONTACT,
        variables: { ...adminVendorContactData },
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

// ** Delete AdminVendorContact
export const removeAdminVendorContact = createAsyncThunk<
  AdminVendorContact,
  Partial<AdminVendorContact>,
  {}
>(
  "appAdminVendorContact/removeAdminVendorContact",
  async (adminVendorContactData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_CONTACT,
        variables: { id: adminVendorContactData.id },
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

export const appAdminVendorContactSlice = createSlice({
  name: "appAdminVendorContact",
  initialState: {
    adminVendorContact: <AdminVendorContact>{
      ...adminVendorContactInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdminVendorContact.fulfilled, (state, { payload }) => {
        // Reset adminVendorContact state.
        state.adminVendorContact = { ...adminVendorContactInitialState };

        const { createAdminVendorContact }: any = payload;

        state.adminVendorContact = { ...createAdminVendorContact };
      })
      .addCase(editAdminVendorContact.fulfilled, (state, { payload }) => {
        // Reset adminVendorContact state.
        state.adminVendorContact = { ...adminVendorContactInitialState };

        const { updateAdminVendorContact }: any = payload;

        state.adminVendorContact = { ...updateAdminVendorContact };
      })
      .addCase(removeAdminVendorContact.fulfilled, (state, { payload }) => {
        const { deleteAdminVendorContact }: any = payload;
      });
  },
});

export default appAdminVendorContactSlice.reducer;
