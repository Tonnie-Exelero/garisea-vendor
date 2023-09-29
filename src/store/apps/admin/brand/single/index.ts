// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { CREATE_BRAND, UPDATE_BRAND, DELETE_BRAND } from "@api/admin/brand";

// ** Others
import { Brand } from "../types";

// Initial state.
export const brandInitialState = {
  id: "",
  name: "",
  slug: "",
  description: "",
};

// ** Create Brand
export const addBrand = createAsyncThunk<Brand, Partial<Brand>, {}>(
  "appBrand/addBrand",
  async (brandData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_BRAND,
        variables: { ...brandData },
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

// ** Update Brand
export const editBrand = createAsyncThunk<Brand, Partial<Brand>, {}>(
  "appBrand/editBrand",
  async (brandData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_BRAND,
        variables: { ...brandData },
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

// ** Delete Brand
export const removeBrand = createAsyncThunk<Brand, Partial<Brand>, {}>(
  "appBrand/removeBrand",
  async (brandData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_BRAND,
        variables: { id: brandData.id },
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

export const appBrandSlice = createSlice({
  name: "appBrand",
  initialState: {
    brand: <Brand>{
      ...brandInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBrand.fulfilled, (state, { payload }) => {
        // Reset brand state.
        state.brand = { ...brandInitialState };

        const { createBrand }: any = payload;

        state.brand = { ...createBrand };
      })
      .addCase(editBrand.fulfilled, (state, { payload }) => {
        // Reset brand state.
        state.brand = { ...brandInitialState };

        const { updateBrand }: any = payload;

        state.brand = { ...updateBrand };
      })
      .addCase(removeBrand.fulfilled, (state, { payload }) => {
        const { deleteBrand }: any = payload;
      });
  },
});

export default appBrandSlice.reducer;