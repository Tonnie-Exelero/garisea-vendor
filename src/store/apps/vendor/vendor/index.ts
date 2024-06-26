// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VENDORS,
  GET_VENDORS_BY_STATUS,
  GET_FILTERED_VENDORS,
} from "@api/vendor/vendor";

// ** Others
import { Vendor } from "./types";
import { encryptData } from "@core/utils/encryption";

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
        onlineStatus: "",
        impressions: 0,
        pageOpened: 0,
        organization: {
          id: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          address2: "",
          city: "",
          country: "",
          coverImage: "",
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
    const pagination = {
      ...(vendorData.first && { first: vendorData.first }),
      ...(vendorData.last && { last: vendorData.last }),
      ...(vendorData.after && { after: vendorData.after }),
      ...(vendorData.before && { before: vendorData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_VENDORS,
        variables: {
          ...pagination,
        },
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
    const encryptedData = vendorData && encryptData(vendorData);
    const pagination = {
      ...(vendorData.first && { first: vendorData.first }),
      ...(vendorData.last && { last: vendorData.last }),
      ...(vendorData.after && { after: vendorData.after }),
      ...(vendorData.before && { before: vendorData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_VENDORS_BY_STATUS,
        variables: {
          ...(encryptedData && { pl: encryptedData }),
          ...pagination,
        },
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
    const encryptedData = vendorData && encryptData(vendorData);
    const pagination = {
      ...(vendorData.first && { first: vendorData.first }),
      ...(vendorData.last && { last: vendorData.last }),
      ...(vendorData.after && { after: vendorData.after }),
      ...(vendorData.before && { before: vendorData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_VENDORS,
        variables: {
          ...(encryptedData && { pl: encryptedData }),
          ...pagination,
        },
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
      });
  },
});

export default appVendorsSlice.reducer;
