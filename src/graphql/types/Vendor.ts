import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@src/lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";

export const Vendor = builder.prismaObject("Vendor", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName", { nullable: true }),
    lastName: t.exposeString("lastName", { nullable: true }),
    username: t.exposeString("username", { nullable: false }),
    email: t.exposeString("email", { nullable: false }),
    password: t.exposeString("password", { nullable: true }),
    phone: t.exposeString("phone", { nullable: true }),
    token: t.exposeString("token", { nullable: true }),
    status: t.exposeString("status", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    language: t.exposeString("language", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    city: t.exposeString("city", { nullable: true }),
    country: t.exposeString("country", { nullable: true }),
    emailVerified: t.exposeString("emailVerified", { nullable: true }),
    addedOrganization: t.exposeString("addedOrganization", { nullable: true }),
    organization: t.relation("organization", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  vendors: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.vendor.findMany({
        ...query,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.vendor.count({ ...connection }),
  }),
  vendorsByStatus: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    args: {
      status: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _ctx, _info) => {
      const { status } = args;

      return prisma.vendor.findMany({
        ...query,
        where: {
          status,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) =>
      prisma.vendor.count({
        ...connection,
        where: {
          status: args.status,
        },
      }),
  }),
  vendorsFiltered: t.prismaConnection({
    type: Vendor,
    cursor: "id",
    args: {
      filter: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { firstName: { contains: args.filter } },
          { lastName: { contains: args.filter } },
          { username: { contains: args.filter } },
          { email: { contains: args.filter } },
          { phone: { contains: args.filter } },
          { city: { contains: args.filter } },
          { country: { contains: args.filter } },
        ],
      };

      return await prisma.vendor.findMany({
        ...query,
        where,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) => {
      const where = {
        OR: [
          { id: { contains: args.filter } },
          { firstName: { contains: args.filter } },
          { lastName: { contains: args.filter } },
          { username: { contains: args.filter } },
          { email: { contains: args.filter } },
          { phone: { contains: args.filter } },
          { city: { contains: args.filter } },
          { country: { contains: args.filter } },
        ],
      };

      return prisma.vendor.count({ ...connection, where });
    },
  }),
  vendorById: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.vendor.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  vendorByEmail: t.prismaField({
    type: Vendor,
    nullable: true,
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.vendor.findUniqueOrThrow({
        ...query,
        where: {
          email: args.email,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  loginVendor: t.prismaField({
    type: Vendor,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx): Promise<any | undefined> => {
      const { email, password } = args;
      let errMessage: string | null = null;

      const vendor = await prisma.vendor.findUniqueOrThrow({
        ...query,
        where: { email },
      });

      if (!vendor) {
        errMessage = "No such vendor found.";
        throw new Error("No such vendor found.");
      }

      const valid = vendor && (await bcrypt.compare(password, vendor.password));

      if (!valid) {
        errMessage = "Invalid password.";
        throw new Error("Invalid password.");
      }

      const authToken =
        (vendor && valid && jwt.sign({ vendorId: vendor.id }, APP_SECRET)) ||
        null;

      if (vendor && true === valid && null !== authToken) {
        return {
          ...vendor,
          token: authToken,
        };
      }

      return {
        hasError: true,
        error: {
          type: "credentials",
          message: errMessage,
        },
      };
    },
  }),
  createVendor: t.prismaField({
    type: "Vendor",
    args: {
      firstName: t.arg.string(),
      lastName: t.arg.string(),
      username: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      password: t.arg.string(),
      phone: t.arg.string(),
      status: t.arg.string(),
      image: t.arg.string(),
      language: t.arg.string(),
      address: t.arg.string(),
      city: t.arg.string(),
      country: t.arg.string(),
      emailVerified: t.arg.string(),
      addedOrganization: t.arg.string(),
      organizationId: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        phone,
        status,
        image,
        language,
        address,
        city,
        country,
        emailVerified,
        addedOrganization,
        organizationId,
      } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.vendor.create({
        ...query,
        data: {
          firstName,
          lastName,
          username,
          email,
          password: <any>hashedPassword,
          phone,
          status,
          image,
          language,
          address,
          city,
          country,
          emailVerified,
          addedOrganization,
          organization: {
            connect: { id: String(organizationId) || undefined },
          },
        },
      });
    },
  }),
  updateVendor: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      firstName: t.arg.string(),
      lastName: t.arg.string(),
      username: t.arg.string(),
      phone: t.arg.string(),
      status: t.arg.string(),
      image: t.arg.string(),
      language: t.arg.string(),
      address: t.arg.string(),
      city: t.arg.string(),
      country: t.arg.string(),
      organizationId: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const {
        firstName,
        lastName,
        username,
        phone,
        status,
        image,
        language,
        address,
        city,
        country,
        organizationId,
      } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          firstName: firstName ? firstName : undefined,
          lastName: lastName ? lastName : undefined,
          username: username ? username : undefined,
          phone: phone ? phone : undefined,
          status: status ? status : undefined,
          image: image ? image : undefined,
          language: language ? language : undefined,
          address: address ? address : undefined,
          city: city ? city : undefined,
          country: country ? country : undefined,
          organization: organizationId
            ? { connect: { id: String(organizationId) || undefined } }
            : undefined,
        },
      });
    },
  }),
  updateVendorPassword: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      password: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { password } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          password: hashedPassword ? hashedPassword : undefined,
        },
      });
    },
  }),
  updateVendorImage: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      image: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { image } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          image: image ? image : undefined,
        },
      });
    },
  }),
  updateVendorStatus: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { status } = args;

      return await prisma.vendor.update({
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
  updateVendorEmailVerified: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      emailVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { emailVerified } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          emailVerified: emailVerified ? emailVerified : undefined,
        },
      });
    },
  }),
  updateVendorAddedOrganization: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
      addedOrganization: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { addedOrganization } = args;

      return await prisma.vendor.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          addedOrganization: addedOrganization ? addedOrganization : undefined,
        },
      });
    },
  }),
  deleteVendor: t.prismaField({
    type: "Vendor",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.vendor.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
