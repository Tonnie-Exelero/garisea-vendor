// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import authedVendor from "@redux/apps/auth";
import adminVendorContacts from "@redux/apps/shared/adminVendorContact";
import singleAdminVendorContact from "@redux/apps/shared/adminVendorContact/single";
import activeAdminVendorContact from "@redux/apps/shared/adminVendorContact/single/activeAdmin";
import adminVendorMessages from "@redux/apps/shared/adminVendorMessage";
import singleAdminVendorMessage from "@redux/apps/shared/adminVendorMessage/single";
import vendorCustomerContacts from "@redux/apps/shared/vendorCustomerContact";
import singleVendorCustomerContact from "@redux/apps/shared/vendorCustomerContact/single";
import activeVendorCustomerContact from "@redux/apps/shared/vendorCustomerContact/single/activeCustomer";
import vendorCustomerMessages from "@redux/apps/shared/vendorCustomerMessage";
import singleVendorCustomerMessage from "@redux/apps/shared/vendorCustomerMessage/single";
import vendorReviews from "@redux/apps/shared/vendorReview";
import singleVendorReview from "@redux/apps/shared/vendorReview/single";
import vehicleReviews from "@redux/apps/shared/vehicleReview";
import singleVehicleReview from "@redux/apps/shared/vehicleReview/single";
import vendors from "@redux/apps/vendor/vendor";
import singleVendor from "@redux/apps/vendor/vendor/single";
import customers from "@redux/apps/frontend/customer";
import singleCustomer from "@redux/apps/frontend/customer/single";
import permissions from "@redux/apps/admin/permission";
import singlePermission from "@redux/apps/admin/permission/single";
import roles from "@redux/apps/admin/role";
import singleRole from "@redux/apps/admin/role/single";
import brands from "@redux/apps/admin/brand";
import singleBrand from "@redux/apps/admin/brand/single";
import models from "@redux/apps/admin/model";
import singleModel from "@redux/apps/admin/model/single";
import vehicles from "@redux/apps/vendor/vehicle";
import singleVehicle from "@redux/apps/vendor/vehicle/single";
import organizations from "@redux/apps/vendor/organization";
import singleOrganization from "@redux/apps/vendor/organization/single";
import mainCarousels from "@redux/apps/admin/mainCarousel";
import singleMainCarousel from "@redux/apps/admin/mainCarousel/single";
import banners from "@redux/apps/admin/banner";
import singleBanner from "@redux/apps/admin/banner/single";
import featuredVendors from "@redux/apps/admin/featuredVendor";
import singleFeaturedVendor from "@redux/apps/admin/featuredVendor/single";
import featuredVehicles from "@redux/apps/admin/featuredVehicle";
import singleFeaturedVehicle from "@redux/apps/admin/featuredVehicle/single";

export const store = configureStore({
  reducer: {
    authedVendor,
    adminVendorContacts,
    singleAdminVendorContact,
    activeAdminVendorContact,
    adminVendorMessages,
    singleAdminVendorMessage,
    vendorCustomerContacts,
    singleVendorCustomerContact,
    activeVendorCustomerContact,
    vendorCustomerMessages,
    singleVendorCustomerMessage,
    vendorReviews,
    singleVendorReview,
    vehicleReviews,
    singleVehicleReview,
    vendors,
    singleVendor,
    customers,
    singleCustomer,
    permissions,
    singlePermission,
    roles,
    singleRole,
    brands,
    singleBrand,
    models,
    singleModel,
    vehicles,
    singleVehicle,
    organizations,
    singleOrganization,
    mainCarousels,
    singleMainCarousel,
    banners,
    singleBanner,
    featuredVendors,
    singleFeaturedVendor,
    featuredVehicles,
    singleFeaturedVehicle,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
