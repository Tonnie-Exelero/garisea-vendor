// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { CREATE_PERMISSION } from "@api/admin/permission";

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

export const appPermissionSlice = createSlice({
  name: "appPermissions",
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
        // Reset state.
        state.permission = { ...permissionInitialState };

        if (state.loading === "pending") {
          const { createPermission }: any = payload;

          state.loading = "";
          state.permission = createPermission;
        }
      })
      .addCase(addPermission.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appPermissionSlice.reducer;
