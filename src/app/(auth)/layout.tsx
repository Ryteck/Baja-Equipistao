import { AuthProvider } from "@/components/auth-provider";
import { NavBar } from "@/components/nav-bar";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
	<AuthProvider>
		<main className="flex w-screen h-screen">
			<NavBar />

			<div className="w-full h-full flex flex-col">{children}</div>
		</main>
	</AuthProvider>
);

export default Layout;
