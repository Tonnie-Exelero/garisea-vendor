import { gql } from "@apollo/client";

export const GET_VEHICLES = gql`
  query GetVehicles($first: Int, $last: Int, $after: ID, $before: ID) {
    vehicles(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          entryNo
          vendor {
            id
            firstName
            lastName
            storeLink
            vendorVerified
            organization {
              id
              name
              nicename
            }
          }
          brand {
            id
            name
            slug
          }
          model {
            id
            name
            slug
          }
          trim
          slug
          yearOfManufacture
          yearOfFirstRegistration
          registered
          registrationNo
          condition
          mileage
          mileageMetric
          transmissionType
          fuelType
          engineCapacity
          exteriorColor
          upholstery
          images
          thumbnail
          status
          viewingLocation
          vehicleOriginCountry
          engineType
          driveType
          vinNo
          bodyType
          interiorColor
          steering
          seats
          doors
          listingPrice
          discountedPrice
          allowedPaymentModes
          offerType
          features
          extraInfo
          reserved
          sold
          publishedAt
          impressions
          detailExpands
          interested
          vehicleVerified
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_VEHICLE_BY_ID = gql`
  query GetVehicleById($pl: String!) {
    vehicleById(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const GET_VEHICLE_BY_ENTRY_NO = gql`
  query GetVehicleByEntryNo($pl: String!) {
    vehicleByEntryNo(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const GET_VEHICLE_BY_SLUG = gql`
  query GetVehicleBySlug($pl: String!) {
    vehicleBySlug(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const GET_VEHICLES_BY_VENDOR_ID = gql`
  query GetVehiclesByVendorId(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehiclesByVendorId(
      pl: $pl
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          entryNo
          vendor {
            id
            firstName
            lastName
            storeLink
            vendorVerified
            organization {
              id
              name
              nicename
            }
          }
          brand {
            id
            name
            slug
          }
          model {
            id
            name
            slug
          }
          trim
          slug
          yearOfManufacture
          yearOfFirstRegistration
          registered
          registrationNo
          condition
          mileage
          mileageMetric
          transmissionType
          fuelType
          engineCapacity
          exteriorColor
          upholstery
          images
          thumbnail
          status
          viewingLocation
          vehicleOriginCountry
          engineType
          driveType
          vinNo
          bodyType
          interiorColor
          steering
          seats
          doors
          listingPrice
          discountedPrice
          allowedPaymentModes
          offerType
          features
          extraInfo
          reserved
          sold
          publishedAt
          impressions
          detailExpands
          interested
          vehicleVerified
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_VEHICLES_STATS_ADMIN = gql`
  query GetVehiclesStatsByVendorId {
    vehiclesAdminCount {
      dt
    }
  }
`;

export const GET_VEHICLES_STATS_BY_VENDOR_ID = gql`
  query GetVehiclesStatsByVendorId($pl: String) {
    vehiclesCount(pl: $pl) {
      dt
    }
  }
`;

export const GET_FILTERED_VEHICLES = gql`
  query GetVehiclesFiltered(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehiclesFiltered(
      pl: $pl
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          entryNo
          vendor {
            id
            firstName
            lastName
            storeLink
            vendorVerified
            organization {
              id
              name
              nicename
            }
          }
          brand {
            id
            name
            slug
          }
          model {
            id
            name
            slug
          }
          trim
          slug
          yearOfManufacture
          yearOfFirstRegistration
          registered
          registrationNo
          condition
          mileage
          mileageMetric
          transmissionType
          fuelType
          engineCapacity
          exteriorColor
          upholstery
          images
          thumbnail
          status
          viewingLocation
          vehicleOriginCountry
          engineType
          driveType
          vinNo
          bodyType
          interiorColor
          steering
          seats
          doors
          listingPrice
          discountedPrice
          allowedPaymentModes
          offerType
          features
          extraInfo
          reserved
          sold
          publishedAt
          impressions
          detailExpands
          interested
          vehicleVerified
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_VEHICLE_ANALYTICS = gql`
  query GetVehicleAnalytics($pl: String!) {
    vehicleById(pl: $pl) {
      id
      impressions
      detailExpands
      interested
    }
  }
`;

export const CREATE_VEHICLE = gql`
  mutation CreateVehicle($pl: String!) {
    createVehicle(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($pl: String!) {
    updateVehicle(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const UPDATE_VEHICLE_STATUS = gql`
  mutation UpdateVehicleStatus($pl: String!) {
    updateVehicleStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_VEHICLE_VERIFIED = gql`
  mutation UpdateVehicleVerified($pl: String!) {
    updateVehicleVerified(pl: $pl) {
      id
      vehicleVerified
    }
  }
`;

export const UPDATE_VEHICLE_SLUG = gql`
  mutation UpdateVehicleSlug($pl: String!) {
    updateVehicleSlug(pl: $pl) {
      id
      slug
    }
  }
`;

export const UPDATE_VEHICLE_RESERVED = gql`
  mutation UpdateVehicleReserved($pl: String!) {
    updateVehicleReserved(pl: $pl) {
      id
      reserved
    }
  }
`;

export const UPDATE_VEHICLE_SOLD = gql`
  mutation UpdateVehicleSold($pl: String!) {
    updateVehicleSold(pl: $pl) {
      id
      sold
    }
  }
`;

export const UPDATE_VEHICLE_IMAGES = gql`
  mutation UpdateVehicleImages($pl: String!) {
    updateVehicleImages(pl: $pl) {
      id
      images
    }
  }
`;

export const UPDATE_VEHICLE_THUMBNAIL = gql`
  mutation UpdateVehicleThumbnail($pl: String!) {
    updateVehicleThumbnail(pl: $pl) {
      id
      thumbnail
    }
  }
`;

export const UPDATE_VEHICLE_PUPLISHED_AT = gql`
  mutation UpdateVehiclePublishedAt($pl: String!) {
    updateVehiclePublishedAt(pl: $pl) {
      id
      publishedAt
    }
  }
`;

export const UPDATE_VEHICLE_IMPRESSIONS = gql`
  mutation UpdateVehicleImpressions($pl: String!) {
    updateVehicleImpressions(pl: $pl) {
      id
      impressions
    }
  }
`;

export const UPDATE_VEHICLE_DETAIL_EXPANDS = gql`
  mutation UpdateVehicleDetailExpands($pl: String!) {
    updateVehicleDetailExpands(pl: $pl) {
      id
      detailExpands
    }
  }
`;

export const UPDATE_VEHICLE_INTERESTED = gql`
  mutation UpdateVehicleInterested($pl: String!) {
    updateVehicleInterested(pl: $pl) {
      id
      interested
    }
  }
`;

export const UPDATE_VEHICLE_BASIC = gql`
  mutation UpdateVehicleBasic($pl: String!) {
    updateVehicleBasic(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const UPDATE_VEHICLE_SPECIFICATIONS = gql`
  mutation UpdateVehicleSpecifications($pl: String!) {
    updateVehicleSpecifications(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const UPDATE_VEHICLE_EXTRA_INFO = gql`
  mutation UpdateVehicleExtraInfo($pl: String!) {
    updateVehicleExtraInfo(pl: $pl) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
        }
      }
      brand {
        id
        name
        slug
      }
      model {
        id
        name
        slug
      }
      trim
      slug
      yearOfManufacture
      yearOfFirstRegistration
      registered
      registrationNo
      condition
      mileage
      mileageMetric
      transmissionType
      fuelType
      engineCapacity
      exteriorColor
      upholstery
      images
      thumbnail
      status
      viewingLocation
      vehicleOriginCountry
      engineType
      driveType
      vinNo
      bodyType
      interiorColor
      steering
      seats
      doors
      listingPrice
      discountedPrice
      allowedPaymentModes
      offerType
      features
      extraInfo
      reserved
      sold
      publishedAt
      impressions
      detailExpands
      interested
      vehicleVerified
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($pl: String!) {
    deleteVehicle(pl: $pl) {
      id
      entryNo
    }
  }
`;
