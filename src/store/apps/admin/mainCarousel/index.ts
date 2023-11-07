// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_MAIN_CAROUSELS,
  GET_FILTERED_MAIN_CAROUSELS,
} from "@api/admin/mainCarousel";

// ** Others
import { MainCarousel } from "./types";

// Initial state.
const mainCarouselsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        type: "",
        title: "",
        image: "",
        buttonLink: "",
        buttonText: "",
        description: "",
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

interface MainCarouselsState {
  edges: {
    cursor: string;
    node: MainCarousel;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch MainCarousels
export const fetchMainCarousels = createAsyncThunk<MainCarousel, any, {}>(
  "appMainCarousels/fetchMainCarousels",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_MAIN_CAROUSELS,
        variables: mainCarouselData,
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

// ** Fetch Filtered MainCarousels
export const fetchFilteredMainCarousels = createAsyncThunk<
  MainCarousel,
  any,
  {}
>(
  "appMainCarousels/fetchFilteredMainCarousels",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_MAIN_CAROUSELS,
        variables: mainCarouselData,
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

export const appMainCarouselsSlice = createSlice({
  name: "appMainCarousels",
  initialState: {
    mainCarousels: <MainCarouselsState>{
      ...mainCarouselsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCarousels.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchMainCarousels.fulfilled, (state, { payload }) => {
        // Reset state.
        state.mainCarousels = { ...mainCarouselsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { mainCarousels }: any = payload;
        state.mainCarousels = mainCarousels;
      })
      .addCase(fetchMainCarousels.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredMainCarousels.fulfilled, (state, { payload }) => {
        // Reset state.
        state.mainCarousels = { ...mainCarouselsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { mainCarouselsFiltered }: any = payload;
        state.mainCarousels = mainCarouselsFiltered;
      });
  },
});

export default appMainCarouselsSlice.reducer;
