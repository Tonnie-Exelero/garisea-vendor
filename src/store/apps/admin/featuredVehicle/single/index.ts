// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_FEATURED_VEHICLE_BY_ID,
  CREATE_FEATURED_VEHICLE,
  UPDATE_FEATURED_VEHICLE,
  UPDATE_FEATURED_VEHICLE_IMPRESSIONS,
  UPDATE_FEATURED_VEHICLE_CLICKS,
  DELETE_FEATURED_VEHICLE,
} from "@api/admin/featuredVehicle";

// ** Others
import { FeaturedVehicle } from "../types";

// Initial state.
const featuredVehicleInitialState = {
  id: "",
  vehicle: {
    id: "",
    vendor: {
      storeLink: "",
      organization: {
        name: "",
        nicename: "",
      },
    },
    brand: {
      name: "",
    },
    model: {
      name: "",
    },
    trim: "",
    slug: "",
    yearOfManufacture: "",
    yearOfFirstRegistration: "",
    images: "",
    status: "",
  },
  page: "",
  position: "",
  rank: 0,
  impressions: 0,
  clicks: 0,
  targetImpressions: 0,
  targetClicks: 0,
};

// ** Fetch FeaturedVehicle By ID
export const fetchFeaturedVehicleById = createAsyncThunk<
  FeaturedVehicle,
  { id: string },
  {}
>(
  "appFeaturedVehicle/fetchFeaturedVehicleById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FEATURED_VEHICLE_BY_ID,
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

// ** Create FeaturedVehicle
export const addFeaturedVehicle = createAsyncThunk<
  FeaturedVehicle,
  Partial<FeaturedVehicle>,
  {}
>(
  "appFeaturedVehicle/addFeaturedVehicle",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_FEATURED_VEHICLE,
        variables: { ...featuredVehicleData },
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

// ** Update FeaturedVehicle
export const editFeaturedVehicle = createAsyncThunk<
  FeaturedVehicle,
  Partial<FeaturedVehicle>,
  {}
>(
  "appFeaturedVehicle/editFeaturedVehicle",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_FEATURED_VEHICLE,
        variables: { ...featuredVehicleData },
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
export const editImpressions = createAsyncThunk<FeaturedVehicle, any, {}>(
  "appFeaturedVehicle/editImpressions",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_FEATURED_VEHICLE_IMPRESSIONS,
        variables: { ...featuredVehicleData },
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
export const editClicks = createAsyncThunk<FeaturedVehicle, any, {}>(
  "appFeaturedVehicle/editClicks",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_FEATURED_VEHICLE_CLICKS,
        variables: { ...featuredVehicleData },
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

// ** Delete FeaturedVehicle
export const removeFeaturedVehicle = createAsyncThunk<
  FeaturedVehicle,
  Partial<FeaturedVehicle>,
  {}
>(
  "appFeaturedVehicle/removeFeaturedVehicle",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_FEATURED_VEHICLE,
        variables: { id: featuredVehicleData.id },
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

export const appFeaturedVehicleSlice = createSlice({
  name: "appFeaturedVehicle",
  initialState: {
    featuredVehicle: <FeaturedVehicle>{
      ...featuredVehicleInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedVehicleById.fulfilled, (state, { payload }) => {
        // Reset featuredVehicle state.
        state.featuredVehicle = { ...featuredVehicleInitialState };

        const { featuredVehicleById }: any = payload;

        state.featuredVehicle = { ...featuredVehicleById };
      })
      .addCase(addFeaturedVehicle.fulfilled, (state, { payload }) => {
        // Reset featuredVehicle state.
        state.featuredVehicle = { ...featuredVehicleInitialState };

        const { createFeaturedVehicle }: any = payload;

        state.featuredVehicle = { ...createFeaturedVehicle };
      })
      .addCase(editFeaturedVehicle.fulfilled, (state, { payload }) => {
        // Reset featuredVehicle state.
        state.featuredVehicle = { ...featuredVehicleInitialState };

        const { updateFeaturedVehicle }: any = payload;

        state.featuredVehicle = { ...updateFeaturedVehicle };
      })
      .addCase(editImpressions.fulfilled, (state, { payload }) => {
        const { updateFeaturedVehicleImpressions }: any = payload;

        state.featuredVehicle.impressions =
          updateFeaturedVehicleImpressions.impressions;
      })
      .addCase(editClicks.fulfilled, (state, { payload }) => {
        const { updateFeaturedVehicleClicks }: any = payload;

        state.featuredVehicle.clicks = updateFeaturedVehicleClicks.clicks;
      })
      .addCase(removeFeaturedVehicle.fulfilled, (state, { payload }) => {
        const { deleteFeaturedVehicle }: any = payload;
      });
  },
});

export default appFeaturedVehicleSlice.reducer;
