// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { CREATE_ROLE } from "@api/admin/role";

// ** Others
import { Role } from "../types";

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
  "appRoles/addRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ROLE,
        variables: { ...roleData },
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
  name: "appRoles",
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
        // Reset state.
        state.role = { ...roleInitialState };

        if (state.loading === "pending") {
          const { createRole }: any = payload;

          state.loading = "";
          state.role = createRole;
        }
      })
      .addCase(addRole.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appRoleSlice.reducer;
