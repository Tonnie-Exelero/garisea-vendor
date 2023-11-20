// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_VENDOR_REVIEWS,
  GET_VENDOR_BY_ID_REVIEWS,
  GET_VENDOR_REVIEWS_COUNT,
  GET_VENDOR_REVIEWS_STARS_AVG,
} from "@api/shared/vendorReview";

// ** Others
import { VendorReview, VendorReviewCount, VendorReviewStarsAvg } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const vendorReviewsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
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

interface VendorReviewsState {
  edges: {
    cursor: string;
    node: VendorReview;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch VendorReviews
export const fetchVendorReviews = createAsyncThunk<VendorReview, any, {}>(
  "appVendorReviews/fetchVendorReviews",
  async (vendorReviewData, { rejectWithValue }) => {
    const encryptedData = vendorReviewData && encryptData(vendorReviewData);
    const pagination = {
      ...(vendorReviewData.first && { first: vendorReviewData.first }),
      ...(vendorReviewData.last && { last: vendorReviewData.last }),
      ...(vendorReviewData.after && { after: vendorReviewData.after }),
      ...(vendorReviewData.before && { before: vendorReviewData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_VENDOR_REVIEWS,
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

// ** Fetch VendorReviews By Vendor Id
export const fetchVendorByIdReviews = createAsyncThunk<VendorReview, any, {}>(
  "appVendorReviews/fetchVendorByIdReviews",
  async (vendorReviewData, { rejectWithValue }) => {
    const encryptedData = vendorReviewData && encryptData(vendorReviewData);
    const pagination = {
      ...(vendorReviewData.first && { first: vendorReviewData.first }),
      ...(vendorReviewData.last && { last: vendorReviewData.last }),
      ...(vendorReviewData.after && { after: vendorReviewData.after }),
      ...(vendorReviewData.before && { before: vendorReviewData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_VENDOR_BY_ID_REVIEWS,
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

// ** Fetch VendorReviews Count
export const fetchVendorReviewsCount = createAsyncThunk(
  "appVendorReviews/fetchVendorReviewsCount",
  async () => {
    const { data } = await apolloClient.query({
      query: GET_VENDOR_REVIEWS_COUNT,
    });

    return data;
  }
);

// ** Fetch VendorReviews Stars Avg
export const fetchVendorReviewsStarsAvg = createAsyncThunk<
  VendorReviewStarsAvg,
  any,
  {}
>(
  "appVendorReviews/fetchVendorReviewsStarsAvg",
  async (vendorReviewData, { rejectWithValue }) => {
    const encryptedData = vendorReviewData && encryptData(vendorReviewData);
    const pagination = {
      ...(vendorReviewData.first && { first: vendorReviewData.first }),
      ...(vendorReviewData.last && { last: vendorReviewData.last }),
      ...(vendorReviewData.after && { after: vendorReviewData.after }),
      ...(vendorReviewData.before && { before: vendorReviewData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_VENDOR_REVIEWS_STARS_AVG,
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

export const appVendorReviewsSlice = createSlice({
  name: "appVendorReviews",
  initialState: {
    vendorReviews: <VendorReviewsState>{
      ...vendorReviewsInitialState,
    },
    vendorReviewsCount: <VendorReviewCount>{
      count: "",
    },
    vendorReviewsStarsAvg: <VendorReviewStarsAvg>{
      rating: null,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorReviews.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendorReviews = { ...vendorReviewsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorReviews }: any = payload;
        state.vendorReviews = vendorReviews;
      })
      .addCase(fetchVendorByIdReviews.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendorReviews = { ...vendorReviewsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorByIdReviews }: any = payload;
        state.vendorReviews = vendorByIdReviews;
      })
      .addCase(fetchVendorReviewsCount.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendorReviewsCount = {
          count: "",
        };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorReviewsCount }: any = payload;
        state.vendorReviewsCount = vendorReviewsCount;
      })
      .addCase(fetchVendorReviewsStarsAvg.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendorReviewsStarsAvg = {
          rating: null,
        };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorReviewStarsAvg }: any = payload;
        state.vendorReviewsStarsAvg = vendorReviewStarsAvg;
      });
  },
});

export default appVendorReviewsSlice.reducer;
