"use client";

import LogoYellow from "@/assets/logo-yellow.png";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	nickname: z.string().min(1),
	password: z.string().min(1),
});

const Page: FC = () => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const authStore = useAuthStore();

	useEffect(() => {
		const token = authStore.getToken();
		if (token !== null) {
			router.push("/sells");
			return;
		}
		setLoading(false);
	}, [authStore.token]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nickname: "",
			password: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await authStore.login(data.nickname, data.password);
	});

	return loading ? null : (
		<main className="h-screen w-screen flex">
			<Card className="m-auto p-4 min-w-96">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Preencha seus dados para acessar</CardDescription>
				</CardHeader>

				<CardContent>
					<Image
						src={LogoYellow}
						alt="Logo"
						className="mx-auto mt-5 w-40 h-40"
					/>

					<Form {...form}>
						<form
							id="login-form"
							className="mt-10 grid gap-4 py-4"
							onSubmit={onSubmit}
						>
							<FormField
								control={form.control}
								name="nickname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Usuário</FormLabel>
										<FormControl>
											<Input placeholder="Digite seu usuário" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Digite sua senha"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>

				<CardFooter>
					<Button
						form="login-form"
						className="w-full"
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<LoaderIcon className="animate-spin" />
						) : (
							"Login"
						)}
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
};

export default Page;
