"use client";

import generetaNewTicket from "@/actions/generetaNewTicket";
import { Raffle, RaffleUser, Ticket } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { FC } from "react";
import { TicketRow } from "./ticket-row";
import { Button } from "./ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

interface Props {
	raffle: Raffle;
	tickets: Ticket[];
	raffleUser?: RaffleUser;
}

export const TicketTable: FC<Props> = ({ raffle, tickets, raffleUser }) => {
	const queryClient = useQueryClient();

	return (
		<>
			<div className="my-8 mx-auto flex flex-col items-center gap-4">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-center">
					Controle de tickets
					<br />
					<h3 className="text-sm">{raffle.name}</h3>
				</h2>

				{raffleUser?.active && (
					<Button
						variant={raffle ? "outline" : "default"}
						size="icon"
						onClick={async () => {
							await generetaNewTicket(raffleUser.id);
							await queryClient.invalidateQueries({ queryKey: ["tickets"] });
						}}
					>
						<PlusIcon className="h-4 w-4" />
					</Button>
				)}
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Comprador</TableHead>
						<TableHead>Contato</TableHead>
						<TableHead>Vendedor</TableHead>
						<TableHead>Total de números</TableHead>
						<TableHead>Arrecadação</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tickets
						.sort((a, b) => {
							if (a.id < b.id) return 1;
							if (a.id > b.id) return -1;
							return 0;
						})
						.map((ticket) => (
							<TicketRow key={ticket.id} ticket={ticket} />
						))}
				</TableBody>
			</Table>
		</>
	);
};
