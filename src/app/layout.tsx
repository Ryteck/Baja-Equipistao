import "@/styles/no-scroll.css";
import "@/styles/tailwind.css";

import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Baja - Equipistão",
	description: "UniEduK Equipistão - SAE Baja",
};

const Layout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="pt-BT" suppressHydrationWarning>
		<body>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<QueryProvider>{children}</QueryProvider>
			</ThemeProvider>
		</body>
	</html>
);

export default Layout;
