// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_ORGANIZATION_BY_ID,
  GET_ORGANIZATION_BY_NAME,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  UPDATE_COVER_IMAGE,
  UPDATE_LOGO,
  UPDATE_CERTIFICATE,
  UPDATE_KRA_PIN,
  DELETE_ORGANIZATION,
} from "@api/vendor/organization";

// ** Others
import { Organization } from "../types";
import { encryptData } from "@core/utils/encryption";

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
  coverImage: "",
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
  const encryptedData = encryptData(id);

  try {
    const { data } = await apolloClient.query({
      query: GET_ORGANIZATION_BY_ID,
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
});

// ** Fetch Organization By Name
export const fetchOrganizationByName = createAsyncThunk<Organization, any, {}>(
  "appOrganization/fetchOrganizationByName",
  async (name, { rejectWithValue }) => {
    const encryptedData = encryptData(name);

    try {
      const { data } = await apolloClient.query({
        query: GET_ORGANIZATION_BY_NAME,
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

// ** Create Organization
export const addOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganization/addOrganization",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData(organizationData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ORGANIZATION,
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

// ** Update Organization
export const editOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editOrganization",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData(organizationData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ORGANIZATION,
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

// ** Update Cover Image
export const editCoverImage = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editCoverImage",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData(organizationData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_COVER_IMAGE,
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

// ** Update Logo
export const editLogo = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editLogo",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData(organizationData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_LOGO,
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

// ** Update Certificate
export const editCertificate = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editCertificate",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData(organizationData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CERTIFICATE,
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

// ** Update KRA Pin
export const editKRAPin = createAsyncThunk<Organization, any, {}>(
  "appOrganization/editKRAPin",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData(organizationData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_KRA_PIN,
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

// ** Delete Organization
export const removeOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganization/removeOrganization",
  async (organizationData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: organizationData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ORGANIZATION,
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
      .addCase(editCoverImage.fulfilled, (state, { payload }) => {
        const { updateOrganizationCoverImage }: any = payload;

        state.organization.coverImage = updateOrganizationCoverImage.coverImage;
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
