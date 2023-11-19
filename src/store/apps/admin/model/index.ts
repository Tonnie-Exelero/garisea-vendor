// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_MODELS,
  GET_FILTERED_MODELS,
  GET_MODELS_BY_BRAND_ID,
} from "@api/admin/model";

// ** Others
import { Model } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const modelsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        name: "",
        slug: "",
        description: "",
        brand: {
          id: "",
          name: "",
        },
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

interface ModelsState {
  edges: {
    cursor: string;
    node: Model;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Models
export const fetchModels = createAsyncThunk<Model, any, {}>(
  "appModels/fetchModels",
  async (modelData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = modelData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_MODELS,
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

// ** Fetch Filtered Models
export const fetchFilteredModels = createAsyncThunk<Model, any, {}>(
  "appModels/fetchFilteredModels",
  async (modelData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = modelData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_MODELS,
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

// ** Fetch Models By Brand
export const fetchModelsByBrand = createAsyncThunk<Model, any, {}>(
  "appModels/fetchModelsByBrand",
  async (modelData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = modelData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_MODELS_BY_BRAND_ID,
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

export const appModelsSlice = createSlice({
  name: "appModels",
  initialState: {
    models: <ModelsState>{
      ...modelsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchModels.fulfilled, (state, { payload }) => {
        // Reset state.
        state.models = { ...modelsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { models }: any = payload;
        state.models = models;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchModelsByBrand.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchModelsByBrand.fulfilled, (state, { payload }) => {
        // Reset state.
        state.models = { ...modelsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { modelsByBrandId }: any = payload;
        state.models = modelsByBrandId;
      })
      .addCase(fetchModelsByBrand.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredModels.fulfilled, (state, { payload }) => {
        // Reset state.
        state.models = { ...modelsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { modelsFiltered }: any = payload;
        state.models = modelsFiltered;
      });
  },
});

export default appModelsSlice.reducer;
