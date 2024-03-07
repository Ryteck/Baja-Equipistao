import { z } from "zod";

const ticketFormSchema = z.object({
	name: z.string().min(1),
	phone: z.string().min(1),
	email: z.string().min(1).email(),
	numbers: z
		.string()
		.transform(Number)
		.or(z.number())
		.refine((arg) => arg > 0, { message: "Número precisa ser maior que 0" }),
});

export default ticketFormSchema;
export type TicketFormSchema = z.infer<typeof ticketFormSchema>;
