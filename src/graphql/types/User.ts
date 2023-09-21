import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "@src/lib/prisma";
import { APP_SECRET } from "@graphql/utils/auth";
import { builder } from "../builder";

export const User = builder.prismaObject("User", {
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
    role: t.relation("role", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  users: t.prismaConnection({
    type: User,
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.user.findMany({
        ...query,
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: (connection, _args, _ctx, _info) =>
      prisma.user.count({ ...connection }),
  }),
  usersByRoleId: t.prismaConnection({
    type: User,
    cursor: "id",
    args: {
      roleId: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _ctx, _info) => {
      const { roleId } = args;

      return prisma.user.findMany({
        ...query,
        where: {
          roleId,
        },
        orderBy: {
          firstName: "asc",
        },
      });
    },
    totalCount: (connection, args, _ctx, _info) =>
      prisma.user.count({
        ...connection,
        where: {
          roleId: args.roleId,
        },
      }),
  }),
  usersByStatus: t.prismaConnection({
    type: User,
    cursor: "id",
    args: {
      status: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _ctx, _info) => {
      const { status } = args;

      return prisma.user.findMany({
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
      prisma.user.count({
        ...connection,
        where: {
          status: args.status,
        },
      }),
  }),
  usersFiltered: t.prismaConnection({
    type: User,
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

      return await prisma.user.findMany({
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

      return prisma.user.count({ ...connection, where });
    },
  }),
  userById: t.prismaField({
    type: User,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.user.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
  userByEmail: t.prismaField({
    type: User,
    nullable: true,
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.user.findUniqueOrThrow({
        ...query,
        where: {
          email: args.email,
        },
      }),
  }),
}));

builder.mutationFields((t) => ({
  loginUser: t.prismaField({
    type: User,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx): Promise<any | undefined> => {
      const { email, password } = args;
      let errMessage: string | null = null;

      const user = await prisma.user.findUniqueOrThrow({
        ...query,
        where: { email },
      });

      if (!user) {
        errMessage = "No such user found.";
        throw new Error("No such user found.");
      }

      const valid = user && (await bcrypt.compare(password, user.password));

      if (!valid) {
        errMessage = "Invalid password.";
        throw new Error("Invalid password.");
      }

      const authToken =
        (user && valid && jwt.sign({ userId: user.id }, APP_SECRET)) || null;

      if (user && true === valid && null !== authToken) {
        return {
          ...user,
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
  createUser: t.prismaField({
    type: "User",
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
      roleId: t.arg.id(),
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
        roleId,
      } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.user.create({
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
          role: { connect: { id: String(roleId) || undefined } },
        },
      });
    },
  }),
  updateUser: t.prismaField({
    type: "User",
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
      roleId: t.arg.string(),
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
        roleId,
      } = args;

      return await prisma.user.update({
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
          role: roleId
            ? { connect: { id: String(roleId) || undefined } }
            : undefined,
        },
      });
    },
  }),
  updatePassword: t.prismaField({
    type: "User",
    args: {
      id: t.arg.string({ required: true }),
      password: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { password } = args;

      const hashedPassword = password && (await bcrypt.hash(password, 10));

      return await prisma.user.update({
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
  updateUserImage: t.prismaField({
    type: "User",
    args: {
      id: t.arg.string({ required: true }),
      image: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { image } = args;

      return await prisma.user.update({
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
  updateUserStatus: t.prismaField({
    type: "User",
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { status } = args;

      return await prisma.user.update({
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
  updateUserEmailVerified: t.prismaField({
    type: "User",
    args: {
      id: t.arg.string({ required: true }),
      emailVerified: t.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { emailVerified } = args;

      return await prisma.user.update({
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
  deleteUser: t.prismaField({
    type: "User",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.user.delete({
        ...query,
        where: {
          id: args.id,
        },
      }),
  }),
}));
