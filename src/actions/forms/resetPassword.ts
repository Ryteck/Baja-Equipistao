"use server";

import { generateBHash } from "@/libs/hash";
import { UserFormSchema } from "@/schemas/forms/user";
import prismaService from "@/services/prisma";

export default async function resetPassword(id: string, password: string) {
	const hash = await generateBHash(password);

	await prismaService.user.update({
		data: { password: hash },
		where: { id },
	});
}
