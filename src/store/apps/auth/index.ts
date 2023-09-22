// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  UPDATE_VENDOR,
  UPDATE_PASSWORD,
  UPDATE_IMAGE,
  DELETE_VENDOR,
} from "@api/vendor/vendor";
import { VENDOR_LOGIN } from "@src/api/vendor/auth";

// ** Others
import { Vendor } from "../vendor/vendor/types";

// ** Vendor initial state
const vendorInitialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  image: "",
  language: "",
  status: "",
  address: "",
  city: "",
  country: "",
  emailVerified: "",
  addedOrganization: "",
  organization: {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    country: "",
    logo: "",
    certificate: "",
  },
};

// ** Login Vendor
export const signIn = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appAuth/signIn",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: VENDOR_LOGIN,
        variables: { ...vendorData },
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

// ** Update Vendor
export const editVendor = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "authedVendor/editVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VENDOR,
        variables: { ...vendorData },
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

// ** Update Password
export const editPassword = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "authedVendor/editPassword",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PASSWORD,
        variables: { ...vendorData },
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

// ** Update Image
export const editImage = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "authedVendor/editImage",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_IMAGE,
        variables: { ...vendorData },
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

// ** Delete Vendor
export const removeVendor = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendors/removeVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_VENDOR,
        variables: { id: vendorData.id },
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

export const authedVendorSlice = createSlice({
  name: "authedVendor",
  initialState: {
    authedVendor: <Vendor>{
      ...vendorInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const { loginVendor }: any = payload;

        if (state.loading === "pending") {
          state.loading = "";
          state.authedVendor = loginVendor;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(editVendor.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.authedVendor = { ...vendorInitialState };

        const { updateVendor }: any = payload;

        state.authedVendor = { ...updateVendor };
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.authedVendor = { ...vendorInitialState };

        const { updatePassword }: any = payload;

        state.authedVendor = { ...updatePassword };
      })
      .addCase(editImage.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.authedVendor = { ...vendorInitialState };

        const { updateVendorImage }: any = payload;

        state.authedVendor = { ...updateVendorImage };
      })
      .addCase(removeVendor.fulfilled, (state, { payload }) => {
        const { deleteVendor }: any = payload;
      });
  },
});

export default authedVendorSlice.reducer;
