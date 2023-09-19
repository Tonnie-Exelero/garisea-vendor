// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_PERMISSIONS,
  GET_FILTERED_PERMISSIONS,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
} from "@api/admin/permission";

// ** Others
import { Permission } from "./types";
import { generateRandomString } from "@utils/random-string";

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
    try {
      const { data } = await apolloClient.query({
        query: GET_PERMISSIONS,
        variables: permissionData,
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
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_PERMISSIONS,
        variables: permissionData,
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

// ** Create Permission
export const addPermission = createAsyncThunk<
  Permission,
  Partial<Permission>,
  {}
>(
  "appPermissions/addPermission",
  async (permissionData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PERMISSION,
        variables: { ...permissionData },
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

// ** Update Permission
export const editPermission = createAsyncThunk<
  Permission,
  Partial<Permission>,
  {}
>(
  "appPermissions/editPermission",
  async (permissionData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PERMISSION,
        variables: { ...permissionData },
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

// ** Delete Permission
export const removePermission = createAsyncThunk<
  Permission,
  Partial<Permission>,
  {}
>(
  "appPermissions/removePermission",
  async (permissionData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_PERMISSION,
        variables: { id: permissionData.id },
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
      })
      .addCase(addPermission.fulfilled, (state, { payload }) => {
        const { createPermission }: any = payload;

        const newPermission = {
          cursor: generateRandomString(12),
          node: { ...createPermission },
        };
        state.permissions.edges.push(newPermission);
      })
      .addCase(editPermission.fulfilled, (state, { payload }) => {
        const { updatePermission }: any = payload;
        const { id, ...rest } = updatePermission;

        state.permissions.edges.some((perm) => {
          if (perm.node.id === updatePermission.id) {
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
      .addCase(removePermission.fulfilled, (state, { payload }) => {
        const { deletePermission }: any = payload;

        if (
          state.permissions.edges.some(
            (permission) => permission.node.id === deletePermission.id
          )
        ) {
          state.permissions.edges.filter(
            (permission) => permission.node.id !== deletePermission.id
          );
        }
      });
  },
});

export default appPermissionsSlice.reducer;
