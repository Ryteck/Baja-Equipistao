"use client";

import raffleFormAction from "@/actions/forms/raffle";
import { cn } from "@/libs/cn";
import raffleFormSchema, { RaffleFormSchema } from "@/schemas/forms/raffle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Raffle } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, LoaderIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
	raffle?: Raffle;
}

export const RaffleForm: FC<Props> = ({ raffle }) => {
	const router = useRouter();

	const form = useForm<RaffleFormSchema>({
		resolver: zodResolver(raffleFormSchema),
		defaultValues: {
			name: raffle?.name ?? "",
			price: raffle?.price ?? 0,
			deadline: raffle?.deadline,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		await raffleFormAction(data, raffle?.id);
		router.refresh();
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={raffle ? "outline" : "default"} size="icon">
					{raffle ? (
						<PencilIcon className="h-4 w-4" />
					) : (
						<PlusIcon className="h-4 w-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{raffle ? "Editar rifa" : "Criar rifa"}</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						id="raffle-form"
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
										<Input placeholder="Digite um nome" {...field} />
									</FormControl>
									<FormDescription>Nome de identificação.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preço</FormLabel>
									<FormControl>
										<Input
											placeholder="Digite o preço da rifa"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Preço por números solicitados.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="deadline"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Data limite</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full justify-start text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{field.value ? (
														format(field.value, "dd/MM/yyyy")
													) : (
														<span>Escolha uma data</span>
													)}
												</Button>
											</FormControl>
										</PopoverTrigger>

										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={field.value ?? undefined}
												onSelect={(value) => {
													field.onChange(value ?? null);
												}}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormDescription>
										Data de fechamento, nao será gerado nenhum link novo após a
										data preechida.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<DialogFooter>
					<Button
						form="raffle-form"
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
