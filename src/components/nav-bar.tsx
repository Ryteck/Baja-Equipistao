"use client";

import { useAuthStore } from "@/stores/auth";
import {
	CircleDollarSignIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	UsersIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { FC } from "react";
import { Button } from "./ui/button";

export const NavBar: FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const authStore = useAuthStore();

	return (
		<div className="h-screen w-fit flex flex-col p-2 gap-2 border-r border-neutral-800">
			<Button
				variant="default"
				size="icon"
				disabled={pathname === "/sells"}
				onClick={() => router.push("/sells")}
			>
				<CircleDollarSignIcon className="h-4 w-4" />
			</Button>

			{authStore.user?.admin && (
				<>
					<Button
						variant="default"
						size="icon"
						disabled={pathname === "/raffles"}
						onClick={() => router.push("/raffles")}
					>
						<LayoutDashboardIcon className="h-4 w-4" />
					</Button>

					<Button
						variant="default"
						size="icon"
						disabled={pathname === "/users"}
						onClick={() => router.push("/users")}
					>
						<UsersIcon className="h-4 w-4" />
					</Button>
				</>
			)}

			<Button
				className="mt-auto"
				variant="destructive"
				size="icon"
				onClick={authStore.logout}
			>
				<LogOutIcon className="h-4 w-4" />
			</Button>
		</div>
	);
};
