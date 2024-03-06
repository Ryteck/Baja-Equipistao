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
	const raffles = await prismaService.raffle.findMany({
		orderBy: { createdAt: "asc" },
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
					{raffles.map((raffle) => (
						<RaffleRow key={raffle.id} raffle={raffle} />
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default Page;
export const revalidate = 0;
