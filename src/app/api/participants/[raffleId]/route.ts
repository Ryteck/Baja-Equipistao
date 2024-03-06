import prismaService from "@/services/prisma";
import Participant from "@/types/Participant";
import RouteParams from "@/types/RouteParams";

export const revalidate = 0;

interface Params {
	raffleId: string;
}

export async function GET(request: Request, { params }: RouteParams<Params>) {
	const response = await prismaService.user.findMany({
		include: { raffles: { where: { raffleId: params.raffleId } } },
		where: { active: true },
	});

	const participants: Participant[] = response.map(({ raffles, ...user }) => ({
		...user,
		include: raffles.length > 0 && raffles[0].active,
	}));

	return Response.json(participants);
}
