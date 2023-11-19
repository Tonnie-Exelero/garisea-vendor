// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_MODEL_BY_ID,
  CREATE_MODEL,
  UPDATE_MODEL,
  DELETE_MODEL,
} from "@api/admin/model";

// ** Others
import { Model } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const modelInitialState = {
  id: "",
  name: "",
  slug: "",
  description: "",
  brand: {
    id: "",
    name: "",
  },
};

// ** Fetch Model By ID
export const fetchModelById = createAsyncThunk<Model, { id: string }, {}>(
  "appModel/fetchModelById",
  async (id, { rejectWithValue }) => {
    const encryptedData = encryptData(id);

    try {
      const { data } = await apolloClient.query({
        query: GET_MODEL_BY_ID,
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

// ** Create Model
export const addModel = createAsyncThunk<Model, Partial<Model>, {}>(
  "appModel/addModel",
  async (modelData, { rejectWithValue }) => {
    const encryptedData = encryptData(modelData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MODEL,
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

// ** Update Model
export const editModel = createAsyncThunk<Model, Partial<Model>, {}>(
  "appModel/editModel",
  async (modelData, { rejectWithValue }) => {
    const encryptedData = encryptData(modelData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MODEL,
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

// ** Delete Model
export const removeModel = createAsyncThunk<Model, Partial<Model>, {}>(
  "appModel/removeModel",
  async (modelData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: modelData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MODEL,
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

export const appModelSlice = createSlice({
  name: "appModel",
  initialState: {
    model: <Model>{
      ...modelInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModelById.fulfilled, (state, { payload }) => {
        // Reset model state.
        state.model = { ...modelInitialState };

        const { modelById }: any = payload;

        state.model = { ...modelById };
      })
      .addCase(addModel.fulfilled, (state, { payload }) => {
        // Reset model state.
        state.model = { ...modelInitialState };

        const { createModel }: any = payload;

        state.model = { ...createModel };
      })
      .addCase(editModel.fulfilled, (state, { payload }) => {
        // Reset model state.
        state.model = { ...modelInitialState };

        const { updateModel }: any = payload;

        state.model = { ...updateModel };
      })
      .addCase(removeModel.fulfilled, (state, { payload }) => {
        const { deleteModel }: any = payload;
      });
  },
});

export default appModelSlice.reducer;
