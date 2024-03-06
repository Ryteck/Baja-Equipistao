import { PrismaClient } from "@prisma/client";

declare global {
	// biome-ignore lint/style/noVar: needed for global
	var prisma: undefined | PrismaClient;
}

const prismaService: PrismaClient = globalThis.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaService;

export default prismaService;
