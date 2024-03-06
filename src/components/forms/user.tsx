"use client";

import userFormAction from "@/actions/forms/user";
import userFormSchema, { UserFormSchema } from "@/schemas/forms/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { LoaderIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
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

interface Props {
	user?: User;
}

export const UserForm: FC<Props> = ({ user }) => {
	const router = useRouter();

	const form = useForm<UserFormSchema>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			name: user?.name ?? "",
			nickname: user?.nickname ?? "",
			pixKey: user?.pixKey ?? "",
			admin: user?.admin ?? false,
			active: user?.active ?? true,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		await userFormAction(data, user?.id);
		router.refresh();
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={user ? "outline" : "default"} size="icon">
					{user ? (
						<PencilIcon className="h-4 w-4" />
					) : (
						<PlusIcon className="h-4 w-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
				<DialogHeader>
					<DialogTitle>{user ? "Editar usuário" : "Criar usuário"}</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form id="user-form" className="grid gap-4 py-4" onSubmit={onSubmit}>
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
							name="nickname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome de usuário</FormLabel>
									<FormControl>
										<Input placeholder="Digite um nome de usuário" {...field} />
									</FormControl>
									<FormDescription>Nome de usuário para login.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="pixKey"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Chave PIX</FormLabel>
									<FormControl>
										<Input placeholder="Digite uma chave PIX" {...field} />
									</FormControl>
									<FormDescription>Chave PIX aleatória</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="admin"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Administrador?</FormLabel>
										<FormDescription>
											Permite o usuário acessar as páginas de controles (rifas e
											usuários).
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Ativo?</FormLabel>
										<FormDescription>
											Permite o usuário, se conectar.
										</FormDescription>
									</div>
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
