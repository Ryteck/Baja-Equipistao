"use server";

import { RaffleFormSchema } from "@/schemas/forms/raffle";
import prismaService from "@/services/prisma";

export default async function raffleFormAction(
	data: RaffleFormSchema,
	id?: string,
) {
	if (id)
		await prismaService.raffle.update({
			data,
			where: { id },
		});
	else await prismaService.raffle.create({ data });
}
