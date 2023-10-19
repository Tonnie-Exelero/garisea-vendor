import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@src/lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";
import { encryptData } from "@core/utils/encryption";

export const Customer = builder.prismaObject("Customer", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName", { nullable: true }),
    lastName: t.exposeString("lastName", { nullable: true }),
    username: t.exposeString("username", { nullable: true }),
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
    onlineStatus: t.exposeString("onlineStatus", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  customers: t.prismaConnection({
    type: Customer,
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) => {
      return await prisma.customer.findMany({
        ...query,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, _args, _ctx, _info) =>
      await prisma.customer.count({ ...connection }),
  }),
  customersByStatus: t.prismaConnection({
    type: Customer,
    cursor: "id",
    args: {
      status: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { status } = args;

      return await prisma.customer.findMany({
        ...query,
        where: {
          status,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) =>
      await prisma.customer.count({
        ...connection,
        where: {
          status: args.status,
        },
      }),
  }),
  customersFiltered: t.prismaConnection({
    type: Customer,
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

      return await prisma.customer.findMany({
        ...query,
        where,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: async (connection, args, _ctx, _info) => {
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

      return await prisma.customer.count({ ...connection, where });
    },
  }),
  customerById: t.prismaField({
    type: Customer,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      await prisma.customer.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  loginCustomer: t.prismaField({
    type: Customer,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { email, password } = args;
      let errMessage: string | null = null;

      const customer = await prisma.customer.findUnique({
        ...query,
        where: { email },
      });

      if (!customer) {
        errMessage = "No such customer found.";
        throw new Error("No such customer found.");
      }

      const valid =
        customer && (await bcrypt.compare(password, customer.password));

      if (!valid) {
        errMessage = "Invalid password.";
        throw new Error("Invalid password.");
      }

      // Update online status
      customer &&
        (await prisma.customer.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "online",
          },
        }));

      const authToken =
        (customer && valid && jwt.sign({ customer }, APP_SECRET)) || null;

      if (customer && true === valid && null !== authToken) {
        const domain =
          process.env.NEXT_PUBLIC_BASE_URL &&
          new URL(process.env.NEXT_PUBLIC_BASE_URL);

        // Set the auth cookie on the response

        await ctx.request.cookieStore.set({
          name: "auth",
          sameSite: "strict",
          // @ts-ignore
          secure: domain?.hostname.includes("localhost") ? false : true,
          // @ts-ignore
          domain: domain?.hostname,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          value: await encryptData(authToken),
          httpOnly: true,
        });

        return {
          token: encryptData(authToken),
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
  logoutCustomer: t.prismaField({
    type: Customer,
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx): Promise<any | undefined> => {
      const { email } = args;

      const customer = await prisma.customer.findUnique({
        ...query,
        where: { email },
      });

      if (!customer) return { email };

      // Update online status
      customer &&
        (await prisma.customer.update({
          ...query,
          where: { email },
          data: {
            onlineStatus: "offline",
          },
        }));

      // Remove the auth cookie
      await (await ctx).request.cookieStore.delete("auth");

      return { email: customer.email };
    },
  }),
  createCustomer: t.prismaField({
    type: "Customer",
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
      } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.customer.create({
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
        },
      });
    },
  }),
  updateCustomer: t.prismaField({
    type: "Customer",
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
      } = args;

      return await prisma.customer.update({
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
        },
      });
    },
  }),
  updateCustomerPassword: t.prismaField({
    type: "Customer",
    args: {
      id: t.arg.string({ required: true }),
      password: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { password } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.customer.update({
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
  updateCustomerEmailVerified: t.prismaField({
    type: "Customer",
    args: {
      id: t.arg.string({ required: true }),
      emailVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { emailVerified } = args;

      return await prisma.customer.update({
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
  deleteCustomer: t.prismaField({
    type: "Customer",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      await prisma.customer.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
