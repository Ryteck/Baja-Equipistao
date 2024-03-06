import { UserForm } from "@/components/forms/user";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { UserRow } from "@/components/user-row";
import prismaService from "@/services/prisma";
import type { FC } from "react";

const Page: FC = async () => {
	const users = await prismaService.user.findMany({
		orderBy: { nickname: "asc" },
	});

	return (
		<>
			<div className="my-8 mx-auto flex flex-col items-center gap-4">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
					Controle de usuários
				</h2>

				<UserForm />
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Usuário</TableHead>
						<TableHead>Chave PIX</TableHead>
						<TableHead>Administrador?</TableHead>
						<TableHead>Ativo?</TableHead>
						<TableHead className="text-right">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<UserRow key={user.id} user={user} />
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default Page;
export const revalidate = 0;
