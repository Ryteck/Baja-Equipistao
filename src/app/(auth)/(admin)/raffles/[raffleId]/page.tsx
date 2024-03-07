import { TicketTable } from "@/components/ticket-table";
import prismaService from "@/services/prisma";
import RouteParams from "@/types/RouteParams";
import type { FC } from "react";

interface Params {
	raffleId: string;
}

const Page: FC<RouteParams<Params>> = async ({ params }) => {
	const raffle = await prismaService.raffle.findUniqueOrThrow({
		where: { id: params.raffleId },
	});

	const tickets = await prismaService.ticket.findMany({
		where: { raffleUser: { raffleId: params.raffleId } },
	});

	return <TicketTable raffle={raffle} tickets={tickets} />;
};

export default Page;
export const revalidate = 0;
