// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE } from "@api/admin/role";

// ** Others
import { Role } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const roleInitialState = {
  id: "",
  name: "",
  slug: "",
  description: "",
  ability: "",
  permissions: [
    {
      id: "",
      name: "",
      slug: "",
      description: "",
      subjects: "",
    },
  ],
  users: [
    {
      id: "",
      firstName: "",
      lastName: "",
      image: "",
    },
  ],
};

// ** Create Role
export const addRole = createAsyncThunk<Role, Partial<Role>, {}>(
  "appRole/addRole",
  async (roleData, { rejectWithValue }) => {
    const encryptedData = encryptData(roleData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ROLE,
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

// ** Update Role
export const editRole = createAsyncThunk<Role, Partial<Role>, {}>(
  "appRole/editRole",
  async (roleData, { rejectWithValue }) => {
    const encryptedData = encryptData(roleData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ROLE,
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

// ** Delete Role
export const removeRole = createAsyncThunk<Role, Partial<Role>, {}>(
  "appRole/removeRole",
  async (roleData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: roleData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ROLE,
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

export const appRoleSlice = createSlice({
  name: "appRole",
  initialState: {
    role: <Partial<Role>>{
      ...roleInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRole.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(addRole.fulfilled, (state, { payload }) => {
        // Reset role state.
        state.role = { ...roleInitialState };

        const { createRole }: any = payload;

        state.role = { ...createRole };
      })
      .addCase(addRole.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(editRole.fulfilled, (state, { payload }) => {
        // Reset role state.
        state.role = { ...roleInitialState };

        const { updateRole }: any = payload;

        state.role = { ...updateRole };
      })
      .addCase(removeRole.fulfilled, (state, { payload }) => {
        const { deleteRole }: any = payload;
      });
  },
});

export default appRoleSlice.reducer;
