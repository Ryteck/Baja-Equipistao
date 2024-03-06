"use server";

import { generateBHash } from "@/libs/hash";
import { UserFormSchema } from "@/schemas/forms/user";
import prismaService from "@/services/prisma";

export default async function userFormAction(
	data: UserFormSchema,
	id?: string,
) {
	if (id) {
		await prismaService.user.update({
			data,
			where: { id },
		});
	} else {
		const user = await prismaService.user.create({ data });
		const password = await generateBHash(user.id);

		await prismaService.user.update({
			data: { password },
			where: { id: user.id },
		});
	}
}
