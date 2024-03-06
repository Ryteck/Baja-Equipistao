"use client";

import { Raffle } from "@prisma/client";
import { format, getDate } from "date-fns";
import { SendHorizonalIcon, TrashIcon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { RaffleForm } from "../forms/raffle";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { RaffleParticipants } from "./participants";

interface Props {
	raffle: Raffle;
}

export const RaffleRow: FC<Props> = ({ raffle }) => (
	<TableRow key={raffle.id}>
		<TableCell className="font-medium w-fit flex flex-col">
			<p>{raffle.name}</p>
			<span className="text-sm font-light text-foreground/40">{raffle.id}</span>
		</TableCell>

		<TableCell>
			{raffle.price.toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL",
			})}
		</TableCell>

		<TableCell>
			{raffle.deadline
				? (() => {
						const days =
							Math.floor(
								(new Date(raffle.deadline).getTime() - new Date().getTime()) /
									(1000 * 60 * 60 * 24),
							) + 1;

						return days < 1 ? "Fechado" : `Fecha em ${days} dia(s)`;
				  })()
				: "Aberto por tempo indeterminado"}
		</TableCell>

		<TableCell>
			{raffle.deadline ? format(raffle.deadline, "dd/MM/yyyy") : "<=^-^=>"}
		</TableCell>

		<TableCell>
			{Number(0).toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL",
			})}
		</TableCell>

		<TableCell className="text-right space-x-2 flex justify-end">
			<RaffleForm raffle={raffle} />

			<RaffleParticipants raffle={raffle} />

			<Button variant="outline" size="icon" asChild>
				<Link href={`/raffles/${raffle.id}`} target="_blank">
					<SendHorizonalIcon className="h-4 w-4" />
				</Link>
			</Button>
		</TableCell>
	</TableRow>
);
