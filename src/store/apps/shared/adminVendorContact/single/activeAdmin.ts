// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_USER_BY_ID } from "@api/admin/user";

// ** Others
import { User } from "../../../admin/user/types";
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
export const fetchActiveAdminById = createAsyncThunk<User, { id: string }, {}>(
  "appAdminVendorContact/fetchActiveAdminById",
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

export const appAdminVendorActiveContactSlice = createSlice({
  name: "appAdminVendorContact",
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
      .addCase(fetchActiveAdminById.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchActiveAdminById.fulfilled, (state, { payload }) => {
        // Reset user state.
        state.user = { ...userInitialState };

        if (state.loading === "pending") {
          const { userById }: any = payload;

          state.loading = "";
          state.user = userById;
        }
      })
      .addCase(fetchActiveAdminById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appAdminVendorActiveContactSlice.reducer;
