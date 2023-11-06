// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_FEATURED_VENDOR_BY_ID,
  CREATE_FEATURED_VENDOR,
  UPDATE_FEATURED_VENDOR,
  UPDATE_FEATURED_VENDOR_IMPRESSIONS,
  UPDATE_FEATURED_VENDOR_CLICKS,
  DELETE_FEATURED_VENDOR,
} from "@api/admin/featuredVendor";

// ** Others
import { FeaturedVendor } from "../types";

// Initial state.
const featuredVendorInitialState = {
  id: "",
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
};

// ** Fetch FeaturedVendor By ID
export const fetchFeaturedVendorById = createAsyncThunk<
  FeaturedVendor,
  { id: string },
  {}
>(
  "appFeaturedVendor/fetchFeaturedVendorById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FEATURED_VENDOR_BY_ID,
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

// ** Create FeaturedVendor
export const addFeaturedVendor = createAsyncThunk<
  FeaturedVendor,
  Partial<FeaturedVendor>,
  {}
>(
  "appFeaturedVendor/addFeaturedVendor",
  async (featuredVendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_FEATURED_VENDOR,
        variables: { ...featuredVendorData },
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

// ** Update FeaturedVendor
export const editFeaturedVendor = createAsyncThunk<
  FeaturedVendor,
  Partial<FeaturedVendor>,
  {}
>(
  "appFeaturedVendor/editFeaturedVendor",
  async (featuredVendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_FEATURED_VENDOR,
        variables: { ...featuredVendorData },
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

// ** Update Impressions
export const editImpressions = createAsyncThunk<FeaturedVendor, any, {}>(
  "appFeaturedVendor/editImpressions",
  async (featuredVendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_FEATURED_VENDOR_IMPRESSIONS,
        variables: { ...featuredVendorData },
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

// ** Update Clicks
export const editClicks = createAsyncThunk<FeaturedVendor, any, {}>(
  "appFeaturedVendor/editClicks",
  async (featuredVendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_FEATURED_VENDOR_CLICKS,
        variables: { ...featuredVendorData },
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

// ** Delete FeaturedVendor
export const removeFeaturedVendor = createAsyncThunk<
  FeaturedVendor,
  Partial<FeaturedVendor>,
  {}
>(
  "appFeaturedVendor/removeFeaturedVendor",
  async (featuredVendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_FEATURED_VENDOR,
        variables: { id: featuredVendorData.id },
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

export const appFeaturedVendorSlice = createSlice({
  name: "appFeaturedVendor",
  initialState: {
    featuredVendor: <FeaturedVendor>{
      ...featuredVendorInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedVendorById.fulfilled, (state, { payload }) => {
        // Reset featuredVendor state.
        state.featuredVendor = { ...featuredVendorInitialState };

        const { featuredVendorById }: any = payload;

        state.featuredVendor = { ...featuredVendorById };
      })
      .addCase(addFeaturedVendor.fulfilled, (state, { payload }) => {
        // Reset featuredVendor state.
        state.featuredVendor = { ...featuredVendorInitialState };

        const { createFeaturedVendor }: any = payload;

        state.featuredVendor = { ...createFeaturedVendor };
      })
      .addCase(editFeaturedVendor.fulfilled, (state, { payload }) => {
        // Reset featuredVendor state.
        state.featuredVendor = { ...featuredVendorInitialState };

        const { updateFeaturedVendor }: any = payload;

        state.featuredVendor = { ...updateFeaturedVendor };
      })
      .addCase(editImpressions.fulfilled, (state, { payload }) => {
        const { updateFeaturedVendorImpressions }: any = payload;

        state.featuredVendor.impressions =
          updateFeaturedVendorImpressions.impressions;
      })
      .addCase(editClicks.fulfilled, (state, { payload }) => {
        const { updateFeaturedVendorClicks }: any = payload;

        state.featuredVendor.clicks = updateFeaturedVendorClicks.clicks;
      })
      .addCase(removeFeaturedVendor.fulfilled, (state, { payload }) => {
        const { deleteFeaturedVendor }: any = payload;
      });
  },
});

export default appFeaturedVendorSlice.reducer;
