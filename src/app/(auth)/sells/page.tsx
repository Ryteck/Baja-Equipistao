"use client";

import { TicketTable } from "@/components/ticket-table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth";
import RaffleUserComplete from "@/types/RaffleUserComplete";
import { useQuery } from "@tanstack/react-query";
import { type FC, useState } from "react";

const Page: FC = () => {
	const authStore = useAuthStore();

	const { data: rafflesUser } = useQuery<RaffleUserComplete[]>({
		queryKey: ["tickets"],
		queryFn: () =>
			fetch(`/api/raffleUser/${authStore.getUser()?.id}`).then((res) =>
				res.json(),
			),
	});

	const [selectedRaffleId, setSelectedRaffleId] = useState<string>();

	const raffleUser = rafflesUser?.find(
		({ raffle: { id } }) => selectedRaffleId === id,
	);

	return (
		<div className="flex w-full h-full p-2 flex-col items-center">
			<Select value={selectedRaffleId} onValueChange={setSelectedRaffleId}>
				<SelectTrigger className="w-96">
					<SelectValue placeholder="Selecione uma rifa" className="" />
				</SelectTrigger>
				<SelectContent>
					{rafflesUser?.map((raffleUser) => (
						<SelectItem key={raffleUser.id} value={raffleUser.raffle.id}>
							{raffleUser.raffle.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{raffleUser && (
				<TicketTable
					raffle={raffleUser.raffle}
					tickets={raffleUser.tickets}
					raffleUser={raffleUser}
				/>
			)}
		</div>
	);
};

export default Page;
