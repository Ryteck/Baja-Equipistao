"use server";

import { generateBHash } from "@/libs/hash";
import prismaService from "@/services/prisma";

export default async function resetPassword(id: string, password: string) {
	const hash = await generateBHash(password);

	await prismaService.user.update({
		data: { password: hash, encrypted: true },
		where: { id },
	});
}
