"use client";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState(true);

	const authStore = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		const user = authStore.getUser();

		if (user?.admin !== true) {
			router.push("/sells");
			return;
		}

		setLoading(false);
	}, []);

	return loading ? null : <>{children}</>;
};

export default Layout;
