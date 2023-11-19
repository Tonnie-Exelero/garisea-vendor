// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_PERMISSIONS,
  GET_FILTERED_PERMISSIONS,
} from "@api/admin/permission";

// ** Others
import { Permission } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const permissionsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        name: "",
        slug: "",
        description: "",
        subjects: "",
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

interface PermissionsState {
  edges: {
    cursor: string;
    node: Permission;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Permissions
export const fetchPermissions = createAsyncThunk<Permission, any, {}>(
  "appPermissions/fetchPermissions",
  async (permissionData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = permissionData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_PERMISSIONS,
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

// ** Fetch Filtered Permissions
export const fetchFilteredPermissions = createAsyncThunk<Permission, any, {}>(
  "appPermissions/fetchFilteredPermissions",
  async (permissionData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = permissionData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_PERMISSIONS,
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

export const appPermissionsSlice = createSlice({
  name: "appPermissions",
  initialState: {
    permissions: <PermissionsState>{
      ...permissionsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchPermissions.fulfilled, (state, { payload }) => {
        // Reset state.
        state.permissions = { ...permissionsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { permissions }: any = payload;
        state.permissions = permissions;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredPermissions.fulfilled, (state, { payload }) => {
        // Reset state.
        state.permissions = { ...permissionsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { permissionsFiltered }: any = payload;
        state.permissions = permissionsFiltered;
      });
  },
});

export default appPermissionsSlice.reducer;
