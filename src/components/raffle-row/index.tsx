"use client";

import { Raffle } from "@prisma/client";
import { format } from "date-fns";
import { SendHorizonalIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { RaffleForm } from "../forms/raffle";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { RaffleParticipants } from "./participants";

interface Props {
	raffle: Raffle;
	total: number;
}

export const RaffleRow: FC<Props> = ({ raffle, total }) => (
	<TableRow>
		<TableCell className="font-medium">
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
			{(total * raffle.price).toLocaleString("pt-BR", {
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
