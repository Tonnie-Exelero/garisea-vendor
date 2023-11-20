import prisma from "@lib/prisma";
import { builder } from "../builder";
import { decryptData } from "@core/utils/encryption";

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
    pl: t.exposeString("pl", { nullable: true }),
    dt: t.exposeString("dt", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vehicles: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.vehicle.findMany({
        ...query,
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vehicle.findUnique({
        ...query,
        where: {
          id,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  vehicleByEntryNo: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { entryNo } = payload;

      return await prisma.vehicle.findUnique({
        ...query,
        where: {
          entryNo,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  vehicleBySlug: t.prismaField({
    type: Vehicle,
    nullable: true,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { slug } = payload;

      return await prisma.vehicle.findUnique({
        ...query,
        where: {
          slug,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  vehiclesByVendorId: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (
      query,
      _parent,
      args,
      _ctx,
      _info
    ): Promise<any | undefined> => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, status } = payload;

      return await prisma.vehicle.findMany({
        ...query,
        where: {
          vendorId,
          status,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { vendorId, status } = payload;

      return await prisma.vehicle.count({
        ...connection,
        where: {
          vendorId,
          status,
        },
      });
    },
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
          ...(args && args.vendorId && { vendorId: args.vendorId }),
          status: "active",
        },
      });

      const pending = await prisma.vehicle.count({
        where: {
          ...(args && args.vendorId && { vendorId: args.vendorId }),
          status: "pending",
        },
      });

      const declined = await prisma.vehicle.count({
        where: {
          ...(args && args.vendorId && { vendorId: args.vendorId }),
          status: "declined",
        },
      });

      const stats = { active, pending, declined };

      return {
        dt: JSON.stringify(stats),
      };
    },
  }),
  vehiclesFiltered: t.prismaConnection({
    type: Vehicle,
    cursor: "id",
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const where = {
        ...(payload.entryNo && {
          entryNo: {
            equals: payload.entryNo,
          },
        }),
        ...(payload.vendorId && {
          vendorId: {
            equals: payload.vendorId,
          },
        }),
        ...(payload.brandId && {
          brandId: { equals: payload.brandId },
        }),
        ...(payload.modelId && {
          modelId: { equals: payload.modelId },
        }),
        ...(payload.minYear &&
          payload.maxYear && {
            OR: <any>[
              {
                AND: <any>[
                  payload.minYear && {
                    yearOfManufacture: {
                      gte: <any>payload.minYear,
                    },
                  },
                  payload.maxYear && {
                    yearOfManufacture: {
                      lte: <any>payload.maxYear,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  payload.minYear && {
                    yearOfFirstRegistration: {
                      gte: <any>payload.minYear,
                    },
                  },
                  payload.maxYear && {
                    yearOfFirstRegistration: {
                      lte: <any>payload.maxYear,
                    },
                  },
                ],
              },
            ],
          }),
        ...(payload.registered && {
          registered: {
            equals: payload.registered,
          },
        }),
        ...(payload.condition && {
          condition: {
            equals: payload.condition,
          },
        }),
        ...(payload.minMileage && {
          mileage: {
            gte: <any>payload.minMileage,
          },
        }),
        ...(payload.maxMileage && {
          mileage: {
            lte: <any>payload.maxMileage,
          },
        }),
        ...(payload.status && {
          status: {
            equals: payload.status,
          },
        }),
        ...(payload.viewingLocation && {
          viewingLocation: <any>{
            search: payload.viewingLocation,
            mode: "insensitive",
          },
        }),
        ...(payload.vehicleOriginCountry && {
          vehicleOriginCountry: {
            equals: payload.vehicleOriginCountry,
          },
        }),
        ...(payload.transmissionType && {
          transmissionType: {
            equals: payload.transmissionType,
          },
        }),
        ...(payload.fuelType && {
          fuelType: {
            equals: payload.fuelType,
          },
        }),
        ...(payload.minEngineCapacity && {
          engineCapacity: {
            gte: <any>payload.minEngineCapacity,
          },
        }),
        ...(payload.maxEngineCapacity && {
          engineCapacity: {
            lte: <any>payload.maxEngineCapacity,
          },
        }),
        ...(payload.exteriorColor && {
          exteriorColor: <any>{
            search: payload.exteriorColor,
            mode: "insensitive",
          },
        }),
        ...(payload.upholstery && {
          upholstery: {
            equals: payload.upholstery,
          },
        }),
        ...(payload.engineType && {
          engineType: <any>{
            search: payload.engineType,
            mode: "insensitive",
          },
        }),
        ...(payload.driveType && {
          driveType: {
            equals: payload.driveType,
          },
        }),
        ...(payload.bodyType && {
          bodyType: {
            equals: payload.bodyType,
          },
        }),
        ...(payload.interiorColor && {
          interiorColor: <any>{
            search: payload.interiorColor,
            mode: "insensitive",
          },
        }),
        ...(payload.steering && {
          steering: {
            equals: payload.steering,
          },
        }),
        ...(payload.seats && {
          seats: {
            equals: payload.seats,
          },
        }),
        ...(payload.doors && {
          doors: {
            equals: payload.doors,
          },
        }),
        ...(payload.minPrice &&
          payload.maxPrice && {
            OR: <any>[
              {
                AND: <any>[
                  payload.minPrice && {
                    listingPrice: {
                      gte: <any>payload.minPrice,
                    },
                  },
                  payload.maxPrice && {
                    listingPrice: {
                      lte: <any>payload.maxPrice,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  payload.minPrice && {
                    discountedPrice: {
                      gte: <any>payload.minPrice,
                    },
                  },
                  payload.maxPrice && {
                    discountedPrice: {
                      lte: <any>payload.maxPrice,
                    },
                  },
                ],
              },
            ],
          }),
        ...(payload.hasDiscount === "yes" && {
          discountedPrice: {
            not: null,
            gt: 0,
          },
        }),
        ...(payload.reserved && {
          reserved: {
            equals: payload.reserved,
          },
        }),
        ...(payload.sold && {
          sold: {
            equals: payload.sold,
          },
        }),
      };

      return await prisma.vehicle.findMany({
        ...query,
        ...(payload && { where }),
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
        orderBy: [
          {
            ...(payload && payload.sortBy === "relevance"
              ? { impressions: "desc" }
              : payload && payload.sortBy === "price-l-to-h"
              ? { listingPrice: "asc" }
              : payload && payload.sortBy === "price-h-to-l"
              ? { listingPrice: "desc" }
              : payload && payload.sortBy === "mileage-l-to-h"
              ? { mileage: "asc" }
              : payload && payload.sortBy === "mileage-h-to-l"
              ? { mileage: "desc" }
              : {}),
          },
          {
            ...(payload &&
              payload.biggestDiscount !== "yes" &&
              !payload.sortBy && {
                ...(payload && payload.random === "yes"
                  ? { mileage: "asc" }
                  : { createdAt: "desc" }),
              }),
          },
          {
            ...(payload &&
              payload.biggestDiscount === "yes" && {
                discountAmount: "desc",
              }),
          },
        ],
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const where = {
        ...(payload.entryNo && {
          entryNo: {
            equals: payload.entryNo,
          },
        }),
        ...(payload.vendorId && {
          vendorId: {
            equals: payload.vendorId,
          },
        }),
        ...(payload.brandId && {
          brandId: { equals: payload.brandId },
        }),
        ...(payload.modelId && {
          modelId: { equals: payload.modelId },
        }),
        ...(payload.minYear &&
          payload.maxYear && {
            OR: <any>[
              {
                AND: <any>[
                  payload.minYear && {
                    yearOfManufacture: {
                      gte: <any>payload.minYear,
                    },
                  },
                  payload.maxYear && {
                    yearOfManufacture: {
                      lte: <any>payload.maxYear,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  payload.minYear && {
                    yearOfFirstRegistration: {
                      gte: <any>payload.minYear,
                    },
                  },
                  payload.maxYear && {
                    yearOfFirstRegistration: {
                      lte: <any>payload.maxYear,
                    },
                  },
                ],
              },
            ],
          }),
        ...(payload.registered && {
          registered: {
            equals: payload.registered,
          },
        }),
        ...(payload.condition && {
          condition: {
            equals: payload.condition,
          },
        }),
        ...(payload.minMileage && {
          mileage: {
            gte: <any>payload.minMileage,
          },
        }),
        ...(payload.maxMileage && {
          mileage: {
            lte: <any>payload.maxMileage,
          },
        }),
        ...(payload.status && {
          status: {
            equals: payload.status,
          },
        }),
        ...(payload.viewingLocation && {
          viewingLocation: <any>{
            search: payload.viewingLocation,
            mode: "insensitive",
          },
        }),
        ...(payload.vehicleOriginCountry && {
          vehicleOriginCountry: {
            equals: payload.vehicleOriginCountry,
          },
        }),
        ...(payload.transmissionType && {
          transmissionType: {
            equals: payload.transmissionType,
          },
        }),
        ...(payload.fuelType && {
          fuelType: {
            equals: payload.fuelType,
          },
        }),
        ...(payload.minEngineCapacity && {
          engineCapacity: {
            gte: <any>payload.minEngineCapacity,
          },
        }),
        ...(payload.maxEngineCapacity && {
          engineCapacity: {
            lte: <any>payload.maxEngineCapacity,
          },
        }),
        ...(payload.exteriorColor && {
          exteriorColor: <any>{
            search: payload.exteriorColor,
            mode: "insensitive",
          },
        }),
        ...(payload.upholstery && {
          upholstery: {
            equals: payload.upholstery,
          },
        }),
        ...(payload.engineType && {
          engineType: <any>{
            search: payload.engineType,
            mode: "insensitive",
          },
        }),
        ...(payload.driveType && {
          driveType: {
            equals: payload.driveType,
          },
        }),
        ...(payload.bodyType && {
          bodyType: {
            equals: payload.bodyType,
          },
        }),
        ...(payload.interiorColor && {
          interiorColor: <any>{
            search: payload.interiorColor,
            mode: "insensitive",
          },
        }),
        ...(payload.steering && {
          steering: {
            equals: payload.steering,
          },
        }),
        ...(payload.seats && {
          seats: {
            equals: payload.seats,
          },
        }),
        ...(payload.doors && {
          doors: {
            equals: payload.doors,
          },
        }),
        ...(payload.minPrice &&
          payload.maxPrice && {
            OR: <any>[
              {
                AND: <any>[
                  payload.minPrice && {
                    listingPrice: {
                      gte: <any>payload.minPrice,
                    },
                  },
                  payload.maxPrice && {
                    listingPrice: {
                      lte: <any>payload.maxPrice,
                    },
                  },
                ],
              },
              {
                AND: <any>[
                  payload.minPrice && {
                    discountedPrice: {
                      gte: <any>payload.minPrice,
                    },
                  },
                  payload.maxPrice && {
                    discountedPrice: {
                      lte: <any>payload.maxPrice,
                    },
                  },
                ],
              },
            ],
          }),
        ...(payload.hasDiscount === "yes" && {
          discountedPrice: {
            not: null,
            gt: 0,
          },
        }),
        ...(payload.reserved && {
          reserved: {
            equals: payload.reserved,
          },
        }),
        ...(payload.sold && {
          sold: {
            equals: payload.sold,
          },
        }),
      };

      return await prisma.vehicle.count({
        ...connection,
        ...(payload && { where }),
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createVehicle: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

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
      } = payload;

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
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);

      const {
        id,
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
      } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
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
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleStatus: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, status } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          status: status ? status : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleVerified: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, vehicleVerified } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          vehicleVerified: vehicleVerified ? vehicleVerified : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleSlug: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, slug } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          slug: slug ? slug : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleReserved: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, reserved } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          reserved: reserved ? reserved : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleSold: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, sold } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          sold: sold ? sold : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleImages: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, images } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          images: images ? images : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleThumbnail: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, thumbnail } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          thumbnail: thumbnail ? thumbnail : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehiclePublishedAt: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, publishedAt } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          publishedAt: publishedAt ? publishedAt : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleImpressions: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, impressions } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          impressions: impressions ? impressions : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleDetailExpands: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, detailExpands } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          detailExpands: detailExpands ? detailExpands : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleInterested: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, interested } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
        },
        data: {
          interested: interested || interested === 0 ? interested : undefined,
        },
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleBasic: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        id,
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
      } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
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
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleSpecifications: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const {
        id,
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
      } = payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
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
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  updateVehicleExtraInfo: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id, vinNo, allowedPaymentModes, offerType, features, extraInfo } =
        payload;

      return await prisma.vehicle.update({
        ...query,
        where: {
          id,
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
        include: {
          vendor: true,
          brand: true,
          model: true,
        },
      });
    },
  }),
  deleteVehicle: t.prismaField({
    type: Vehicle,
    args: {
      pl: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { pl } = args;
      const payload = pl && decryptData(pl);
      const { id } = payload;

      return await prisma.vehicle.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));
