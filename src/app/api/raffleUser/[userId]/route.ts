import prismaService from "@/services/prisma";
import RaffleUserComplete from "@/types/RaffleUserComplete";
import RouteParams from "@/types/RouteParams";

export const revalidate = 0;

interface Params {
	userId: string;
}

export async function GET(request: Request, { params }: RouteParams<Params>) {
	const response: RaffleUserComplete[] =
		await prismaService.raffleUser.findMany({
			include: { raffle: true, tickets: true },
			where: {
				userId: params.userId,
				raffle: {
					OR: [{ deadline: null }, { deadline: { gt: new Date() } }],
				},
			},
		});

	return Response.json(response);
}
