"use client";

import TicketComplete from "@/types/TicketComplete";
import { CopyIcon, QrCode } from "lucide-react";
import { type FC } from "react";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface Props {
	ticket: TicketComplete;
}

export const TicketQr: FC<Props> = ({ ticket }) => {
	const url = new URL(
		`ticket/${ticket.id}`,
		String(process.env.NEXT_PUBLIC_BASE_URL),
	).toString();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<QrCode className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
				<DialogHeader>
					<DialogTitle>Link para o ticket</DialogTitle>
					<DialogDescription>
						Leia o QR-code ou copie o link abaixo para seguir ao ticket
					</DialogDescription>
				</DialogHeader>
				<div className="flex bg-white p-2 mx-auto">
					<QRCode value={url} />
				</div>

				<div className="flex gap-2">
					<Input value={url} contentEditable={false} />
					<Button variant="outline" size="icon">
						<CopyIcon className="h-4 w-4" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
