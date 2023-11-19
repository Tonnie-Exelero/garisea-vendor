import prisma from "@lib/prisma";
import { builder } from "../builder";

export const Vehicle = builder.prismaObject("Vehicle", {
  fields: (t) => ({
    id: t.exposeID("id"),
    entryNo: t.exposeString("entryNo", { nullable: false }),
    vendor: t.relation("vendor", { nullable: false }),
    brand: t.relation("brand", { nullable: false }),
    model: t.relation("model", { nullable: false }),
    trim: t.exposeString("trim", { nullable: true }),
    slug: t.exposeString("slug", { nullable: true }),
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
    thumbnail: t.exposeString("thumbnail", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    viewingLocation: t.exposeString("viewingLocation", { nullable: true }),
    vehicleOriginCountry: t.exposeString("vehicleOriginCountry", {
      nullable: true,
    }),
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
    discountAmount: t.exposeInt("discountAmount", { nullable: true }),
    allowedPaymentModes: t.exposeString("allowedPaymentModes", {
      nullable: true,
    }),
    offerType: t.exposeString("offerType", { nullable: true }),
    features: t.exposeString("features", { nullable: true }),
    extraInfo: t.exposeString("extraInfo", { nullable: true }),
    reserved: t.exposeString("reserved", { nullable: true }),
    sold: t.exposeString("sold", { nullable: true }),
    publishedAt: t.exposeString("publishedAt", {
      nullable: true,
    }),
    impressions: t.exposeInt("impressions", { nullable: true }),
    detailExpands: t.exposeInt("detailExpands", { nullable: true }),
    interested: t.exposeInt("interested", { nullable: true }),
    vehicleVerified: t.exposeString("vehicleVerified", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vehicles: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.vehicle.findMany({
        ...query,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.vehicle.count({ ...connection }),
  }),
  vehicleById: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vehicle.findUnique({
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
    resolve: async (query, _parent, args, _info) =>
      await prisma.vehicle.findUnique({
        ...query,
        where: {
          entryNo: args.entryNo,
        },
      }),
  }),
  vehicleBySlug: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      slug: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.vehicle.findUnique({
        ...query,
        where: {
          slug: args.slug,
        },
      }),
  }),
  vehiclesByVendorId: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    args: {
      vendorId: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { vendorId, status } = args;

      return await prisma.vehicle.findMany({
        ...query,
        where: {
          vendorId,
          status,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.vehicle.count({
        ...connection,
        where: {
          vendorId: args.vendorId,
          status: args.status,
        },
      }),
  }),
  vehiclesCount: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      vendorId: t.arg.string(),
    },
    resolve: async (_query, _parent, args, _info): Promise<any | undefined> => {
      const active = await prisma.vehicle.count({
        where: {
          ...(args.vendorId && { vendorId: args.vendorId }),
          status: "active",
        },
      });

      const pending = await prisma.vehicle.count({
        where: {
          ...(args.vendorId && { vendorId: args.vendorId }),
          status: "pending",
        },
      });

      const declined = await prisma.vehicle.count({
        where: {
          ...(args.vendorId && { vendorId: args.vendorId }),
          status: "declined",
        },
      });

      const stats = { active, pending, declined };

      return {
        vehicleVerified: JSON.stringify(stats),
      };
    },
  }),
  vehiclesFiltered: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    args: {
      entryNo: t.arg.string(),
      vendorId: t.arg.string(),
      brandId: t.arg.string(),
      modelId: t.arg.string(),
      minYear: t.arg.string(),
      maxYear: t.arg.string(),
      registered: t.arg.string(),
      condition: t.arg.string(),
      minMileage: t.arg.int(),
      maxMileage: t.arg.int(),
      status: t.arg.string(),
      viewingLocation: t.arg.string(),
      vehicleOriginCountry: t.arg.string(),
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
      hasDiscount: t.arg.string(),
      biggestDiscount: t.arg.string(),
      reserved: t.arg.string(),
      sold: t.arg.string(),
      random: t.arg.string(),
      sortBy: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        ...(args.entryNo && {
          entryNo: {
            equals: args.entryNo,
          },
        }),
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
        ...(args.status && {
          status: {
            equals: args.status,
          },
        }),
        ...(args.viewingLocation && {
          viewingLocation: <any>{
            search: args.viewingLocation,
            mode: "insensitive",
          },
        }),
        ...(args.vehicleOriginCountry && {
          vehicleOriginCountry: {
            equals: args.vehicleOriginCountry,
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
        ...(args.hasDiscount === "yes" && {
          discountedPrice: {
            not: null,
            gt: 0,
          },
        }),
        ...(args.reserved && {
          reserved: {
            equals: args.reserved,
          },
        }),
        ...(args.sold && {
          sold: {
            equals: args.sold,
          },
        }),
      };

      return await prisma.vehicle.findMany({
        ...query,
        where,
        orderBy: [
          {
            ...(args.sortBy === "relevance"
              ? { impressions: "desc" }
              : args.sortBy === "price-l-to-h"
              ? { listingPrice: "asc" }
              : args.sortBy === "price-h-to-l"
              ? { listingPrice: "desc" }
              : args.sortBy === "mileage-l-to-h"
              ? { mileage: "asc" }
              : args.sortBy === "mileage-h-to-l"
              ? { mileage: "desc" }
              : {}),
          },
          {
            ...(args.biggestDiscount !== "yes" &&
              !args.sortBy && {
                ...(args.random === "yes"
                  ? { mileage: "asc" }
                  : { createdAt: "desc" }),
              }),
          },
          { ...(args.biggestDiscount === "yes" && { discountAmount: "desc" }) },
        ],
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const where = {
        ...(args.entryNo && {
          entryNo: {
            equals: args.entryNo,
          },
        }),
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
        ...(args.status && {
          status: {
            equals: args.status,
          },
        }),
        ...(args.viewingLocation && {
          viewingLocation: <any>{
            search: args.viewingLocation,
            mode: "insensitive",
          },
        }),
        ...(args.vehicleOriginCountry && {
          vehicleOriginCountry: {
            equals: args.vehicleOriginCountry,
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
        ...(args.hasDiscount === "yes" && {
          discountedPrice: {
            not: null,
            gt: 0,
          },
        }),
        ...(args.reserved && {
          reserved: {
            equals: args.reserved,
          },
        }),
        ...(args.sold && {
          sold: {
            equals: args.sold,
          },
        }),
      };

      return await prisma.vehicle.count({ ...connection, where });
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
      slug: t.arg.string(),
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
      thumbnail: t.arg.string(),
      status: t.arg.string(),
      viewingLocation: t.arg.string(),
      vehicleOriginCountry: t.arg.string(),
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
      discountAmount: t.arg.int(),
      allowedPaymentModes: t.arg.string(),
      offerType: t.arg.string(),
      features: t.arg.string(),
      extraInfo: t.arg.string(),
      reserved: t.arg.string(),
      sold: t.arg.string(),
      publishedAt: t.arg.string(),
      impressions: t.arg.int(),
      detailExpands: t.arg.int(),
      interested: t.arg.int(),
      vehicleVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        entryNo,
        vendorId,
        brandId,
        modelId,
        trim,
        slug,
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
        thumbnail,
        status,
        viewingLocation,
        vehicleOriginCountry,
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
        discountAmount,
        allowedPaymentModes,
        offerType,
        features,
        extraInfo,
        reserved,
        sold,
        publishedAt,
        impressions,
        detailExpands,
        interested,
        vehicleVerified,
      } = args;

      return await prisma.vehicle.create({
        ...query,
        data: {
          entryNo,
          vendor: { connect: { id: String(vendorId) || undefined } },
          brand: { connect: { id: String(brandId) || undefined } },
          model: { connect: { id: String(modelId) || undefined } },
          trim,
          slug,
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
          thumbnail,
          status,
          viewingLocation,
          vehicleOriginCountry,
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
          discountAmount,
          allowedPaymentModes,
          offerType,
          features,
          extraInfo,
          reserved,
          sold,
          publishedAt,
          impressions,
          detailExpands,
          interested,
          vehicleVerified,
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
      slug: t.arg.string(),
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
      viewingLocation: t.arg.string(),
      vehicleOriginCountry: t.arg.string(),
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
      discountAmount: t.arg.int(),
      allowedPaymentModes: t.arg.string(),
      offerType: t.arg.string(),
      features: t.arg.string(),
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
        slug,
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
        viewingLocation,
        vehicleOriginCountry,
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
        discountAmount,
        allowedPaymentModes,
        offerType,
        features,
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
          slug: slug ? slug : undefined,
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
          viewingLocation: viewingLocation ? viewingLocation : undefined,
          vehicleOriginCountry: vehicleOriginCountry
            ? vehicleOriginCountry
            : undefined,
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
          discountAmount: discountAmount ? discountAmount : undefined,
          allowedPaymentModes: allowedPaymentModes
            ? allowedPaymentModes
            : undefined,
          offerType: offerType ? offerType : undefined,
          features: features ? features : undefined,
          extraInfo: extraInfo ? extraInfo : undefined,
          reserved: reserved ? reserved : undefined,
          sold: sold ? sold : undefined,
        },
      });
    },
  }),
  updateVehicleStatus: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { status } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          status: status ? status : undefined,
        },
      });
    },
  }),
  updateVehicleVerified: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      vehicleVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { vehicleVerified } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          vehicleVerified: vehicleVerified ? vehicleVerified : undefined,
        },
      });
    },
  }),
  updateVehicleSlug: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      slug: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { slug } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          slug: slug ? slug : undefined,
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
  updateVehicleThumbnail: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      thumbnail: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { id, thumbnail } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          thumbnail: thumbnail ? thumbnail : undefined,
        },
      });
    },
  }),
  updateVehiclePublishedAt: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      publishedAt: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { publishedAt } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          publishedAt: publishedAt ? publishedAt : undefined,
        },
      });
    },
  }),
  updateVehicleImpressions: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      impressions: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { impressions } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          impressions: impressions ? impressions : undefined,
        },
      });
    },
  }),
  updateVehicleDetailExpands: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      detailExpands: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { detailExpands } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          detailExpands: detailExpands ? detailExpands : undefined,
        },
      });
    },
  }),
  updateVehicleInterested: t.prismaField({
    type: Vehicle,
    args: {
      id: t.arg.string({ required: true }),
      interested: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { interested } = args;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          interested: interested || interested === 0 ? interested : undefined,
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
      slug: t.arg.string(),
      yearOfManufacture: t.arg.string(),
      yearOfFirstRegistration: t.arg.string(),
      registered: t.arg.string(),
      registrationNo: t.arg.string(),
      condition: t.arg.string(),
      viewingLocation: t.arg.string(),
      vehicleOriginCountry: t.arg.string(),
      mileage: t.arg.int(),
      mileageMetric: t.arg.string(),
      listingPrice: t.arg.int(),
      discountedPrice: t.arg.int(),
      discountAmount: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        vendorId,
        brandId,
        modelId,
        trim,
        slug,
        yearOfManufacture,
        yearOfFirstRegistration,
        registered,
        registrationNo,
        condition,
        viewingLocation,
        vehicleOriginCountry,
        mileage,
        mileageMetric,
        listingPrice,
        discountedPrice,
        discountAmount,
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
          slug: slug ? slug : undefined,
          yearOfManufacture: yearOfManufacture ? yearOfManufacture : undefined,
          yearOfFirstRegistration: yearOfFirstRegistration
            ? yearOfFirstRegistration
            : undefined,
          registered: registered ? registered : undefined,
          registrationNo: registrationNo ? registrationNo : undefined,
          condition: condition ? condition : undefined,
          viewingLocation: viewingLocation ? viewingLocation : undefined,
          vehicleOriginCountry: vehicleOriginCountry
            ? vehicleOriginCountry
            : undefined,
          mileage: mileage ? mileage : undefined,
          mileageMetric: mileageMetric ? mileageMetric : undefined,
          listingPrice: listingPrice ? listingPrice : undefined,
          discountedPrice: discountedPrice ? discountedPrice : undefined,
          discountAmount: discountAmount ? discountAmount : undefined,
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
      extraInfo: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { vinNo, allowedPaymentModes, offerType, features, extraInfo } =
        args;

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
      await prisma.vehicle.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
