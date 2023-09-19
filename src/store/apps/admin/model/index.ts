// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_MODELS,
  GET_FILTERED_MODELS,
  GET_MODELS_BY_BRAND_ID,
  CREATE_MODEL,
  UPDATE_MODEL,
  DELETE_MODEL,
} from "@api/admin/model";

// ** Others
import { Model } from "./types";
import { generateRandomString } from "@utils/random-string";

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
    try {
      const { data } = await apolloClient.query({
        query: GET_MODELS,
        variables: modelData,
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
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_MODELS,
        variables: modelData,
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
export const fetchModelsByBrand = createAsyncThunk<
  Model,
  { brandId: string },
  {}
>("appModels/fetchModelsByBrand", async (brandId, { rejectWithValue }) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_MODELS_BY_BRAND_ID,
      variables: { ...brandId, first: 20 },
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

// ** Create Model
export const addModel = createAsyncThunk<Model, Partial<Model>, {}>(
  "appModels/addModel",
  async (modelData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MODEL,
        variables: { ...modelData },
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

// ** Update Model
export const editModel = createAsyncThunk<Model, Partial<Model>, {}>(
  "appModels/editModel",
  async (modelData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MODEL,
        variables: { ...modelData },
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

// ** Delete Model
export const removeModel = createAsyncThunk<Model, Partial<Model>, {}>(
  "appModels/removeModel",
  async (modelData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MODEL,
        variables: { id: modelData.id },
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
      })
      .addCase(addModel.fulfilled, (state, { payload }) => {
        const { createModel }: any = payload;

        const newModel = {
          cursor: generateRandomString(12),
          node: { ...createModel },
        };
        state.models.edges.push(newModel);
      })
      .addCase(editModel.fulfilled, (state, { payload }) => {
        const { updateModel }: any = payload;
        const { id, ...rest } = updateModel;

        state.models.edges.some((perm) => {
          if (perm.node.id === updateModel.id) {
            return {
              ...perm,
              node: {
                ...perm.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(removeModel.fulfilled, (state, { payload }) => {
        const { deleteModel }: any = payload;

        if (
          state.models.edges.some((model) => model.node.id === deleteModel.id)
        ) {
          state.models.edges.filter(
            (model) => model.node.id !== deleteModel.id
          );
        }
      });
  },
});

export default appModelsSlice.reducer;
