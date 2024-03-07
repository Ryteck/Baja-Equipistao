"use client";

import ticketFormAction from "@/actions/forms/ticket";
import ticketFormSchema, { TicketFormSchema } from "@/schemas/forms/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
	ticket: Ticket;
}

export const TicketForm: FC<Props> = ({ ticket }) => {
	const router = useRouter();

	const form = useForm<TicketFormSchema>({
		resolver: zodResolver(ticketFormSchema),
		defaultValues: { numbers: 1 },
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		await ticketFormAction(data, ticket.id);
		router.refresh();
	});

	return (
		<Card className="w-[350px] m-auto">
			<CardHeader>
				<CardTitle>Geração de ticket</CardTitle>
				<CardDescription>
					Complete seu cadastro para gerar seu ticket.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						id="ticket-form"
						className="grid gap-4 py-4"
						onSubmit={onSubmit}
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Digite seu nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefone</FormLabel>
									<FormControl>
										<Input placeholder="Digite seu telefone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Digite seu Email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="numbers"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total de números desejados</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormDescription>
										Valor a ser pago:{" "}
										{(ticket.price * form.getValues("numbers")).toLocaleString(
											"pt-BR",
											{
												style: "currency",
												currency: "BRL",
											},
										)}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>

			<CardFooter>
				<Button
					form="ticket-form"
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-20"
				>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Salvar"
					)}
				</Button>
			</CardFooter>
		</Card>
	);
};
