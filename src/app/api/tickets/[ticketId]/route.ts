import prismaService from "@/services/prisma";
import RouteParams from "@/types/RouteParams";
import TicketComplete from "@/types/TicketComplete";

export const revalidate = 0;

interface Params {
	ticketId: string;
}

export async function GET(request: Request, { params }: RouteParams<Params>) {
	const {
		raffleUser: {
			user: { name: user },
		},
		...ticket
	} = await prismaService.ticket.findUniqueOrThrow({
		include: {
			ticketNumbers: true,
			raffleUser: { select: { user: { select: { name: true } } } },
		},
		where: { id: params.ticketId },
	});

	const ticketComplete: TicketComplete = { ...ticket, user };

	return Response.json(ticketComplete);
}
