// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_BANNERS,
  GET_FILTERED_BANNERS,
} from "@api/admin/banner";

// ** Others
import { Banner } from "./types";

// Initial state.
const bannersInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        type: "",
        title: "",
        link: "",
        image: "",
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

interface BannersState {
  edges: {
    cursor: string;
    node: Banner;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Banners
export const fetchBanners = createAsyncThunk<Banner, any, {}>(
  "appBanners/fetchBanners",
  async (bannerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_BANNERS,
        variables: bannerData,
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

// ** Fetch Filtered Banners
export const fetchFilteredBanners = createAsyncThunk<
  Banner,
  any,
  {}
>(
  "appBanners/fetchFilteredBanners",
  async (bannerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_BANNERS,
        variables: bannerData,
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

export const appBannersSlice = createSlice({
  name: "appBanners",
  initialState: {
    banners: <BannersState>{
      ...bannersInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchBanners.fulfilled, (state, { payload }) => {
        // Reset state.
        state.banners = { ...bannersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { banners }: any = payload;
        state.banners = banners;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredBanners.fulfilled, (state, { payload }) => {
        // Reset state.
        state.banners = { ...bannersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { bannersFiltered }: any = payload;
        state.banners = bannersFiltered;
      });
  },
});

export default appBannersSlice.reducer;
