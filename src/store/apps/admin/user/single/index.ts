// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_USER_BY_ID,
  GET_USER_BY_EMAIL,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_PASSWORD,
  UPDATE_IMAGE,
  UPDATE_STATUS,
  UPDATE_EMAIL_VERIFIED,
  DELETE_USER,
} from "@api/admin/user";

// ** Others
import { User } from "../types";
import { encryptData } from "@core/utils/encryption";

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
  onlineStatus: "",
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

// ** Fetch User By ID
export const fetchUserById = createAsyncThunk<User, { id: string }, {}>(
  "appUser/fetchUserById",
  async (id, { rejectWithValue }) => {
    const encryptedData = encryptData(id);

    try {
      const { data } = await apolloClient.query({
        query: GET_USER_BY_ID,
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

// ** Fetch User By Email
export const fetchUserByEmail = createAsyncThunk<User, { email: string }, {}>(
  "appUser/fetchUserByEmail",
  async (email, { rejectWithValue }) => {
    const encryptedData = encryptData(email);

    try {
      const { data } = await apolloClient.query({
        query: GET_USER_BY_EMAIL,
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

// ** Create User
export const addUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/addUser",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData(userData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
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

// ** Update User
export const editUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/editUser",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData(userData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
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

// ** Update Password
export const editPassword = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/editPassword",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData(userData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PASSWORD,
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

// ** Update Image
export const editImage = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/editImage",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData(userData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_IMAGE,
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

// ** Update Status
export const editStatus = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/editStatus",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData(userData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_STATUS,
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

// ** Update Email Verified
export const editEmailVerified = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/editEmailVerified",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData(userData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_EMAIL_VERIFIED,
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

// ** Delete User
export const removeUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUser/removeUser",
  async (userData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: userData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_USER,
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

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    user: <User>{
      ...userInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        if (state.loading === "pending") {
          const { userById }: any = payload;

          state.loading = "";
          state.user = userById;
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchUserByEmail.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        if (state.loading === "pending") {
          const { userByEmail }: any = payload;

          state.loading = "";
          state.user = userByEmail;
        }
      })
      .addCase(addUser.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        if (state.loading === "pending") {
          const { createUser }: any = payload;

          state.loading = "";
          state.user = createUser;
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        const { updateUser }: any = payload;

        state.user = { ...updateUser };
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        const { updatePassword }: any = payload;

        state.user = { ...updatePassword };
      })
      .addCase(editImage.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        const { updateUserImage }: any = payload;

        state.user = { ...updateUserImage };
      })
      .addCase(editStatus.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        const { updateUserStatus }: any = payload;

        state.user = { ...updateUserStatus };
      })
      .addCase(editEmailVerified.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        const { updateUserEmailVerified }: any = payload;

        state.user = { ...updateUserEmailVerified };
      });
  },
});

export default appUserSlice.reducer;
