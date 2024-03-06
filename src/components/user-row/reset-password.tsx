"use client";

import resetPassword from "@/actions/forms/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { LoaderIcon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

interface Props {
	user: User;
}

export const ResetPassword: FC<Props> = ({ user }) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		if (data.password !== data.confirmPassword)
			return alert("Senhas diferentes");

		await new Promise((resolve) => setTimeout(resolve, 2000));
		await resetPassword(user.id, data.password);
		router.refresh();
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<LockIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Alter a senha</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form id="user-form" className="grid gap-4 py-4" onSubmit={onSubmit}>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Digite uma nova senha"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar senha</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Confirme sua senha"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<DialogFooter>
					<Button
						form="user-form"
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
