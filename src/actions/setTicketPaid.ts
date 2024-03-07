"use server";

import prismaService from "@/services/prisma";

export default async function setTicketPaid(id: string, paid: boolean) {
	await prismaService.ticket.update({
		where: { id },
		data: { paid },
	});
}
