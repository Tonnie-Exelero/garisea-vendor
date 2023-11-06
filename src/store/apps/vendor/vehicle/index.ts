// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VEHICLES,
  GET_VEHICLES_BY_VENDOR_ID,
  GET_FILTERED_VEHICLES,
} from "@api/vendor/vehicle";

// ** Others
import { Vehicle } from "./types";

// Initial state
const vehiclesInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        entryNo: "",
        vendor: {
          id: "",
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          phone: "",
          image: "",
          storeLink: "",
          address: "",
          city: "",
          country: "",
          vendorVerified: "",
          organization: {
            id: "",
            name: "",
            nicename: "",
          },
        },
        brand: {
          id: "",
          name: "",
          slug: "",
        },
        model: {
          id: "",
          name: "",
          slug: "",
        },
        trim: "",
        slug: "",
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
        status: "",
        viewingLocation: "",
        vehicleOriginCountry: "",
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
        discountAmount: 0,
        allowedPaymentModes: "",
        offerType: "",
        features: "",
        views: 0,
        extraInfo: "",
        reserved: "",
        sold: "",
        publishedAt: "",
        impressions: 0,
        detailExpands: 0,
        interested: 0,
        vehicleVerified: "",
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

interface VehiclesState {
  edges: {
    cursor: string;
    node: Vehicle;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Vehicles
export const fetchVehicles = createAsyncThunk<Vehicle, any, {}>(
  "appVehicles/fetchVehicles",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLES,
        variables: vehicleData,
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

// ** Fetch Vehicles By Vendor
export const fetchVehiclesByVendor = createAsyncThunk<Vehicle, any, {}>(
  "appVehicles/fetchVehiclesByVendor",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VEHICLES_BY_VENDOR_ID,
        variables: vehicleData,
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

// ** Fetch Filtered Vehicles
export const fetchFilteredVehicles = createAsyncThunk<Vehicle, any, {}>(
  "appVehicles/fetchFilteredVehicles",
  async (vehicleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_VEHICLES,
        variables: vehicleData,
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

export const appVehiclesSlice = createSlice({
  name: "appVehicles",
  initialState: {
    vehicles: <VehiclesState>{
      ...vehiclesInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVehicles.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicles = { ...vehiclesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehicles }: any = payload;
        state.vehicles = vehicles;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchVehiclesByVendor.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVehiclesByVendor.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicles = { ...vehiclesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehiclesByVendorId }: any = payload;
        state.vehicles = vehiclesByVendorId;
      })
      .addCase(fetchVehiclesByVendor.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredVehicles.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vehicles = { ...vehiclesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vehiclesFiltered }: any = payload;
        state.vehicles = vehiclesFiltered;
      });
  },
});

export default appVehiclesSlice.reducer;
