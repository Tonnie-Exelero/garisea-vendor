// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_MAIN_CAROUSEL_BY_ID,
  CREATE_MAIN_CAROUSEL,
  UPDATE_MAIN_CAROUSEL,
  UPDATE_MAIN_CAROUSEL_STATUS,
  UPDATE_MAIN_CAROUSEL_IMPRESSIONS,
  UPDATE_MAIN_CAROUSEL_CLICKS,
  DELETE_MAIN_CAROUSEL,
} from "@api/admin/mainCarousel";

// ** Others
import { MainCarousel } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const mainCarouselInitialState = {
  id: "",
  vendor: {
    firstName: "",
    lastName: "",
    storeLink: "",
    organization: {
      nicename: "",
      name: "",
    },
  },
  status: "",
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
  const encryptedData = encryptData(id);

  try {
    const { data } = await apolloClient.query({
      query: GET_MAIN_CAROUSEL_BY_ID,
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
});

// ** Create MainCarousel
export const addMainCarousel = createAsyncThunk<
  MainCarousel,
  Partial<MainCarousel>,
  {}
>(
  "appMainCarousel/addMainCarousel",
  async (mainCarouselData, { rejectWithValue }) => {
    const encryptedData = encryptData(mainCarouselData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MAIN_CAROUSEL,
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

// ** Update MainCarousel
export const editMainCarousel = createAsyncThunk<
  MainCarousel,
  Partial<MainCarousel>,
  {}
>(
  "appMainCarousel/editMainCarousel",
  async (mainCarouselData, { rejectWithValue }) => {
    const encryptedData = encryptData(mainCarouselData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL,
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

// ** Update Status
export const editStatus = createAsyncThunk<MainCarousel, any, {}>(
  "appMainCarousel/editStatus",
  async (mainCarouselData, { rejectWithValue }) => {
    const encryptedData = encryptData(mainCarouselData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL_STATUS,
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

// ** Update Impressions
export const editImpressions = createAsyncThunk<MainCarousel, any, {}>(
  "appMainCarousel/editImpressions",
  async (mainCarouselData, { rejectWithValue }) => {
    const encryptedData = encryptData(mainCarouselData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL_IMPRESSIONS,
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

// ** Update Clicks
export const editClicks = createAsyncThunk<MainCarousel, any, {}>(
  "appMainCarousel/editClicks",
  async (mainCarouselData, { rejectWithValue }) => {
    const encryptedData = encryptData(mainCarouselData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MAIN_CAROUSEL_CLICKS,
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

// ** Delete MainCarousel
export const removeMainCarousel = createAsyncThunk<
  MainCarousel,
  Partial<MainCarousel>,
  {}
>(
  "appMainCarousel/removeMainCarousel",
  async (mainCarouselData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: mainCarouselData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MAIN_CAROUSEL,
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
      .addCase(editStatus.fulfilled, (state, { payload }) => {
        const { updateMainCarouselStatus }: any = payload;

        state.mainCarousel.status = updateMainCarouselStatus.status;
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
