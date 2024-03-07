"use server";

import prismaService from "@/services/prisma";

export default async function generetaNewTicket(raffleUserId: string) {
	const response = await prismaService.raffleUser.findFirstOrThrow({
		where: {
			active: true,
			id: raffleUserId,
		},
		select: { raffle: { select: { price: true } } },
	});

	await prismaService.ticket.create({
		data: { price: response.raffle.price, raffleUserId },
	});
}
