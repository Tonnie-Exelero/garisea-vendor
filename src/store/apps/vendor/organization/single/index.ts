// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { UPDATE_LOGO, UPDATE_CERTIFICATE } from "@api/vendor/organization";

// ** Others
import { Organization } from "../types";

// Initial state
const organizationInitialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  address2: "",
  city: "",
  country: "",
  logo: "",
  certificate: "",
};

// ** Update Logo
export const editLogo = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editLogo",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_LOGO,
        variables: { ...organizationData },
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

// ** Update Certificate
export const editCertificate = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editCertificate",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CERTIFICATE,
        variables: { ...organizationData },
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

export const appOrganizationSlice = createSlice({
  name: "appOrganization",
  initialState: {
    organization: <Organization>{
      ...organizationInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editLogo.fulfilled, (state, { payload }) => {
        // Reset organization state.
        state.organization = { ...organizationInitialState };

        const { updateOrganizationLogo }: any = payload;

        state.organization = { ...updateOrganizationLogo };
      })
      .addCase(editCertificate.fulfilled, (state, { payload }) => {
        // Reset organization state.
        state.organization = { ...organizationInitialState };

        const { updateOrganizationCertificate }: any = payload;

        state.organization = { ...updateOrganizationCertificate };
      });
  },
});

export default appOrganizationSlice.reducer;
