// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  UPDATE_USER,
  UPDATE_PASSWORD,
  UPDATE_IMAGE,
  DELETE_USER,
} from "@api/admin/user";
import { LOGIN } from "@api/admin/auth";

// ** Others
import { User } from "../admin/user/types";

// ** User initial state
const userInitialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  image: "",
  language: "",
  status: "",
  address: "",
  city: "",
  country: "",
  token: "",
  emailVerified: "",
  role: {
    id: "",
    name: "",
    slug: "",
    ability: "",
    permissions: [
      {
        id: "",
        name: "",
        slug: "",
        subjects: "",
      },
    ],
  },
};

// ** Login User
export const signIn = createAsyncThunk<User, Partial<User>, {}>(
  "appAuth/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN,
        variables: { ...userData },
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

// ** Update User
export const editUser = createAsyncThunk<User, Partial<User>, {}>(
  "authedUser/editUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: { ...userData },
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

// ** Update Password
export const editPassword = createAsyncThunk<User, Partial<User>, {}>(
  "authedUser/editPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PASSWORD,
        variables: { ...userData },
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

// ** Update Image
export const editImage = createAsyncThunk<User, Partial<User>, {}>(
  "authedUser/editImage",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_IMAGE,
        variables: { ...userData },
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

// ** Delete User
export const removeUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUsers/removeUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_USER,
        variables: { id: userData.id },
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

export const authedUserSlice = createSlice({
  name: "authedUser",
  initialState: {
    authedUser: <User>{
      ...userInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const { loginUser }: any = payload;

        if (state.loading === "pending") {
          state.loading = "";
          state.authedUser = loginUser;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.authedUser = { ...userInitialState };

        const { updateUser }: any = payload;

        state.authedUser = { ...updateUser };
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.authedUser = { ...userInitialState };

        const { updatePassword }: any = payload;

        state.authedUser = { ...updatePassword };
      })
      .addCase(editImage.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.authedUser = { ...userInitialState };

        const { updateUserImage }: any = payload;

        state.authedUser = { ...updateUserImage };
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        const { deleteUser }: any = payload;
      });
  },
});

export default authedUserSlice.reducer;
