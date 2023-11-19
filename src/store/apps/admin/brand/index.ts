// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_BRANDS, GET_FILTERED_BRANDS } from "@api/admin/brand";

// ** Others
import { Brand } from "./types";
import { encryptData } from "@core/utils/encryption";

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
        image: "",
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
    const { first, last, after, before, ...rest } = brandData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_BRANDS,
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

// ** Fetch Filtered Brands
export const fetchFilteredBrands = createAsyncThunk<Brand, any, {}>(
  "appBrands/fetchFilteredBrands",
  async (brandData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = brandData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_BRANDS,
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
      });
  },
});

export default appBrandsSlice.reducer;
