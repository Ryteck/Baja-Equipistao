import { Ticket, TicketNumber } from "@prisma/client";

export default interface TicketComplete extends Ticket {
	ticketNumbers: TicketNumber[];
	user: string;
}
