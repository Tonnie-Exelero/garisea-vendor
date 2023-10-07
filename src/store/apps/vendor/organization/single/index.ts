// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_ORGANIZATION_BY_ID,
  GET_ORGANIZATION_BY_NAME,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  UPDATE_LOGO,
  UPDATE_CERTIFICATE,
  UPDATE_KRA_PIN,
  DELETE_ORGANIZATION,
} from "@api/vendor/organization";

// ** Others
import { Organization } from "../types";

// Initial state
const organizationInitialState = {
  id: "",
  name: "",
  nicename: "",
  email: "",
  phone: "",
  address: "",
  address2: "",
  city: "",
  country: "",
  logo: "",
  certificate: "",
  kraPin: "",
};

// ** Fetch Organization By ID
export const fetchOrganizationById = createAsyncThunk<
  Organization,
  { id: string },
  {}
>("appOrganization/fetchOrganizationById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_ORGANIZATION_BY_ID,
      variables: { ...id },
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
});

// ** Fetch Organization By Name
export const fetchOrganizationByName = createAsyncThunk<Organization, any, {}>(
  "appOrganization/fetchOrganizationByName",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_ORGANIZATION_BY_NAME,
        variables: { ...name },
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

// ** Create Organization
export const addOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganization/addOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ORGANIZATION,
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

// ** Update Organization
export const editOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ORGANIZATION,
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

// ** Update KRA Pin
export const editKRAPin = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editKRAPin",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_KRA_PIN,
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

// ** Delete Organization
export const removeOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganization/removeOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ORGANIZATION,
        variables: { id: organizationData.id },
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
      .addCase(fetchOrganizationById.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchOrganizationById.fulfilled, (state, { payload }) => {
        // Reset organization state.
        state.organization = { ...organizationInitialState };

        if (state.loading === "pending") {
          const { organizationById }: any = payload;

          state.loading = "";
          state.organization = organizationById;
        }
      })
      .addCase(fetchOrganizationById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchOrganizationByName.fulfilled, (state, { payload }) => {
        // Reset organization state.
        state.organization = { ...organizationInitialState };

        const { organizationByName }: any = payload;

        state.organization = { ...organizationByName };
      })
      .addCase(addOrganization.fulfilled, (state, { payload }) => {
        // Reset organization state.
        state.organization = { ...organizationInitialState };

        const { createOrganization }: any = payload;

        state.organization = { ...createOrganization };
      })

      .addCase(editOrganization.fulfilled, (state, { payload }) => {
        // Reset organization state.
        state.organization = { ...organizationInitialState };

        const { updateOrganization }: any = payload;

        state.organization = { ...updateOrganization };
      })
      .addCase(editLogo.fulfilled, (state, { payload }) => {
        const { updateOrganizationLogo }: any = payload;

        state.organization.logo = updateOrganizationLogo.logo;
      })
      .addCase(editCertificate.fulfilled, (state, { payload }) => {
        const { updateOrganizationCertificate }: any = payload;

        state.organization.certificate =
          updateOrganizationCertificate.certificate;
      })
      .addCase(editKRAPin.fulfilled, (state, { payload }) => {
        const { updateOrganizationKRAPin }: any = payload;

        state.organization.kraPin = updateOrganizationKRAPin.kraPin;
      })
      .addCase(removeOrganization.fulfilled, (state, { payload }) => {
        const { deleteOrganization }: any = payload;
      });
  },
});

export default appOrganizationSlice.reducer;
