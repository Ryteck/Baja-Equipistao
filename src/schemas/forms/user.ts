import { z } from "zod";

const userFormSchema = z.object({
	name: z.string().min(1),
	nickname: z.string().min(1),
	pixKey: z
		.string()
		.nullish()
		.transform((arg) => arg ?? ""),
	admin: z.boolean(),
	active: z.boolean(),
});

export default userFormSchema;
export type UserFormSchema = z.infer<typeof userFormSchema>;
