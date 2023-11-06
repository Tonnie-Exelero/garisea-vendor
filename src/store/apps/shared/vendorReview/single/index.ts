// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VENDOR_REVIEW_BY_ID,
  CREATE_VENDOR_REVIEW,
  UPDATE_VENDOR_REVIEW,
  UPDATE_VENDOR_REVIEW_STATUS,
  DELETE_VENDOR_REVIEW,
} from "@api/shared/vendorReview";

// ** Others
import { VendorReview } from "../types";

// Initial state.
const vendorReviewInitialState = {
  id: "",
  vendor: {
    id: "",
    firstName: "",
    lastName: "",
    image: "",
    organization: {
      name: "",
    },
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

// ** Fetch VendorReview By ID
export const fetchVendorReviewById = createAsyncThunk<
  VendorReview,
  { id: string },
  {}
>("appVendorReview/fetchVendorReviewById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_VENDOR_REVIEW_BY_ID,
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
});

// ** Create VendorReview
export const addVendorReview = createAsyncThunk<VendorReview, any, {}>(
  "appVendorReview/addVendorReview",
  async (vendorReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_VENDOR_REVIEW,
        variables: { ...vendorReviewData },
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

// ** Update VendorReview
export const editVendorReview = createAsyncThunk<VendorReview, any, {}>(
  "appVendorReview/editVendorReview",
  async (vendorReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VENDOR_REVIEW,
        variables: { ...vendorReviewData },
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

// ** Update VendorReview Status
export const editVendorReviewStatus = createAsyncThunk<VendorReview, any, {}>(
  "appVendorReview/editVendorReviewStatus",
  async (vendorReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VENDOR_REVIEW_STATUS,
        variables: { ...vendorReviewData },
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

// ** Delete VendorReview
export const removeVendorReview = createAsyncThunk<VendorReview, any, {}>(
  "appVendorReview/removeVendorReview",
  async (vendorReviewData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_VENDOR_REVIEW,
        variables: { id: vendorReviewData.id },
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

export const appVendorReviewSlice = createSlice({
  name: "appVendorReview",
  initialState: {
    vendorReview: <VendorReview>{
      ...vendorReviewInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorReviewById.fulfilled, (state, { payload }) => {
        // Reset vendorReview state.
        state.vendorReview = { ...vendorReviewInitialState };

        const { vendorReviewById }: any = payload;

        state.vendorReview = { ...vendorReviewById };
      })
      .addCase(addVendorReview.fulfilled, (state, { payload }) => {
        // Reset vendorReview state.
        state.vendorReview = { ...vendorReviewInitialState };

        const { createVendorReview }: any = payload;

        state.vendorReview = { ...createVendorReview };
      })
      .addCase(editVendorReview.fulfilled, (state, { payload }) => {
        // Reset vendorReview state.
        state.vendorReview = { ...vendorReviewInitialState };

        const { updateVendorReview }: any = payload;

        state.vendorReview = { ...updateVendorReview };
      })
      .addCase(editVendorReviewStatus.fulfilled, (state, { payload }) => {
        const { updateVendorReviewStatus }: any = payload;

        state.vendorReview.status = updateVendorReviewStatus.status;
      })
      .addCase(removeVendorReview.fulfilled, (state, { payload }) => {
        const { deleteVendorReview }: any = payload;
      });
  },
});

export default appVendorReviewSlice.reducer;
