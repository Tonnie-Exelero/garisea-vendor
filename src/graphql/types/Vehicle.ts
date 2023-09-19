import prisma from "@src/lib/prisma";
import { builder } from "../builder";

export const Vehicle = builder.prismaObject("Vehicle", {
  fields: (t) => ({
    id: t.exposeID("id"),
    entryNo: t.exposeString("entryNo", { nullable: false }),
    vendor: t.relation("vendor", { nullable: false }),
    brand: t.relation("brand", { nullable: false }),
    model: t.relation("model", { nullable: false }),
    trim: t.exposeString("trim", { nullable: true }),
    yearOfManufacture: t.exposeString("yearOfManufacture", { nullable: true }),
    yearOfFirstRegistration: t.exposeString("yearOfFirstRegistration", {
      nullable: true,
    }),
    registered: t.exposeString("registered", { nullable: true }),
    registrationNo: t.exposeString("registrationNo", { nullable: true }),
    condition: t.exposeString("condition", { nullable: true }),
    mileage: t.exposeInt("mileage", { nullable: true }),
    mileageMetric: t.exposeString("mileageMetric", { nullable: true }),
    transmissionType: t.exposeString("transmissionType", { nullable: true }),
    fuelType: t.exposeString("fuelType", { nullable: true }),
    engineCapacity: t.exposeInt("engineCapacity", { nullable: true }),
    exteriorColor: t.exposeString("exteriorColor", { nullable: true }),
    upholstery: t.exposeString("upholstery", { nullable: true }),
    images: t.exposeString("images", { nullable: true }),
    engineType: t.exposeString("engineType", { nullable: true }),
    driveType: t.exposeString("driveType", { nullable: true }),
    vinNo: t.exposeString("vinNo", { nullable: true }),
    bodyType: t.exposeString("bodyType", { nullable: true }),
    interiorColor: t.exposeString("interiorColor", { nullable: true }),
    steering: t.exposeString("steering", { nullable: true }),
    seats: t.exposeInt("seats", { nullable: true }),
    doors: t.exposeInt("doors", { nullable: true }),
    listingPrice: t.exposeInt("listingPrice", { nullable: true }),
    discountedPrice: t.exposeInt("discountedPrice", { nullable: true }),
    allowedPaymentModes: t.exposeString("allowedPaymentModes", {
      nullable: true,
    }),
    offerType: t.exposeString("offerType", { nullable: true }),
    features: t.exposeString("features", { nullable: true }),
    views: t.exposeInt("views", { nullable: true }),
    extraInfo: t.exposeString("extraInfo", { nullable: true }),
    reserved: t.exposeString("reserved", { nullable: true }),
    sold: t.exposeString("sold", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vehicles: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.vehicle.findMany({
        ...query,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.vehicle.count({ ...connection }),
  }),
  vehicleById: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.vehicle.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  vehicleByEntryNo: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      entryNo: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.vehicle.findUniqueOrThrow({
        ...query,
        where: {
          entryNo: args.entryNo,
        },
      }),
  }),
  vehiclesByVendorId: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _ctx, _info) => {
      const { vendorId } = args;

      return prisma.vehicle.findMany({
        ...query,
        where: {
          vendorId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) =>
      prisma.vehicle.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
        },
      }),
  }),
  vehiclesFiltered: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    args: {
      vendorId: t.arg.string(),
      brandId: t.arg.string(),
      modelId: t.arg.string(),
      minYear: t.arg.string(),
      maxYear: t.arg.string(),
      registered: t.arg.string(),
      condition: t.arg.string(),
      minMileage: t.arg.int(),
      maxMileage: t.arg.int(),
      transmissionType: t.arg.string(),
      fuelType: t.arg.string(),
      minEngineCapacity: t.arg.int(),
      maxEngineCapacity: t.arg.int(),
      exteriorColor: t.arg.string(),
      upholstery: t.arg.string(),
      engineType: t.arg.string(),
      driveType: t.arg.string(),
      bodyType: t.arg.string(),
      interiorColor: t.arg.string(),
      steering: t.arg.string(),
      seats: t.arg.int(),
      doors: t.arg.int(),
      minPrice: t.arg.int(),
      maxPrice: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        ...(args.vendorId && {
          vendorId: {
            equals: args.vendorId,
          },
        }),
        ...(args.brandId && {
          brandId: { equals: args.brandId },
        }),
        ...(args.modelId && {
          modelId: { equals: args.modelId },
        }),
        ...(args.minYear &&
          args.maxYear && {
            OR: <any>[
              {
                AND: <any>[
                  args.minYear && {
                    yearOfManufacture: {
                      gte: <any>args.minYear,
                    },
                  },
                  args.maxYear && {
                    yearOfManufacture: {
                      lte: <any>args.maxYear,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  args.minYear && {
                    yearOfFirstRegistration: {
                      gte: <any>args.minYear,
                    },
                  },
                  args.maxYear && {
                    yearOfFirstRegistration: {
                      lte: <any>args.maxYear,
                    },
                  },
                ],
              },
            ],
          }),
        ...(args.registered && {
          registered: {
            equals: args.registered,
          },
        }),
        ...(args.condition && {
          condition: {
            equals: args.condition,
          },
        }),
        ...(args.minMileage && {
          mileage: {
            gte: <any>args.minMileage,
          },
        }),
        ...(args.maxMileage && {
          mileage: {
            lte: <any>args.maxMileage,
          },
        }),
        ...(args.transmissionType && {
          transmissionType: {
            equals: args.transmissionType,
          },
        }),
        ...(args.fuelType && {
          fuelType: {
            equals: args.fuelType,
          },
        }),
        ...(args.minEngineCapacity && {
          engineCapacity: {
            gte: <any>args.minEngineCapacity,
          },
        }),
        ...(args.maxEngineCapacity && {
          engineCapacity: {
            lte: <any>args.maxEngineCapacity,
          },
        }),
        ...(args.exteriorColor && {
          exteriorColor: <any>{
            search: args.exteriorColor,
            mode: "insensitive",
          },
        }),
        ...(args.upholstery && {
          upholstery: {
            equals: args.upholstery,
          },
        }),
        ...(args.engineType && {
          engineType: <any>{
            search: args.engineType,
            mode: "insensitive",
          },
        }),
        ...(args.driveType && {
          driveType: {
            equals: args.driveType,
          },
        }),
        ...(args.bodyType && {
          bodyType: {
            equals: args.bodyType,
          },
        }),
        ...(args.interiorColor && {
          interiorColor: <any>{
            search: args.interiorColor,
            mode: "insensitive",
          },
        }),
        ...(args.steering && {
          steering: {
            equals: args.steering,
          },
        }),
        ...(args.seats && {
          seats: {
            equals: args.seats,
          },
        }),
        ...(args.doors && {
          doors: {
            equals: args.doors,
          },
        }),
        ...(args.minPrice &&
          args.maxPrice && {
            OR: <any>[
              {
                AND: <any>[
                  args.minPrice && {
                    listingPrice: {
                      gte: <any>args.minPrice,
                    },
                  },
                  args.maxPrice && {
                    listingPrice: {
                      lte: <any>args.maxPrice,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  args.minPrice && {
                    discountedPrice: {
                      gte: <any>args.minPrice,
                    },
                  },
                  args.maxPrice && {
                    discountedPrice: {
                      lte: <any>args.maxPrice,
                    },
                  },
                ],
              },
            ],
          }),
      };

      return await prisma.vehicle.findMany({
        ...query,
        where,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) => {
      const where = {
        ...(args.vendorId && {
          vendorId: {
            equals: args.vendorId,
          },
        }),
        ...(args.brandId && {
          brandId: { equals: args.brandId },
        }),
        ...(args.modelId && {
          modelId: { equals: args.modelId },
        }),
        ...(args.minYear &&
          args.maxYear && {
            OR: <any>[
              {
                AND: <any>[
                  args.minYear && {
                    yearOfManufacture: {
                      gte: <any>args.minYear,
                    },
                  },
                  args.maxYear && {
                    yearOfManufacture: {
                      lte: <any>args.maxYear,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  args.minYear && {
                    yearOfFirstRegistration: {
                      gte: <any>args.minYear,
                    },
                  },
                  args.maxYear && {
                    yearOfFirstRegistration: {
                      lte: <any>args.maxYear,
                    },
                  },
                ],
              },
            ],
          }),
        ...(args.registered && {
          registered: {
            equals: args.registered,
          },
        }),
        ...(args.condition && {
          condition: {
            equals: args.condition,
          },
        }),
        ...(args.minMileage && {
          mileage: {
            gte: <any>args.minMileage,
          },
        }),
        ...(args.maxMileage && {
          mileage: {
            lte: <any>args.maxMileage,
          },
        }),
        ...(args.transmissionType && {
          transmissionType: {
            equals: args.transmissionType,
          },
        }),
        ...(args.fuelType && {
          fuelType: {
            equals: args.fuelType,
          },
        }),
        ...(args.minEngineCapacity && {
          engineCapacity: {
            gte: <any>args.minEngineCapacity,
          },
        }),
        ...(args.maxEngineCapacity && {
          engineCapacity: {
            lte: <any>args.maxEngineCapacity,
          },
        }),
        ...(args.exteriorColor && {
          exteriorColor: <any>{
            search: args.exteriorColor,
            mode: "insensitive",
          },
        }),
        ...(args.upholstery && {
          upholstery: {
            equals: args.upholstery,
          },
        }),
        ...(args.engineType && {
          engineType: <any>{
            search: args.engineType,
            mode: "insensitive",
          },
        }),
        ...(args.driveType && {
          driveType: {
            equals: args.driveType,
          },
        }),
        ...(args.bodyType && {
          bodyType: {
            equals: args.bodyType,
          },
        }),
        ...(args.interiorColor && {
          interiorColor: <any>{
            search: args.interiorColor,
            mode: "insensitive",
          },
        }),
        ...(args.steering && {
          steering: {
            equals: args.steering,
          },
        }),
        ...(args.seats && {
          seats: {
            equals: args.seats,
          },
        }),
        ...(args.doors && {
          doors: {
            equals: args.doors,
          },
        }),
        ...(args.minPrice &&
          args.maxPrice && {
            OR: <any>[
              {
                AND: <any>[
                  args.minPrice && {
                    listingPrice: {
                      gte: <any>args.minPrice,
                    },
                  },
                  args.maxPrice && {
                    listingPrice: {
                      lte: <any>args.maxPrice,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  args.minPrice && {
                    discountedPrice: {
                      gte: <any>args.minPrice,
                    },
                  },
                  args.maxPrice && {
                    discountedPrice: {
                      lte: <any>args.maxPrice,
                    },
                  },
                ],
              },
            ],
          }),
      };

      return prisma.vehicle.count({ ...connection, where });
    },
  }),
}));

builder.mutationFields((t) => ({
  createVehicle: t.prismaField({
    type: Vehicle,
    args: {
      entryNo: t.arg.string({ required: true }),
      vendorId: t.arg.string({ required: true }),
      brandId: t.arg.string({ required: true }),
      modelId: t.arg.string({ required: true }),
      trim: t.arg.string(),
      yearOfManufacture: t.arg.string(),
      yearOfFirstRegistration: t.arg.string(),
      registered: t.arg.string(),
      registrationNo: t.arg.string(),
      condition: t.arg.string(),
      mileage: t.arg.int(),
      mileageMetric: t.arg.string(),
      transmissionType: t.arg.string(),
      fuelType: t.arg.string(),
      engineCapacity: t.arg.int(),
      exteriorColor: t.arg.string(),
      upholstery: t.arg.string(),
      images: t.arg.string(),
      engineType: t.arg.string(),
      driveType: t.arg.string(),
      vinNo: t.arg.string(),
      bodyType: t.arg.string(),
      interiorColor: t.arg.string(),
      steering: t.arg.string(),
      seats: t.arg.int(),
      doors: t.arg.int(),
      listingPrice: t.arg.int(),
      discountedPrice: t.arg.int(),
      allowedPaymentModes: t.arg.string(),
      offerType: t.arg.string(),
      features: t.arg.string(),
      views: t.arg.int(),
      extraInfo: t.arg.string(),
      reserved: t.arg.string(),
      sold: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        entryNo,
        vendorId,
        brandId,
        modelId,
        trim,
        yearOfManufacture,
        yearOfFirstRegistration,
        registered,
        registrationNo,
        condition,
        mileage,
        mileageMetric,
        transmissionType,
        fuelType,
        engineCapacity,
        exteriorColor,
        upholstery,
        images,
        engineType,
        driveType,
        vinNo,
        bodyType,
        interiorColor,
        steering,
        seats,
        doors,
        listingPrice,
        discountedPrice,
        allowedPaymentModes,
        offerType,
        features,
        views,
        extraInfo,
        reserved,
        sold,
      } = args;

      return await prisma.vehicle.create({
        ...query,
        data: {
          entryNo,
          vendor: { connect: { id: String(vendorId) || undefined } },
          brand: { connect: { id: String(brandId) || undefined } },
          model: { connect: { id: String(modelId) || undefined } },
          trim,
          yearOfManufacture,
          yearOfFirstRegistration,
          registered,
          registrationNo,
          condition,
          mileage,
          mileageMetric,
          transmissionType,
          fuelType,
          engineCapacity,
          exteriorColor,
          upholstery,
          images,
          engineType,
          driveType,
          vinNo,
          bodyType,
          interiorColor,
          steering,
          seats,
          doors,
          listingPrice,
          discountedPrice,
          allowedPaymentModes,
          offerType,
          features,
          views,
          extraInfo,
          reserved,
          sold,
        },
      });
    },
  }),
  updateVehicle: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      vendorId: t.arg.string(),
      brandId: t.arg.string(),
      modelId: t.arg.string(),
      trim: t.arg.string(),
      yearOfManufacture: t.arg.string(),
      yearOfFirstRegistration: t.arg.string(),
      registered: t.arg.string(),
      registrationNo: t.arg.string(),
      condition: t.arg.string(),
      mileage: t.arg.int(),
      mileageMetric: t.arg.string(),
      transmissionType: t.arg.string(),
      fuelType: t.arg.string(),
      engineCapacity: t.arg.int(),
      exteriorColor: t.arg.string(),
      upholstery: t.arg.string(),
      images: t.arg.string(),
      engineType: t.arg.string(),
      driveType: t.arg.string(),
      vinNo: t.arg.string(),
      bodyType: t.arg.string(),
      interiorColor: t.arg.string(),
      steering: t.arg.string(),
      seats: t.arg.int(),
      doors: t.arg.int(),
      listingPrice: t.arg.int(),
      discountedPrice: t.arg.int(),
      allowedPaymentModes: t.arg.string(),
      offerType: t.arg.string(),
      features: t.arg.string(),
      views: t.arg.int(),
      extraInfo: t.arg.string(),
      reserved: t.arg.string(),
      sold: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        vendorId,
        brandId,
        modelId,
        trim,
        yearOfManufacture,
        yearOfFirstRegistration,
        registered,
        registrationNo,
        condition,
        mileage,
        mileageMetric,
        transmissionType,
        fuelType,
        engineCapacity,
        exteriorColor,
        upholstery,
        images,
        engineType,
        driveType,
        vinNo,
        bodyType,
        interiorColor,
        steering,
        seats,
        doors,
        listingPrice,
        discountedPrice,
        allowedPaymentModes,
        offerType,
        features,
        views,
        extraInfo,
        reserved,
        sold,
      } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          vendor: vendorId
            ? { connect: { id: String(vendorId) || undefined } }
            : undefined,
          brand: brandId
            ? { connect: { id: String(brandId) || undefined } }
            : undefined,
          model: modelId
            ? { connect: { id: String(modelId) || undefined } }
            : undefined,
          trim: trim ? trim : undefined,
          yearOfManufacture: yearOfManufacture ? yearOfManufacture : undefined,
          yearOfFirstRegistration: yearOfFirstRegistration
            ? yearOfFirstRegistration
            : undefined,
          registered: registered ? registered : undefined,
          registrationNo: registrationNo ? registrationNo : undefined,
          condition: condition ? condition : undefined,
          mileage: mileage ? mileage : undefined,
          mileageMetric: mileageMetric ? mileageMetric : undefined,
          transmissionType: transmissionType ? transmissionType : undefined,
          fuelType: fuelType ? fuelType : undefined,
          engineCapacity: engineCapacity ? engineCapacity : undefined,
          exteriorColor: exteriorColor ? exteriorColor : undefined,
          upholstery: upholstery ? upholstery : undefined,
          images: images ? images : undefined,
          engineType: engineType ? engineType : undefined,
          driveType: driveType ? driveType : undefined,
          vinNo: vinNo ? vinNo : undefined,
          bodyType: bodyType ? bodyType : undefined,
          interiorColor: interiorColor ? interiorColor : undefined,
          steering: steering ? steering : undefined,
          seats: seats ? seats : undefined,
          doors: doors ? doors : undefined,
          listingPrice: listingPrice ? listingPrice : undefined,
          discountedPrice: discountedPrice ? discountedPrice : undefined,
          allowedPaymentModes: allowedPaymentModes
            ? allowedPaymentModes
            : undefined,
          offerType: offerType ? offerType : undefined,
          features: features ? features : undefined,
          views: views ? views : undefined,
          extraInfo: extraInfo ? extraInfo : undefined,
          reserved: reserved ? reserved : undefined,
          sold: sold ? sold : undefined,
        },
      });
    },
  }),
  updateVehicleReserved: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      reserved: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { reserved } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          reserved: reserved ? reserved : undefined,
        },
      });
    },
  }),
  updateVehicleSold: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      sold: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { sold } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          sold: sold ? sold : undefined,
        },
      });
    },
  }),
  updateVehicleImages: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      images: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { images } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          images: images ? images : undefined,
        },
      });
    },
  }),
  updateVehicleBasic: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      vendorId: t.arg.string(),
      brandId: t.arg.string(),
      modelId: t.arg.string(),
      trim: t.arg.string(),
      yearOfManufacture: t.arg.string(),
      yearOfFirstRegistration: t.arg.string(),
      registered: t.arg.string(),
      registrationNo: t.arg.string(),
      condition: t.arg.string(),
      mileage: t.arg.int(),
      mileageMetric: t.arg.string(),
      listingPrice: t.arg.int(),
      discountedPrice: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        vendorId,
        brandId,
        modelId,
        trim,
        yearOfManufacture,
        yearOfFirstRegistration,
        registered,
        registrationNo,
        condition,
        mileage,
        mileageMetric,
        listingPrice,
        discountedPrice,
      } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          vendor: vendorId
            ? { connect: { id: String(vendorId) || undefined } }
            : undefined,
          brand: brandId
            ? { connect: { id: String(brandId) || undefined } }
            : undefined,
          model: modelId
            ? { connect: { id: String(modelId) || undefined } }
            : undefined,
          trim: trim ? trim : undefined,
          yearOfManufacture: yearOfManufacture ? yearOfManufacture : undefined,
          yearOfFirstRegistration: yearOfFirstRegistration
            ? yearOfFirstRegistration
            : undefined,
          registered: registered ? registered : undefined,
          registrationNo: registrationNo ? registrationNo : undefined,
          condition: condition ? condition : undefined,
          mileage: mileage ? mileage : undefined,
          mileageMetric: mileageMetric ? mileageMetric : undefined,
          listingPrice: listingPrice ? listingPrice : undefined,
          discountedPrice: discountedPrice ? discountedPrice : undefined,
        },
      });
    },
  }),
  updateVehicleSpecifications: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      transmissionType: t.arg.string(),
      fuelType: t.arg.string(),
      engineCapacity: t.arg.int(),
      exteriorColor: t.arg.string(),
      upholstery: t.arg.string(),
      engineType: t.arg.string(),
      driveType: t.arg.string(),
      bodyType: t.arg.string(),
      interiorColor: t.arg.string(),
      steering: t.arg.string(),
      seats: t.arg.int(),
      doors: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        transmissionType,
        fuelType,
        engineCapacity,
        exteriorColor,
        upholstery,
        engineType,
        driveType,
        bodyType,
        interiorColor,
        steering,
        seats,
        doors,
      } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          transmissionType: transmissionType ? transmissionType : undefined,
          fuelType: fuelType ? fuelType : undefined,
          engineCapacity: engineCapacity ? engineCapacity : undefined,
          exteriorColor: exteriorColor ? exteriorColor : undefined,
          upholstery: upholstery ? upholstery : undefined,
          engineType: engineType ? engineType : undefined,
          driveType: driveType ? driveType : undefined,
          bodyType: bodyType ? bodyType : undefined,
          interiorColor: interiorColor ? interiorColor : undefined,
          steering: steering ? steering : undefined,
          seats: seats ? seats : undefined,
          doors: doors ? doors : undefined,
        },
      });
    },
  }),
  updateVehicleExtraInfo: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      vinNo: t.arg.string(),
      allowedPaymentModes: t.arg.string(),
      offerType: t.arg.string(),
      features: t.arg.string(),
      views: t.arg.int(),
      extraInfo: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        vinNo,
        allowedPaymentModes,
        offerType,
        features,
        views,
        extraInfo,
      } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          vinNo: vinNo ? vinNo : undefined,
          allowedPaymentModes: allowedPaymentModes
            ? allowedPaymentModes
            : undefined,
          offerType: offerType ? offerType : undefined,
          features: features ? features : undefined,
          views: views ? views : undefined,
          extraInfo: extraInfo ? extraInfo : undefined,
        },
      });
    },
  }),
  deleteVehicle: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.vehicle.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
