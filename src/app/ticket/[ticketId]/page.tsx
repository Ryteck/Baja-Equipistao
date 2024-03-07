import { TicketForm } from "@/components/forms/ticket";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import prismaService from "@/services/prisma";
import RouteParams from "@/types/RouteParams";
import { QrCodePix } from "qrcode-pix";
import type { FC } from "react";

interface Params {
	ticketId: string;
}

const Page: FC<RouteParams<Params>> = async ({ params }) => {
	const {
		ticketNumbers,
		raffleUser: { user },
		...ticket
	} = await prismaService.ticket.findUniqueOrThrow({
		where: { id: params.ticketId },
		include: {
			ticketNumbers: true,
			raffleUser: {
				select: { user: { select: { name: true, pixKey: true } } },
			},
		},
	});

	const qrCodePix = await QrCodePix({
		version: "01",
		key: user.pixKey,
		name: user.name,
		city: "Jaguariúna",
		transactionId: `BAJARIFA${new Date().getTime()}`,
		value: ticket.price * ticketNumbers.length,
	}).base64();

	return (
		<main className="flex h-screen w-screen">
			{ticketNumbers.length === 0 ? (
				<TicketForm ticket={ticket} />
			) : (
				<Card className="w-[350px] m-auto">
					<CardHeader>
						<CardTitle>Cadastro concluído</CardTitle>
						<CardDescription>
							Aguarde a aprovação do seu pagamento e boa sorte :)
						</CardDescription>
					</CardHeader>

					<CardContent>
						<p>Nome: {ticket.name}</p>
						<p>Telefone: {ticket.phone}</p>
						<p>Email: {ticket.email}</p>
						<p>
							Status do seu pagamento: {ticket.paid ? "Concluído" : "Pendente"}
						</p>

						{user.pixKey !== "" && !ticket.paid && (
							<>
								<div className="flex w-full flex-col mt-4 gap-2 items-center">
									<img alt="PIX-QRcode" src={qrCodePix} />

									<p>Pix QR-Code para pagamento</p>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			)}
		</main>
	);
};

export default Page;
export const revalidate = 0;
