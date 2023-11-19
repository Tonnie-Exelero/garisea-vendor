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
            username
            email
            phone
            image
            storeLink
            address
            city
            country
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
  query GetVehicleById($id: String!) {
    vehicleById(id: $id) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  query GetVehicleByEntryNo($entryNo: String!) {
    vehicleByEntryNo(entryNo: $entryNo) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  query GetVehicleBySlug($slug: String!) {
    vehicleBySlug(slug: $slug) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
    $vendorId: String!
    $status: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehiclesByVendorId(
      vendorId: $vendorId
      status: $status
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
            username
            email
            phone
            image
            storeLink
            address
            city
            country
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

export const GET_VEHICLES_STATS_BY_VENDOR_ID = gql`
  query GetVehiclesStatsByVendorId($vendorId: String) {
    vehiclesCount(vendorId: $vendorId) {
      vehicleVerified
    }
  }
`;

export const GET_FILTERED_VEHICLES = gql`
  query GetVehiclesFiltered(
    $first: Int
    $last: Int
    $after: ID
    $before: ID
    $entryNo: String
    $vendorId: String
    $brandId: String
    $modelId: String
    $minYear: String
    $maxYear: String
    $registered: String
    $condition: String
    $minMileage: Int
    $maxMileage: Int
    $status: String
    $viewingLocation: String
    $vehicleOriginCountry: String
    $transmissionType: String
    $fuelType: String
    $minEngineCapacity: Int
    $maxEngineCapacity: Int
    $exteriorColor: String
    $upholstery: String
    $engineType: String
    $driveType: String
    $bodyType: String
    $interiorColor: String
    $steering: String
    $seats: Int
    $doors: Int
    $minPrice: Int
    $maxPrice: Int
    $hasDiscount: String
    $biggestDiscount: String
    $reserved: String
    $sold: String
    $random: String
    $sortBy: String
  ) {
    vehiclesFiltered(
      first: $first
      last: $last
      after: $after
      before: $before
      entryNo: $entryNo
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      minYear: $minYear
      maxYear: $maxYear
      registered: $registered
      condition: $condition
      minMileage: $minMileage
      maxMileage: $maxMileage
      status: $status
      viewingLocation: $viewingLocation
      vehicleOriginCountry: $vehicleOriginCountry
      transmissionType: $transmissionType
      fuelType: $fuelType
      minEngineCapacity: $minEngineCapacity
      maxEngineCapacity: $maxEngineCapacity
      exteriorColor: $exteriorColor
      upholstery: $upholstery
      engineType: $engineType
      driveType: $driveType
      bodyType: $bodyType
      interiorColor: $interiorColor
      steering: $steering
      seats: $seats
      doors: $doors
      minPrice: $minPrice
      maxPrice: $maxPrice
      hasDiscount: $hasDiscount
      biggestDiscount: $biggestDiscount
      reserved: $reserved
      sold: $sold
      random: $random
      sortBy: $sortBy
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
            username
            email
            phone
            image
            storeLink
            address
            city
            country
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
  query GetVehicleAnalytics($id: String!) {
    vehicleById(id: $id) {
      id
      impressions
      detailExpands
      interested
    }
  }
`;

export const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $entryNo: String!
    $vendorId: String!
    $brandId: String!
    $modelId: String!
    $trim: String
    $slug: String
    $yearOfManufacture: String
    $yearOfFirstRegistration: String
    $registered: String
    $registrationNo: String
    $condition: String
    $mileage: Int
    $mileageMetric: String
    $transmissionType: String
    $fuelType: String
    $engineCapacity: Int
    $exteriorColor: String
    $upholstery: String
    $images: String
    $thumbnail: String
    $status: String
    $viewingLocation: String
    $vehicleOriginCountry: String
    $engineType: String
    $driveType: String
    $vinNo: String
    $bodyType: String
    $interiorColor: String
    $steering: String
    $seats: Int
    $doors: Int
    $listingPrice: Int
    $discountedPrice: Int
    $discountAmount: Int
    $allowedPaymentModes: String
    $offerType: String
    $features: String
    $extraInfo: String
    $reserved: String
    $sold: String
    $publishedAt: String
    $impressions: Int
    $detailExpands: Int
    $interested: Int
    $vehicleVerified: String
  ) {
    createVehicle(
      entryNo: $entryNo
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      trim: $trim
      slug: $slug
      yearOfManufacture: $yearOfManufacture
      yearOfFirstRegistration: $yearOfFirstRegistration
      registered: $registered
      registrationNo: $registrationNo
      condition: $condition
      mileage: $mileage
      mileageMetric: $mileageMetric
      transmissionType: $transmissionType
      fuelType: $fuelType
      engineCapacity: $engineCapacity
      exteriorColor: $exteriorColor
      upholstery: $upholstery
      images: $images
      thumbnail: $thumbnail
      status: $status
      viewingLocation: $viewingLocation
      vehicleOriginCountry: $vehicleOriginCountry
      engineType: $engineType
      driveType: $driveType
      vinNo: $vinNo
      bodyType: $bodyType
      interiorColor: $interiorColor
      steering: $steering
      seats: $seats
      doors: $doors
      listingPrice: $listingPrice
      discountedPrice: $discountedPrice
      discountAmount: $discountAmount
      allowedPaymentModes: $allowedPaymentModes
      offerType: $offerType
      features: $features
      extraInfo: $extraInfo
      reserved: $reserved
      sold: $sold
      publishedAt: $publishedAt
      impressions: $impressions
      detailExpands: $detailExpands
      interested: $interested
      vehicleVerified: $vehicleVerified
    ) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  mutation UpdateVehicle(
    $id: String!
    $vendorId: String
    $brandId: String
    $modelId: String
    $trim: String
    $slug: String
    $yearOfManufacture: String
    $yearOfFirstRegistration: String
    $registered: String
    $registrationNo: String
    $condition: String
    $mileage: Int
    $mileageMetric: String
    $transmissionType: String
    $fuelType: String
    $engineCapacity: Int
    $exteriorColor: String
    $upholstery: String
    $images: String
    $viewingLocation: String
    $vehicleOriginCountry: String
    $engineType: String
    $driveType: String
    $vinNo: String
    $bodyType: String
    $interiorColor: String
    $steering: String
    $seats: Int
    $doors: Int
    $listingPrice: Int
    $discountedPrice: Int
    $discountAmount: Int
    $allowedPaymentModes: String
    $offerType: String
    $features: String
    $extraInfo: String
    $reserved: String
    $sold: String
  ) {
    updateVehicle(
      id: $id
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      trim: $trim
      slug: $slug
      yearOfManufacture: $yearOfManufacture
      yearOfFirstRegistration: $yearOfFirstRegistration
      registered: $registered
      registrationNo: $registrationNo
      condition: $condition
      mileage: $mileage
      mileageMetric: $mileageMetric
      transmissionType: $transmissionType
      fuelType: $fuelType
      engineCapacity: $engineCapacity
      exteriorColor: $exteriorColor
      upholstery: $upholstery
      images: $images
      viewingLocation: $viewingLocation
      vehicleOriginCountry: $vehicleOriginCountry
      engineType: $engineType
      driveType: $driveType
      vinNo: $vinNo
      bodyType: $bodyType
      interiorColor: $interiorColor
      steering: $steering
      seats: $seats
      doors: $doors
      listingPrice: $listingPrice
      discountedPrice: $discountedPrice
      discountAmount: $discountAmount
      allowedPaymentModes: $allowedPaymentModes
      offerType: $offerType
      features: $features
      extraInfo: $extraInfo
      reserved: $reserved
      sold: $sold
    ) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  mutation UpdateVehicleStatus($id: String!, $status: String) {
    updateVehicleStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const UPDATE_VEHICLE_VERIFIED = gql`
  mutation UpdateVehicleVerified($id: String!, $vehicleVerified: String) {
    updateVehicleVerified(id: $id, vehicleVerified: $vehicleVerified) {
      id
      vehicleVerified
    }
  }
`;

export const UPDATE_VEHICLE_SLUG = gql`
  mutation UpdateVehicleSlug($id: String!, $slug: String) {
    updateVehicleSlug(id: $id, slug: $slug) {
      id
      slug
    }
  }
`;

export const UPDATE_VEHICLE_RESERVED = gql`
  mutation UpdateVehicleReserved($id: String!, $reserved: String) {
    updateVehicleReserved(id: $id, reserved: $reserved) {
      id
      reserved
    }
  }
`;

export const UPDATE_VEHICLE_SOLD = gql`
  mutation UpdateVehicleSold($id: String!, $sold: String) {
    updateVehicleSold(id: $id, sold: $sold) {
      id
      sold
    }
  }
`;

export const UPDATE_VEHICLE_IMAGES = gql`
  mutation UpdateVehicleImages($id: String!, $images: String) {
    updateVehicleImages(id: $id, images: $images) {
      id
      images
    }
  }
`;

export const UPDATE_VEHICLE_THUMBNAIL = gql`
  mutation UpdateVehicleThumbnail($id: String!, $thumbnail: String) {
    updateVehicleThumbnail(id: $id, thumbnail: $thumbnail) {
      id
      thumbnail
    }
  }
`;

export const UPDATE_VEHICLE_PUPLISHED_AT = gql`
  mutation UpdateVehiclePublishedAt($id: String!, $publishedAt: String) {
    updateVehiclePublishedAt(id: $id, publishedAt: $publishedAt) {
      id
      publishedAt
    }
  }
`;

export const UPDATE_VEHICLE_IMPRESSIONS = gql`
  mutation UpdateVehicleImpressions($id: String!, $impressions: Int) {
    updateVehicleImpressions(id: $id, impressions: $impressions) {
      id
      impressions
    }
  }
`;

export const UPDATE_VEHICLE_DETAIL_EXPANDS = gql`
  mutation UpdateVehicleDetailExpands($id: String!, $detailExpands: Int) {
    updateVehicleDetailExpands(id: $id, detailExpands: $detailExpands) {
      id
      detailExpands
    }
  }
`;

export const UPDATE_VEHICLE_INTERESTED = gql`
  mutation UpdateVehicleInterested($id: String!, $interested: Int) {
    updateVehicleInterested(id: $id, interested: $interested) {
      id
      interested
    }
  }
`;

export const UPDATE_VEHICLE_BASIC = gql`
  mutation UpdateVehicleBasic(
    $id: String!
    $vendorId: String
    $brandId: String
    $modelId: String
    $trim: String
    $slug: String
    $yearOfManufacture: String
    $yearOfFirstRegistration: String
    $registered: String
    $registrationNo: String
    $condition: String
    $viewingLocation: String
    $vehicleOriginCountry: String
    $mileage: Int
    $mileageMetric: String
    $listingPrice: Int
    $discountedPrice: Int
    $discountAmount: Int
  ) {
    updateVehicleBasic(
      id: $id
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      trim: $trim
      slug: $slug
      yearOfManufacture: $yearOfManufacture
      yearOfFirstRegistration: $yearOfFirstRegistration
      registered: $registered
      registrationNo: $registrationNo
      viewingLocation: $viewingLocation
      vehicleOriginCountry: $vehicleOriginCountry
      condition: $condition
      mileage: $mileage
      mileageMetric: $mileageMetric
      listingPrice: $listingPrice
      discountedPrice: $discountedPrice
      discountAmount: $discountAmount
    ) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  mutation UpdateVehicleSpecifications(
    $id: String!
    $transmissionType: String
    $fuelType: String
    $engineCapacity: Int
    $exteriorColor: String
    $upholstery: String
    $engineType: String
    $driveType: String
    $bodyType: String
    $interiorColor: String
    $steering: String
    $seats: Int
    $doors: Int
  ) {
    updateVehicleSpecifications(
      id: $id
      transmissionType: $transmissionType
      fuelType: $fuelType
      engineCapacity: $engineCapacity
      exteriorColor: $exteriorColor
      upholstery: $upholstery
      engineType: $engineType
      driveType: $driveType
      bodyType: $bodyType
      interiorColor: $interiorColor
      steering: $steering
      seats: $seats
      doors: $doors
    ) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  mutation UpdateVehicleExtraInfo(
    $id: String!
    $vinNo: String
    $allowedPaymentModes: String
    $offerType: String
    $features: String
    $extraInfo: String
  ) {
    updateVehicleExtraInfo(
      id: $id
      vinNo: $vinNo
      allowedPaymentModes: $allowedPaymentModes
      offerType: $offerType
      features: $features
      extraInfo: $extraInfo
    ) {
      id
      entryNo
      vendor {
        id
        firstName
        lastName
        username
        email
        phone
        image
        storeLink
        address
        city
        country
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
  mutation DeleteVehicle($id: String!) {
    deleteVehicle(id: $id) {
      id
      entryNo
    }
  }
`;
