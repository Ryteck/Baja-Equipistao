"use client";

import setTicketPaid from "@/actions/setTicketPaid";
import TicketComplete from "@/types/TicketComplete";
import { Ticket } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, QrCode, XIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";
import { TicketQr } from "./ticket-qr";

interface Props {
	ticket: Ticket;
}

export const TicketRow: FC<Props> = ({ ticket }) => {
	const {
		isSuccess,
		data: ticketComplete,
		refetch,
	} = useQuery<TicketComplete>({
		queryKey: ["ticket", ticket.id],
		queryFn: () => fetch(`/api/tickets/${ticket.id}`).then((res) => res.json()),
	});

	return (
		<TableRow>
			<TableCell className="font-medium w-fit">
				<p>{ticket.name ?? "???"}</p>
				<span className="text-sm font-light text-foreground/40">
					{ticket.id}
				</span>
			</TableCell>

			<TableCell>
				<p>{ticket.phone ?? "???"}</p>
				<p>{ticket.email ?? "???"}</p>
			</TableCell>

			<TableCell>
				{isSuccess ? ticketComplete.user : <Skeleton className="h-4 w-20" />}
			</TableCell>

			<TableCell>
				{isSuccess ? (
					ticketComplete.ticketNumbers.length
				) : (
					<Skeleton className="h-4 w-20" />
				)}
			</TableCell>

			<TableCell>
				{isSuccess ? (
					(ticketComplete.ticketNumbers.length * ticket.price).toLocaleString(
						"pt-BR",
						{
							style: "currency",
							currency: "BRL",
						},
					)
				) : (
					<Skeleton className="h-4 w-20" />
				)}
			</TableCell>

			<TableCell>
				{isSuccess ? (
					<>
						{ticketComplete.ticketNumbers.length === 0
							? "Em cadastro"
							: ticketComplete.paid
							  ? "Confirmado"
							  : "Pendente"}
					</>
				) : (
					<Skeleton className="h-4 w-20" />
				)}
			</TableCell>

			<TableCell className="text-right space-x-2 flex justify-end">
				{isSuccess ? (
					<>
						<TicketQr ticket={ticketComplete} />

						<Button
							className="bg-red-700 text-red-200 hover:bg-red-900"
							size="icon"
							disabled={
								ticketComplete.ticketNumbers.length === 0 ||
								!ticketComplete.paid
							}
							onClick={async () => {
								await setTicketPaid(ticket.id, false);

								await refetch();
							}}
						>
							<XIcon className="h-4 w-4" />
						</Button>

						<Button
							className="bg-green-700 text-green-200 hover:bg-green-900"
							size="icon"
							disabled={
								ticketComplete.ticketNumbers.length === 0 || ticketComplete.paid
							}
							onClick={async () => {
								await setTicketPaid(ticket.id, true);
								await refetch();
							}}
						>
							<CheckIcon className="h-4 w-4" />
						</Button>
					</>
				) : (
					<Skeleton className="h-8 w-24" />
				)}
			</TableCell>
		</TableRow>
	);
};
