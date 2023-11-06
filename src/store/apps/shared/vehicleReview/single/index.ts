// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VEHICLE_REVIEW_BY_ID,
  CREATE_VEHICLE_REVIEW,
  UPDATE_VEHICLE_REVIEW,
  UPDATE_VEHICLE_REVIEW_STATUS,
  DELETE_VEHICLE_REVIEW,
} from "@api/shared/vehicleReview";

// ** Others
import { VehicleReview } from "../types";

// Initial state.
const vehicleReviewInitialState = {
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
};

// ** Fetch VehicleReview By ID
export const fetchVehicleReviewById = createAsyncThunk<
  VehicleReview,
  { id: string },
  {}
>(
  "appVehicleReview/fetchVehicleReviewById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLE_REVIEW_BY_ID,
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

// ** Create VehicleReview
export const addVehicleReview = createAsyncThunk<VehicleReview, any, {}>(
  "appVehicleReview/addVehicleReview",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_VEHICLE_REVIEW,
        variables: { ...vehicleReviewData },
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

// ** Update VehicleReview
export const editVehicleReview = createAsyncThunk<VehicleReview, any, {}>(
  "appVehicleReview/editVehicleReview",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_REVIEW,
        variables: { ...vehicleReviewData },
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

// ** Update VehicleReview Status
export const editVehicleReviewStatus = createAsyncThunk<VehicleReview, any, {}>(
  "appVehicleReview/editVehicleReviewStatus",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_REVIEW_STATUS,
        variables: { ...vehicleReviewData },
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

// ** Delete VehicleReview
export const removeVehicleReview = createAsyncThunk<VehicleReview, any, {}>(
  "appVehicleReview/removeVehicleReview",
  async (vehicleReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_VEHICLE_REVIEW,
        variables: { id: vehicleReviewData.id },
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

export const appVehicleReviewSlice = createSlice({
  name: "appVehicleReview",
  initialState: {
    vehicleReview: <VehicleReview>{
      ...vehicleReviewInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleReviewById.fulfilled, (state, { payload }) => {
        // Reset vehicleReview state.
        state.vehicleReview = { ...vehicleReviewInitialState };

        const { vehicleReviewById }: any = payload;

        state.vehicleReview = { ...vehicleReviewById };
      })
      .addCase(addVehicleReview.fulfilled, (state, { payload }) => {
        // Reset vehicleReview state.
        state.vehicleReview = { ...vehicleReviewInitialState };

        const { createVehicleReview }: any = payload;

        state.vehicleReview = { ...createVehicleReview };
      })
      .addCase(editVehicleReview.fulfilled, (state, { payload }) => {
        // Reset vehicleReview state.
        state.vehicleReview = { ...vehicleReviewInitialState };

        const { updateVehicleReview }: any = payload;

        state.vehicleReview = { ...updateVehicleReview };
      })
      .addCase(editVehicleReviewStatus.fulfilled, (state, { payload }) => {
        const { updateVehicleReviewStatus }: any = payload;

        state.vehicleReview.status = updateVehicleReviewStatus.status;
      })
      .addCase(removeVehicleReview.fulfilled, (state, { payload }) => {
        const { deleteVehicleReview }: any = payload;
      });
  },
});

export default appVehicleReviewSlice.reducer;
