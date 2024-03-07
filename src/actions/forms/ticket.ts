"use server";

import { TicketFormSchema } from "@/schemas/forms/ticket";
import prismaService from "@/services/prisma";

export default async function ticketFormAction(
	data: TicketFormSchema,
	id: string,
) {
	await prismaService.$transaction(async (trs) => {
		const {
			_max: { number: maxNumber },
		} = await trs.ticketNumber.aggregate({
			_max: { number: true },
			where: { ticketId: id },
		});

		const newNumbers = Array(data.numbers ?? 0)
			.fill(maxNumber)
			.map((arg, index) => ({ number: arg + index + 1 }));

		await trs.ticket.update({
			data: {
				name: data.name,
				phone: data.phone,
				email: data.email,
				ticketNumbers: { create: newNumbers },
			},
			where: { id },
		});
	});
}
