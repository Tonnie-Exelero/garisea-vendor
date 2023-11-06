// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VEHICLE_REVIEWS,
  GET_VEHICLE_BY_ID_REVIEWS,
  GET_VEHICLE_REVIEWS_COUNT,
  GET_VEHICLE_REVIEWS_STARS_AVG,
} from "@api/shared/vehicleReview";

// ** Others
import {
  VehicleReview,
  VehicleReviewCount,
  VehicleReviewStarsAvg,
} from "./types";

// Initial state.
const vehicleReviewsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        vehicle: {
          id: "",
          entryNo: "",
          vendor: {
            firstName: "",
            lastName: "",
            image: "",
            organization: {
              name: "",
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
        },
        customer: {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
        },
        stars: 0,
        comment: "",
        status: "",
        rating: "",
        publishedAt: "",
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

interface VehicleReviewsState {
  edges: {
    cursor: string;
    node: VehicleReview;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch VehicleReviews
export const fetchVehicleReviews = createAsyncThunk<VehicleReview, any, {}>(
  "appVehicleReviews/fetchVehicleReviews",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLE_REVIEWS,
        variables: vehicleReviewData,
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

// ** Fetch VehicleReviews By Vehicle Id
export const fetchVehicleByIdReviews = createAsyncThunk<VehicleReview, any, {}>(
  "appVehicleReviews/fetchVehicleByIdReviews",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLE_BY_ID_REVIEWS,
        variables: vehicleReviewData,
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

// ** Fetch VehicleReviews Count
export const fetchVehicleReviewsCount = createAsyncThunk(
  "appVehicleReviews/fetchVehicleReviewsCount",
  async () => {
    const { data } = await apolloClient.query({
      query: GET_VEHICLE_REVIEWS_COUNT,
    });

    return data;
  }
);

// ** Fetch VehicleReviews Stars Avg
export const fetchVehicleReviewsStarsAvg = createAsyncThunk<
  VehicleReviewStarsAvg,
  any,
  {}
>(
  "appVehicleReviews/fetchVehicleReviewsStarsAvg",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLE_REVIEWS_STARS_AVG,
        variables: vehicleReviewData,
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

export const appVehicleReviewsSlice = createSlice({
  name: "appVehicleReviews",
  initialState: {
    vehicleReviews: <VehicleReviewsState>{
      ...vehicleReviewsInitialState,
    },
    vehicleReviewsCount: <VehicleReviewCount>{
      count: "",
    },
    vehicleReviewsStarsAvg: <VehicleReviewStarsAvg>{
      rating: null,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleReviews.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicleReviews = { ...vehicleReviewsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehicleReviews }: any = payload;
        state.vehicleReviews = vehicleReviews;
      })
      .addCase(fetchVehicleByIdReviews.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicleReviews = { ...vehicleReviewsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehicleByIdReviews }: any = payload;
        state.vehicleReviews = vehicleByIdReviews;
      })
      .addCase(fetchVehicleReviewsCount.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicleReviewsCount = {
          count: "",
        };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehicleReviewsCount }: any = payload;
        state.vehicleReviewsCount = vehicleReviewsCount;
      })
      .addCase(fetchVehicleReviewsStarsAvg.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicleReviewsStarsAvg = {
          rating: null,
        };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehicleReviewStarsAvg }: any = payload;
        state.vehicleReviewsStarsAvg = vehicleReviewStarsAvg;
      });
  },
});

export default appVehicleReviewsSlice.reducer;
