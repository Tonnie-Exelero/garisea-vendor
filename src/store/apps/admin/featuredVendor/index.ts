// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_FEATURED_VENDORS,
  GET_FILTERED_FEATURED_VENDORS,
} from "@api/admin/featuredVendor";

// ** Others
import { FeaturedVendor } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const featuredVendorsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        status: "",
        vendor: {
          id: "",
          storeLink: "",
          vendorVerified: "",
          organization: {
            id: "",
            name: "",
            nicename: "",
            email: "",
            phone: "",
            address: "",
            address2: "",
            city: "",
            country: "",
            logo: "",
          },
        },
        image: "",
        text: "",
        page: "",
        position: "",
        rank: 0,
        impressions: 0,
        clicks: 0,
        targetImpressions: 0,
        targetClicks: 0,
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

interface FeaturedVendorsState {
  edges: {
    cursor: string;
    node: FeaturedVendor;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch FeaturedVendors
export const fetchFeaturedVendors = createAsyncThunk<FeaturedVendor, any, {}>(
  "appFeaturedVendors/fetchFeaturedVendors",
  async (featuredVendorData, { rejectWithValue }) => {
    const encryptedData = featuredVendorData && encryptData(featuredVendorData);
    const pagination = {
      ...(featuredVendorData.first && { first: featuredVendorData.first }),
      ...(featuredVendorData.last && { last: featuredVendorData.last }),
      ...(featuredVendorData.after && { after: featuredVendorData.after }),
      ...(featuredVendorData.before && { before: featuredVendorData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FEATURED_VENDORS,
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

// ** Fetch Filtered FeaturedVendors
export const fetchFilteredFeaturedVendors = createAsyncThunk<
  FeaturedVendor,
  any,
  {}
>(
  "appFeaturedVendors/fetchFilteredFeaturedVendors",
  async (featuredVendorData, { rejectWithValue }) => {
    const encryptedData = featuredVendorData && encryptData(featuredVendorData);
    const pagination = {
      ...(featuredVendorData.first && { first: featuredVendorData.first }),
      ...(featuredVendorData.last && { last: featuredVendorData.last }),
      ...(featuredVendorData.after && { after: featuredVendorData.after }),
      ...(featuredVendorData.before && { before: featuredVendorData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_FEATURED_VENDORS,
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

export const appFeaturedVendorsSlice = createSlice({
  name: "appFeaturedVendors",
  initialState: {
    featuredVendors: <FeaturedVendorsState>{
      ...featuredVendorsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedVendors.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchFeaturedVendors.fulfilled, (state, { payload }) => {
        // Reset state.
        state.featuredVendors = { ...featuredVendorsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { featuredVendors }: any = payload;
        state.featuredVendors = featuredVendors;
      })
      .addCase(fetchFeaturedVendors.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredFeaturedVendors.fulfilled, (state, { payload }) => {
        // Reset state.
        state.featuredVendors = { ...featuredVendorsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { featuredVendorsFiltered }: any = payload;
        state.featuredVendors = featuredVendorsFiltered;
      });
  },
});

export default appFeaturedVendorsSlice.reducer;
