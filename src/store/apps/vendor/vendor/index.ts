// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VENDORS,
  GET_VENDORS_BY_STATUS,
  GET_FILTERED_VENDORS,
  CREATE_VENDOR,
  UPDATE_VENDOR,
  UPDATE_PASSWORD,
  UPDATE_EMAIL_VERIFIED,
  DELETE_VENDOR,
  UPDATE_ADDED_ORGANIZATION,
} from "@api/vendor/vendor";

// ** Others
import { Vendor } from "./types";
import { generateRandomString } from "@utils/random-string";

// Initial state
const vendorsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        image: "",
        storeLink: "",
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

interface VendorsState {
  edges: {
    cursor: string;
    node: Partial<Vendor>;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Vendors
export const fetchVendors = createAsyncThunk<Vendor, any, {}>(
  "appVendors/fetchVendors",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VENDORS,
        variables: vendorData,
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

// ** Fetch Vendors By Status
export const fetchVendorsByStatus = createAsyncThunk<Vendor, any, {}>(
  "appVendors/fetchVendorsByStatus",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VENDORS_BY_STATUS,
        variables: vendorData,
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

// ** Fetch Filtered Vendors
export const fetchFilteredVendors = createAsyncThunk<Vendor, any, {}>(
  "appVendors/fetchFilteredVendors",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_VENDORS,
        variables: vendorData,
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

// ** Create Vendor
export const addVendor = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendors/addVendor",
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
  "appVendors/editVendor",
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
  "appVendors/editPassword",
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

// ** Update Email Verified
export const editEmailVerified = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendors/editEmailVerified",
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

// ** Update Added Organization
export const editAddedOrganization = createAsyncThunk<Vendor, any, {}>(
  "appVendors/editAddedOrganization",
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

export const appVendorsSlice = createSlice({
  name: "appVendors",
  initialState: {
    vendors: <VendorsState>{
      ...vendorsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVendors.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendors = { ...vendorsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendors }: any = payload;
        state.vendors = vendors;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredVendors.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendors = { ...vendorsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorsFiltered }: any = payload;
        state.vendors = vendorsFiltered;
      })
      .addCase(fetchVendorsByStatus.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendors = { ...vendorsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorsByStatus }: any = payload;
        state.vendors = vendorsByStatus;
      })
      .addCase(addVendor.fulfilled, (state, { payload }) => {
        const { createVendor }: any = payload;

        const newVendor = {
          cursor: generateRandomString(12),
          node: { ...createVendor },
        };
        state.vendors && state.vendors.edges.push(newVendor);
      })
      .addCase(editVendor.fulfilled, (state, { payload }) => {
        const { updateVendor }: any = payload;
        const { id, ...rest } = updateVendor;

        state.vendors.edges.map((vendor) => {
          if (vendor.node.id === updateVendor.id) {
            return {
              ...vendor,
              node: {
                ...vendor.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        const { updateVendorPassword }: any = payload;
        const { id, ...rest } = updateVendorPassword;

        state.vendors.edges.map((vendor) => {
          if (vendor.node.id === updateVendorPassword.id) {
            return {
              ...vendor,
              node: {
                ...vendor.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(editEmailVerified.fulfilled, (state, { payload }) => {
        const { updateVendorEmailVerified }: any = payload;

        state.vendors = { ...state.vendors, ...updateVendorEmailVerified };
      })
      .addCase(editAddedOrganization.fulfilled, (state, { payload }) => {
        const { updateVendorAddedOrganization }: any = payload;

        state.vendors = { ...state.vendors, ...updateVendorAddedOrganization };
      })
      .addCase(removeVendor.fulfilled, (state, { payload }) => {
        const { deleteVendor }: any = payload;

        if (
          state.vendors.edges.some(
            (vendor) => vendor.node.id === deleteVendor.id
          )
        ) {
          state.vendors.edges.filter(
            (vendor) => vendor.node.id !== deleteVendor.id
          );
        }
      });
  },
});

export default appVendorsSlice.reducer;
