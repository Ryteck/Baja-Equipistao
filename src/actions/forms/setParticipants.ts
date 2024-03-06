"use server";

import prismaService from "@/services/prisma";
import Participant from "@/types/Participant";

export default async function setParticipantsAction(
	raffleId: string,
	participants: Participant[],
) {
	await prismaService.$transaction(async (tr) => {
		await tr.raffleUser.updateMany({
			data: { active: false },
			where: { raffleId },
		});

		for (const { include, id } of participants) {
			if (include)
				await tr.raffleUser.upsert({
					where: { userId_raffleId: { userId: id, raffleId } },
					update: { active: true },
					create: { active: true, userId: id, raffleId },
				});
		}
	});
}
