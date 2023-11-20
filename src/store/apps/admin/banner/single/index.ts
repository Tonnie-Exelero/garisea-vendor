// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_BANNER_BY_ID,
  CREATE_BANNER,
  UPDATE_BANNER,
  UPDATE_BANNER_STATUS,
  UPDATE_BANNER_IMPRESSIONS,
  UPDATE_BANNER_CLICKS,
  DELETE_BANNER,
} from "@api/admin/banner";

// ** Others
import { Banner } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const bannerInitialState = {
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
  link: "",
  image: "",
  page: "",
  position: "",
  rank: 0,
  impressions: 0,
  clicks: 0,
  targetImpressions: 0,
  targetClicks: 0,
};

// ** Fetch Banner By ID
export const fetchBannerById = createAsyncThunk<Banner, { id: string }, {}>(
  "appBanner/fetchBannerById",
  async (id, { rejectWithValue }) => {
    const encryptedData = encryptData(id);

    try {
      const { data } = await apolloClient.query({
        query: GET_BANNER_BY_ID,
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

// ** Create Banner
export const addBanner = createAsyncThunk<Banner, Partial<Banner>, {}>(
  "appBanner/addBanner",
  async (bannerData, { rejectWithValue }) => {
    const encryptedData = encryptData(bannerData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_BANNER,
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

// ** Update Banner
export const editBanner = createAsyncThunk<Banner, Partial<Banner>, {}>(
  "appBanner/editBanner",
  async (bannerData, { rejectWithValue }) => {
    const encryptedData = encryptData(bannerData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_BANNER,
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
export const editStatus = createAsyncThunk<Banner, any, {}>(
  "appBanner/editStatus",
  async (bannerData, { rejectWithValue }) => {
    const encryptedData = encryptData(bannerData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_BANNER_STATUS,
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
export const editImpressions = createAsyncThunk<Banner, any, {}>(
  "appBanner/editImpressions",
  async (bannerData, { rejectWithValue }) => {
    const encryptedData = encryptData(bannerData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_BANNER_IMPRESSIONS,
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
export const editClicks = createAsyncThunk<Banner, any, {}>(
  "appBanner/editClicks",
  async (bannerData, { rejectWithValue }) => {
    const encryptedData = encryptData(bannerData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_BANNER_CLICKS,
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

// ** Delete Banner
export const removeBanner = createAsyncThunk<Banner, Partial<Banner>, {}>(
  "appBanner/removeBanner",
  async (bannerData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: bannerData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_BANNER,
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

export const appBannerSlice = createSlice({
  name: "appBanner",
  initialState: {
    banner: <Banner>{
      ...bannerInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerById.fulfilled, (state, { payload }) => {
        // Reset banner state.
        state.banner = { ...bannerInitialState };

        const { bannerById }: any = payload;

        state.banner = { ...bannerById };
      })
      .addCase(addBanner.fulfilled, (state, { payload }) => {
        // Reset banner state.
        state.banner = { ...bannerInitialState };

        const { createBanner }: any = payload;

        state.banner = { ...createBanner };
      })
      .addCase(editBanner.fulfilled, (state, { payload }) => {
        // Reset banner state.
        state.banner = { ...bannerInitialState };

        const { updateBanner }: any = payload;

        state.banner = { ...updateBanner };
      })
      .addCase(editStatus.fulfilled, (state, { payload }) => {
        const { updateBannerStatus }: any = payload;

        state.banner.status = updateBannerStatus.status;
      })
      .addCase(editImpressions.fulfilled, (state, { payload }) => {
        const { updateBannerImpressions }: any = payload;

        state.banner.impressions = updateBannerImpressions.impressions;
      })
      .addCase(editClicks.fulfilled, (state, { payload }) => {
        const { updateBannerClicks }: any = payload;

        state.banner.clicks = updateBannerClicks.clicks;
      })
      .addCase(removeBanner.fulfilled, (state, { payload }) => {
        const { deleteBanner }: any = payload;
      });
  },
});

export default appBannerSlice.reducer;
