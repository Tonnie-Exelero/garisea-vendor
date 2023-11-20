// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { CREATE_INTEREST, DELETE_INTEREST } from "@api/frontend/interest";

// ** Others
import { Interest } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state
const interestInitialState = {
  id: "",
  customer: {
    id: "",
    firstName: "",
    lastName: "",
    image: "",
    onlineStatus: "",
  },
  vehicle: {
    id: "",
    vendor: {
      id: "",
      storeLink: "",
      organization: {
        id: "",
        name: "",
        nicename: "",
      },
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
    slug: "",
    yearOfManufacture: "",
    yearOfFirstRegistration: "",
    condition: "",
    images: "",
    viewingLocation: "",
    reserved: "",
    sold: "",
  },
};

// ** Create Interest
export const addInterest = createAsyncThunk<Interest, Partial<Interest>, {}>(
  "appInterest/addInterest",
  async (interestData, { rejectWithValue }) => {
    const encryptedData = encryptData(interestData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_INTEREST,
        variables: { pl: encryptedData },
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

// ** Delete Interest
export const removeInterest = createAsyncThunk<Interest, Partial<Interest>, {}>(
  "appInterest/removeInterest",
  async (interestData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: interestData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_INTEREST,
        variables: { pl: encryptedData },
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

export const appInterestSlice = createSlice({
  name: "appInterest",
  initialState: {
    interest: <Interest>{
      ...interestInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInterest.fulfilled, (state, { payload }) => {
        // Reset interest state.
        state.interest = { ...interestInitialState };

        const { createInterest }: any = payload;

        state.interest = { ...createInterest };
      })
      .addCase(removeInterest.fulfilled, (state, { payload }) => {
        const { deleteInterest }: any = payload;
      });
  },
});

export default appInterestSlice.reducer;
