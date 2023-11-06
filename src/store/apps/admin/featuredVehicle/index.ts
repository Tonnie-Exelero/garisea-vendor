// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_FEATURED_VEHICLES,
  GET_FILTERED_FEATURED_VEHICLES,
} from "@api/admin/featuredVehicle";

// ** Others
import { FeaturedVehicle } from "./types";

// Initial state.
const featuredVehiclesInitialState = {
  edges: [
    {
      cursor: "",
      node: {
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

interface FeaturedVehiclesState {
  edges: {
    cursor: string;
    node: FeaturedVehicle;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch FeaturedVehicles
export const fetchFeaturedVehicles = createAsyncThunk<FeaturedVehicle, any, {}>(
  "appFeaturedVehicles/fetchFeaturedVehicles",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FEATURED_VEHICLES,
        variables: featuredVehicleData,
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

// ** Fetch Filtered FeaturedVehicles
export const fetchFilteredFeaturedVehicles = createAsyncThunk<
  FeaturedVehicle,
  any,
  {}
>(
  "appFeaturedVehicles/fetchFilteredFeaturedVehicles",
  async (featuredVehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_FEATURED_VEHICLES,
        variables: featuredVehicleData,
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

export const appFeaturedVehiclesSlice = createSlice({
  name: "appFeaturedVehicles",
  initialState: {
    featuredVehicles: <FeaturedVehiclesState>{
      ...featuredVehiclesInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedVehicles.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchFeaturedVehicles.fulfilled, (state, { payload }) => {
        // Reset state.
        state.featuredVehicles = { ...featuredVehiclesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { featuredVehicles }: any = payload;
        state.featuredVehicles = featuredVehicles;
      })
      .addCase(fetchFeaturedVehicles.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(
        fetchFilteredFeaturedVehicles.fulfilled,
        (state, { payload }) => {
          // Reset state.
          state.featuredVehicles = { ...featuredVehiclesInitialState };

          if (state.loading === "pending") {
            state.loading = "";
          }

          const { featuredVehiclesFiltered }: any = payload;
          state.featuredVehicles = featuredVehiclesFiltered;
        }
      );
  },
});

export default appFeaturedVehiclesSlice.reducer;
