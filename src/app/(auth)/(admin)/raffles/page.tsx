import { RaffleForm } from "@/components/forms/raffle";
import { RaffleRow } from "@/components/raffle-row";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import prismaService from "@/services/prisma";
import type { FC } from "react";

const Page: FC = async () => {
	const [raffles, tickets, totalTicketNumbers] = await Promise.all([
		prismaService.raffle.findMany({
			orderBy: { createdAt: "asc" },
		}),
		prismaService.ticket.findMany({
			select: { id: true, raffleUser: { select: { raffleId: true } } },
			where: { paid: true },
		}),
		prismaService.ticketNumber.groupBy({
			by: ["ticketId"],
			where: { ticket: { paid: true } },
			_count: true,
		}),
	]);

	const parsedTickets = tickets.map((ticket) => {
		const ticketNumber = totalTicketNumbers.find(
			(totalTicketNumber) => ticket.id === totalTicketNumber.ticketId,
		);

		return { ...ticket, total: ticketNumber?._count ?? 0 };
	});

	const parsedRaffles = raffles.map((raffle) => {
		const ticketTotal = parsedTickets.find(
			(parsedTicket) => raffle.id === parsedTicket.raffleUser.raffleId,
		);

		return { ...raffle, total: ticketTotal?.total ?? 0 };
	});

	return (
		<>
			<div className="my-8 mx-auto flex flex-col items-center gap-4">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
					Controle de rifas
				</h2>

				<RaffleForm />
			</div>

			<Table className="w-full">
				<TableHeader>
					<TableRow>
						<TableHead>Rifa</TableHead>
						<TableHead>Preço</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Data limite</TableHead>
						<TableHead>Arrecadação</TableHead>
						<TableHead className="text-right">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{parsedRaffles.map(({ total, ...raffle }) => (
						<RaffleRow key={raffle.id} raffle={raffle} total={total} />
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default Page;
export const revalidate = 0;
