// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_BRANDS,
  GET_FILTERED_BRANDS,
  CREATE_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "@api/admin/brand";

// ** Others
import { Brand } from "./types";
import { generateRandomString } from "@utils/random-string";

// Initial state.
export const brandsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        name: "",
        slug: "",
        description: "",
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

interface BrandsState {
  edges: {
    cursor: string;
    node: Brand;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Brands
export const fetchBrands = createAsyncThunk<Brand, any, {}>(
  "appBrands/fetchBrands",
  async (brandData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_BRANDS,
        variables: brandData,
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

// ** Fetch Filtered Brands
export const fetchFilteredBrands = createAsyncThunk<Brand, any, {}>(
  "appBrands/fetchFilteredBrands",
  async (brandData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_BRANDS,
        variables: brandData,
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

// ** Create Brand
export const addBrand = createAsyncThunk<Brand, Partial<Brand>, {}>(
  "appBrands/addBrand",
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
  "appBrands/editBrand",
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
  "appBrands/removeBrand",
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

export const appBrandsSlice = createSlice({
  name: "appBrands",
  initialState: {
    brands: <BrandsState>{
      ...brandsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchBrands.fulfilled, (state, { payload }) => {
        // Reset state.
        state.brands = { ...brandsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { brands }: any = payload;
        state.brands = brands;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredBrands.fulfilled, (state, { payload }) => {
        // Reset state.
        state.brands = { ...brandsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { brandsFiltered }: any = payload;
        state.brands = brandsFiltered;
      })
      .addCase(addBrand.fulfilled, (state, { payload }) => {
        const { createBrand }: any = payload;

        const newBrand = {
          cursor: generateRandomString(12),
          node: { ...createBrand },
        };
        state.brands.edges.push(newBrand);
      })
      .addCase(editBrand.fulfilled, (state, { payload }) => {
        const { updateBrand }: any = payload;
        const { id, ...rest } = updateBrand;

        state.brands.edges.some((perm) => {
          if (perm.node.id === updateBrand.id) {
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
      .addCase(removeBrand.fulfilled, (state, { payload }) => {
        const { deleteBrand }: any = payload;

        if (
          state.brands.edges.some((brand) => brand.node.id === deleteBrand.id)
        ) {
          state.brands.edges.filter(
            (brand) => brand.node.id !== deleteBrand.id
          );
        }
      });
  },
});

export default appBrandsSlice.reducer;
