"use client";

import { useAuthStore } from "@/stores/auth";
import { Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState(true);

	const pathname = usePathname();
	const authStore = useAuthStore();
	const router = useRouter();

	async function setup() {
		const token = authStore.getToken();
		if (token === null) {
			router.push("/");
			return;
		}
		await authStore.valide();
		setLoading(false);
	}

	useEffect(() => {
		setup().catch(console.error);
	}, [pathname, authStore.token]);

	return loading ? (
		<main className="h-screen w-screen flex">
			<p className="m-auto flex gap-2">
				<Loader2Icon className="animate-spin" />
				Carregando...
			</p>
		</main>
	) : (
		<>{children}</>
	);
};
