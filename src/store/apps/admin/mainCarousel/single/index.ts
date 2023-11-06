// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_MAIN_CAROUSEL_BY_ID,
  CREATE_MAIN_CAROUSEL,
  UPDATE_MAIN_CAROUSEL,
  UPDATE_MAIN_CAROUSEL_IMPRESSIONS,
  UPDATE_MAIN_CAROUSEL_CLICKS,
  DELETE_MAIN_CAROUSEL,
} from "@api/admin/mainCarousel";

// ** Others
import { MainCarousel } from "../types";

// Initial state.
const mainCarouselInitialState = {
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
};

// ** Fetch MainCarousel By ID
export const fetchMainCarouselById = createAsyncThunk<
  MainCarousel,
  { id: string },
  {}
>("appMainCarousel/fetchMainCarouselById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_MAIN_CAROUSEL_BY_ID,
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

// ** Create MainCarousel
export const addMainCarousel = createAsyncThunk<
  MainCarousel,
  Partial<MainCarousel>,
  {}
>(
  "appMainCarousel/addMainCarousel",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MAIN_CAROUSEL,
        variables: { ...mainCarouselData },
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

// ** Update MainCarousel
export const editMainCarousel = createAsyncThunk<
  MainCarousel,
  Partial<MainCarousel>,
  {}
>(
  "appMainCarousel/editMainCarousel",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL,
        variables: { ...mainCarouselData },
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

// ** Update Impressions
export const editImpressions = createAsyncThunk<MainCarousel, any, {}>(
  "appMainCarousel/editImpressions",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL_IMPRESSIONS,
        variables: { ...mainCarouselData },
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

// ** Update Clicks
export const editClicks = createAsyncThunk<MainCarousel, any, {}>(
  "appMainCarousel/editClicks",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL_CLICKS,
        variables: { ...mainCarouselData },
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

// ** Delete MainCarousel
export const removeMainCarousel = createAsyncThunk<
  MainCarousel,
  Partial<MainCarousel>,
  {}
>(
  "appMainCarousel/removeMainCarousel",
  async (mainCarouselData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MAIN_CAROUSEL,
        variables: { id: mainCarouselData.id },
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

export const appMainCarouselSlice = createSlice({
  name: "appMainCarousel",
  initialState: {
    mainCarousel: <MainCarousel>{
      ...mainCarouselInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCarouselById.fulfilled, (state, { payload }) => {
        // Reset mainCarousel state.
        state.mainCarousel = { ...mainCarouselInitialState };

        const { mainCarouselById }: any = payload;

        state.mainCarousel = { ...mainCarouselById };
      })
      .addCase(addMainCarousel.fulfilled, (state, { payload }) => {
        // Reset mainCarousel state.
        state.mainCarousel = { ...mainCarouselInitialState };

        const { createMainCarousel }: any = payload;

        state.mainCarousel = { ...createMainCarousel };
      })
      .addCase(editMainCarousel.fulfilled, (state, { payload }) => {
        // Reset mainCarousel state.
        state.mainCarousel = { ...mainCarouselInitialState };

        const { updateMainCarousel }: any = payload;

        state.mainCarousel = { ...updateMainCarousel };
      })
      .addCase(editImpressions.fulfilled, (state, { payload }) => {
        const { updateMainCarouselImpressions }: any = payload;

        state.mainCarousel.impressions =
          updateMainCarouselImpressions.impressions;
      })
      .addCase(editClicks.fulfilled, (state, { payload }) => {
        const { updateMainCarouselClicks }: any = payload;

        state.mainCarousel.clicks = updateMainCarouselClicks.clicks;
      })
      .addCase(removeMainCarousel.fulfilled, (state, { payload }) => {
        const { deleteMainCarousel }: any = payload;
      });
  },
});

export default appMainCarouselSlice.reducer;
