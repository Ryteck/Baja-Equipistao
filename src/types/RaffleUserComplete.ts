import { Raffle, RaffleUser, Ticket } from "@prisma/client";

export default interface RaffleUserComplete extends RaffleUser {
	raffle: Raffle;
	tickets: Ticket[];
}
