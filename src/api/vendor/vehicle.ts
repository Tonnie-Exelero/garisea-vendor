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
            address
            city
            country
          }
          brand {
            id
            name
          }
          model {
            id
            name
          }
          trim
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
          views
          extraInfo
          reserved
          sold
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
    }
  }
`;

export const GET_VEHICLES_BY_VENDOR_ID = gql`
  query GetVehiclesByVendorId(
    $vendorId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehiclesByVendorId(
      vendorId: $vendorId
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
            address
            city
            country
          }
          brand {
            id
            name
          }
          model {
            id
            name
          }
          trim
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
          views
          extraInfo
          reserved
          sold
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

export const GET_FILTERED_VEHICLES = gql`
  query GetVehiclesFiltered(
    $first: Int
    $last: Int
    $after: ID
    $before: ID
    $vendorId: String
    $brandId: String
    $modelId: String
    $minYear: String
    $maxYear: String
    $registered: String
    $condition: String
    $minMileage: Int
    $maxMileage: Int
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
  ) {
    vehiclesFiltered(
      first: $first
      last: $last
      after: $after
      before: $before
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      minYear: $minYear
      maxYear: $maxYear
      registered: $registered
      condition: $condition
      minMileage: $minMileage
      maxMileage: $maxMileage
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
            address
            city
            country
          }
          brand {
            id
            name
          }
          model {
            id
            name
          }
          trim
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
          views
          extraInfo
          reserved
          sold
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

export const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $entryNo: String!
    $vendorId: String!
    $brandId: String!
    $modelId: String!
    $trim: String
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
    $allowedPaymentModes: String
    $offerType: String
    $features: String
    $views: Int
    $extraInfo: String
    $reserved: String
    $sold: String
  ) {
    createVehicle(
      entryNo: $entryNo
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      trim: $trim
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
      allowedPaymentModes: $allowedPaymentModes
      offerType: $offerType
      features: $features
      views: $views
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
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
    $allowedPaymentModes: String
    $offerType: String
    $features: String
    $views: Int
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
      allowedPaymentModes: $allowedPaymentModes
      offerType: $offerType
      features: $features
      views: $views
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
    }
  }
`;

export const UPDATE_VEHICLE_RESERVED = gql`
  mutation UpdateVehicleReserved($id: String!, $reserved: String) {
    updateVehicleReserved(id: $id, reserved: $reserved) {
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
    }
  }
`;

export const UPDATE_VEHICLE_SOLD = gql`
  mutation UpdateVehicleSold($id: String!, $sold: String) {
    updateVehicleSold(id: $id, sold: $sold) {
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
    }
  }
`;

export const UPDATE_VEHICLE_IMAGES = gql`
  mutation UpdateVehicleImages($id: String!, $images: String) {
    updateVehicleImages(id: $id, images: $images) {
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
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
    $yearOfManufacture: String
    $yearOfFirstRegistration: String
    $registered: String
    $registrationNo: String
    $condition: String
    $mileage: Int
    $mileageMetric: String
    $listingPrice: Int
    $discountedPrice: Int
  ) {
    updateVehicleBasic(
      id: $id
      vendorId: $vendorId
      brandId: $brandId
      modelId: $modelId
      trim: $trim
      yearOfManufacture: $yearOfManufacture
      yearOfFirstRegistration: $yearOfFirstRegistration
      registered: $registered
      registrationNo: $registrationNo
      condition: $condition
      mileage: $mileage
      mileageMetric: $mileageMetric
      listingPrice: $listingPrice
      discountedPrice: $discountedPrice
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
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
    $views: Int
    $extraInfo: String
  ) {
    updateVehicleExtraInfo(
      id: $id
      vinNo: $vinNo
      allowedPaymentModes: $allowedPaymentModes
      offerType: $offerType
      features: $features
      views: $views
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
        address
        city
        country
      }
      brand {
        id
        name
      }
      model {
        id
        name
      }
      trim
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
      views
      extraInfo
      reserved
      sold
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
