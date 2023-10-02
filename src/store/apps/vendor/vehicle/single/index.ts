// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VEHICLE_BY_ID,
  GET_VEHICLE_BY_ENTRY_NO,
  CREATE_VEHICLE,
  UPDATE_VEHICLE,
  UPDATE_VEHICLE_RESERVED,
  UPDATE_VEHICLE_SOLD,
  UPDATE_VEHICLE_IMAGES,
  UPDATE_VEHICLE_BASIC,
  UPDATE_VEHICLE_SPECIFICATIONS,
  UPDATE_VEHICLE_EXTRA_INFO,
  DELETE_VEHICLE,
} from "@api/vendor/vehicle";

// ** Others
import { Vehicle } from "../types";

// ** Vehicle Initial State
const vehicleInitialState = {
  id: "",
  entryNo: "",
  vendor: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    address: "",
    city: "",
    country: "",
  },
  brand: {
    id: "",
    name: "",
  },
  model: {
    id: "",
    name: "",
  },
  trim: "",
  yearOfManufacture: "",
  yearOfFirstRegistration: "",
  registered: "",
  registrationNo: "",
  condition: "",
  mileage: 0,
  mileageMetric: "",
  transmissionType: "",
  fuelType: "",
  engineCapacity: 0,
  exteriorColor: "",
  upholstery: "",
  images: "",
  engineType: "",
  driveType: "",
  vinNo: "",
  bodyType: "",
  interiorColor: "",
  steering: "",
  seats: 0,
  doors: 0,
  listingPrice: 0,
  discountedPrice: 0,
  allowedPaymentModes: "",
  offerType: "",
  features: "",
  views: 0,
  extraInfo: "",
  reserved: "",
  sold: "",
};

// ** Fetch Vehicle By ID
export const fetchVehicleById = createAsyncThunk<Vehicle, { id: string }, {}>(
  "appSingleVehicle/fetchVehicleById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLE_BY_ID,
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

// ** Fetch Vehicle By Entry No
export const fetchVehicleByEntryNo = createAsyncThunk<
  Vehicle,
  { entryNo: string },
  {}
>(
  "appSingleVehicle/fetchVehicleByEntryNo",
  async (entryNo, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLE_BY_ENTRY_NO,
        variables: { ...entryNo },
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

// ** Create Vehicle
export const addVehicle = createAsyncThunk<Vehicle, Partial<Vehicle>, {}>(
  "appSingleVehicle/addVehicle",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_VEHICLE,
        variables: { ...vehicleData },
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

// ** Update Vehicle
export const editVehicle = createAsyncThunk<Vehicle, Partial<Vehicle>, {}>(
  "appSingleVehicle/editVehicle",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE,
        variables: { ...vehicleData },
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

// ** Update Vehicle Reserved
export const editVehicleReserved = createAsyncThunk<
  Vehicle,
  Partial<Vehicle>,
  {}
>(
  "appSingleVehicle/editVehicleReserved",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_RESERVED,
        variables: { ...vehicleData },
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

// ** Update Vehicle Sold
export const editVehicleSold = createAsyncThunk<Vehicle, Partial<Vehicle>, {}>(
  "appSingleVehicle/editVehicleSold",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_SOLD,
        variables: { ...vehicleData },
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

// ** Update Vehicle Images
export const editVehicleImages = createAsyncThunk<
  Vehicle,
  Partial<Vehicle>,
  {}
>(
  "appSingleVehicle/editVehicleImages",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_IMAGES,
        variables: { ...vehicleData },
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

// ** Update Vehicle Basic Information
export const editVehicleBasicInfo = createAsyncThunk<
  Vehicle,
  Partial<Vehicle>,
  {}
>(
  "appSingleVehicle/editVehicleBasicInfo",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_BASIC,
        variables: { ...vehicleData },
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

// ** Update Vehicle Specifications
export const editVehicleSpecifications = createAsyncThunk<
  Vehicle,
  Partial<Vehicle>,
  {}
>(
  "appSingleVehicle/editVehicleSpecifications",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_SPECIFICATIONS,
        variables: { ...vehicleData },
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

// ** Update Vehicle Extra Info
export const editVehicleExtraInfo = createAsyncThunk<
  Vehicle,
  Partial<Vehicle>,
  {}
>(
  "appSingleVehicle/editVehicleExtraInfo",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VEHICLE_EXTRA_INFO,
        variables: { ...vehicleData },
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

// ** Delete Vehicle
export const removeVehicle = createAsyncThunk<Vehicle, Partial<Vehicle>, {}>(
  "appSingleVehicle/removeVehicle",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_VEHICLE,
        variables: { id: vehicleData.id },
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

export const appSingleVehicleSlice = createSlice({
  name: "appSingleVehicle",
  initialState: {
    vehicle: <Vehicle>{
      ...vehicleInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleById.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVehicleById.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        if (state.loading === "pending") {
          const { vehicleById }: any = payload;

          state.loading = "";
          state.vehicle = vehicleById;
        }
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchVehicleByEntryNo.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVehicleByEntryNo.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        if (state.loading === "pending") {
          const { vehicleByEntryNo }: any = payload;

          state.loading = "";
          state.vehicle = vehicleByEntryNo;
        }
      })
      .addCase(fetchVehicleByEntryNo.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(addVehicle.fulfilled, (state, { payload }) => {
        const { createVehicle }: any = payload;

        state.vehicle = { ...createVehicle };
      })
      .addCase(editVehicle.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicle }: any = payload;

        state.vehicle = { ...updateVehicle };
      })
      .addCase(editVehicleReserved.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicleReserved }: any = payload;

        state.vehicle = { ...updateVehicleReserved };
      })
      .addCase(editVehicleSold.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicleSold }: any = payload;

        state.vehicle = { ...updateVehicleSold };
      })
      .addCase(editVehicleImages.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicleImages }: any = payload;

        state.vehicle = { ...updateVehicleImages };
      })
      .addCase(editVehicleBasicInfo.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicleBasic }: any = payload;

        state.vehicle = { ...updateVehicleBasic };
      })
      .addCase(editVehicleSpecifications.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicleSpecifications }: any = payload;

        state.vehicle = { ...updateVehicleSpecifications };
      })
      .addCase(editVehicleExtraInfo.fulfilled, (state, { payload }) => {
        // Reset vehicle state.
        state.vehicle = { ...vehicleInitialState };

        const { updateVehicleExtraInfo }: any = payload;

        state.vehicle = { ...updateVehicleExtraInfo };
      })
      .addCase(removeVehicle.fulfilled, (state, { payload }) => {
        const { deleteVehicle }: any = payload;
      });
  },
});

export default appSingleVehicleSlice.reducer;
