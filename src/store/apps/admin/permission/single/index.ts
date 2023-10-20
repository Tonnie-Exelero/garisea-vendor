// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
} from "@api/admin/permission";

// ** Others
import { Permission } from "../types";

// Initial state.
const permissionInitialState = {
  id: "",
  name: "",
  slug: "",
  description: "",
  subjects: "",
};

// ** Create Permission
export const addPermission = createAsyncThunk<
  Permission,
  Partial<Permission>,
  {}
>(
  "appPermission/addPermission",
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
  "appPermission/editPermission",
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
  "appPermission/removePermission",
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

export const appPermissionSlice = createSlice({
  name: "appPermission",
  initialState: {
    permission: <Permission>{
      ...permissionInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPermission.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(addPermission.fulfilled, (state, { payload }) => {
        // Reset permission state.
        state.permission = { ...permissionInitialState };

        const { createPermission }: any = payload;

        state.permission = { ...createPermission };
      })
      .addCase(addPermission.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })

      .addCase(editPermission.fulfilled, (state, { payload }) => {
        // Reset permission state.
        state.permission = { ...permissionInitialState };

        const { updatePermission }: any = payload;

        state.permission = { ...updatePermission };
      })
      .addCase(removePermission.fulfilled, (state, { payload }) => {
        const { deletePermission }: any = payload;
      });
  },
});

export default appPermissionSlice.reducer;
