"use client";

import setParticipantsAction from "@/actions/forms/setParticipants";
import Participant from "@/types/Participant";
import { Raffle, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, UsersRoundIcon } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";

interface Props {
	raffle: Raffle;
}

export const RaffleParticipants: FC<Props> = ({ raffle }) => {
	const { status, data } = useQuery<Participant[]>({
		queryKey: ["participants", raffle.id],
		queryFn: () =>
			axios.get(`api/participants/${raffle.id}`).then(({ data }) => data),
	});

	const [isLoading, setIsLoading] = useState(false);
	const [participants, setParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		if (status === "success") setParticipants(data);
	}, [status, data]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<UsersRoundIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
				<DialogHeader>
					<DialogTitle>Editar participantes</DialogTitle>
					<DialogDescription>
						Selecione abaixo quem terá acesso a venda das rifas
					</DialogDescription>
				</DialogHeader>

				{participants.map((participant) => (
					<div key={participant.id} className="flex items-center space-x-2">
						<Checkbox
							checked={participant.include}
							onCheckedChange={(checked) => {
								setParticipants((state) =>
									state.map((arg) => ({
										...arg,
										include:
											arg.id === participant.id
												? checked === true
												: arg.include,
									})),
								);
							}}
							id={`participant-${participant.id}`}
						/>
						<Label
							htmlFor={`participant-${participant.id}`}
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{participant.name}
						</Label>
					</div>
				))}

				<DialogFooter>
					<Button
						variant="secondary"
						type="submit"
						className="w-fit"
						onClick={() =>
							setParticipants((state) =>
								state.map((props) => ({ ...props, include: true })),
							)
						}
					>
						Selecionar tudo
					</Button>
					<Button
						variant="secondary"
						type="submit"
						className="w-fit"
						onClick={() =>
							setParticipants((state) =>
								state.map((props) => ({ ...props, include: false })),
							)
						}
					>
						Desselecionar tudo
					</Button>
					<Button
						disabled={isLoading}
						type="submit"
						className="w-20"
						onClick={async () => {
							setIsLoading(true);

							setParticipantsAction(raffle.id, participants)
								.catch(console.error)
								.finally(() => {
									setIsLoading(false);
								});
						}}
					>
						{isLoading ? <Loader2 className="animate-spin" /> : "Salvar"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
