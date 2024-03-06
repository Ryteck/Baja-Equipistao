import { z } from "zod";

const raffleFormSchema = z.object({
	name: z.string().min(1),
	price: z.number().or(z.string().transform(Number)),
	deadline: z.date().nullish(),
});

export default raffleFormSchema;
export type RaffleFormSchema = z.infer<typeof raffleFormSchema>;
