// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VENDOR_BY_ID,
  GET_VENDOR_BY_EMAIL,
  CREATE_VENDOR,
  UPDATE_VENDOR,
  UPDATE_PASSWORD,
  UPDATE_EMAIL_VERIFIED,
  UPDATE_ADDED_ORGANIZATION,
  UPDATE_VENDOR_STATUS,
  UPDATE_VENDOR_IDENTIFICATION,
  UPDATE_VENDOR_VERIFIED,
  DELETE_VENDOR,
} from "@api/vendor/vendor";

// ** Others
import { Vendor } from "../types";

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
  storeLink: "",
  language: "",
  status: "",
  address: "",
  city: "",
  country: "",
  emailVerified: "",
  vendorVerified: "",
  addedOrganization: "",
  identification: "",
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

// ** Fetch Vendor By ID
export const fetchVendorById = createAsyncThunk<Vendor, { id: string }, {}>(
  "appVendor/fetchVendorById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VENDOR_BY_ID,
        variables: { ...id },
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

// ** Fetch Vendor By Email
export const fetchVendorByEmail = createAsyncThunk<
  Vendor,
  { email: string },
  {}
>("appVendor/fetchVendorByEmail", async (email, { rejectWithValue }) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_VENDOR_BY_EMAIL,
      variables: { ...email },
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
});

// ** Create Vendor
export const addVendor = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendor/addVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_VENDOR,
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
  "appVendor/editVendor",
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
  "appVendor/editPassword",
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

// ** Update Status
export const editStatus = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendor/editStatus",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VENDOR_STATUS,
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

// ** Update Identification
export const editIdentification = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendor/editIdentification",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VENDOR_IDENTIFICATION,
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

// ** Update Email Verified
export const editEmailVerified = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendor/editEmailVerified",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_EMAIL_VERIFIED,
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

// ** Update Vendor Verified
export const editVendorVerified = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendor/editVendorVerified",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VENDOR_VERIFIED,
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

// ** Update Added Organization
export const editAddedOrganization = createAsyncThunk<Vendor, any, {}>(
  "appVendor/editAddedOrganization",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ADDED_ORGANIZATION,
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
  "appVendor/removeVendor",
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

export const appVendorSlice = createSlice({
  name: "appVendor",
  initialState: {
    vendor: <Vendor>{
      ...vendorInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorById.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVendorById.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        if (state.loading === "pending") {
          const { vendorById }: any = payload;

          state.loading = "";
          state.vendor = vendorById;
        }
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchVendorByEmail.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        if (state.loading === "pending") {
          const { vendorByEmail }: any = payload;

          state.loading = "";
          state.vendor = vendorByEmail;
        }
      })
      .addCase(addVendor.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(addVendor.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        if (state.loading === "pending") {
          const { createVendor }: any = payload;

          state.loading = "";
          state.vendor = createVendor;
        }
      })
      .addCase(addVendor.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(editVendor.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        const { updateVendor }: any = payload;

        state.vendor = { ...updateVendor };
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        const { updatePassword }: any = payload;

        state.vendor = { ...updatePassword };
      })
      .addCase(editStatus.fulfilled, (state, { payload }) => {
        const { updateVendorStatus }: any = payload;

        state.vendor.status = updateVendorStatus.status;
      })
      .addCase(editIdentification.fulfilled, (state, { payload }) => {
        const { updateVendorIdentification }: any = payload;

        state.vendor.identification = updateVendorIdentification.identification;
      })
      .addCase(editVendorVerified.fulfilled, (state, { payload }) => {
        const { updateVendorVerified }: any = payload;

        state.vendor.vendorVerified = updateVendorVerified.vendorVerified;
      })
      .addCase(editEmailVerified.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        const { updateVendorEmailVerified }: any = payload;

        state.vendor = { ...updateVendorEmailVerified };
      })
      .addCase(editAddedOrganization.fulfilled, (state, { payload }) => {
        // Reset vendor state.
        state.vendor = { ...vendorInitialState };

        const { updateVendorAddedOrganization }: any = payload;

        state.vendor = { ...updateVendorAddedOrganization };
      })
      .addCase(removeVendor.fulfilled, (state, { payload }) => {
        const { deleteVendor }: any = payload;
      });
  },
});

export default appVendorSlice.reducer;
