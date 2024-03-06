import { User } from "@prisma/client";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStore {
	token: null | string;
	getToken: () => null | string;

	logout: () => void;
	login: (nickname: string, password: string) => Promise<void>;

	user: null | User;
	getUser: () => null | User;

	valide: () => Promise<void>;
}

export const useAuthStore = create<TokenStore>()(
	persist(
		(set, get) => ({
			token: null,

			getToken: () => get().token,

			logout: () => set({ token: null, user: null }),

			login: async (nickname, password) => {
				try {
					const { data } = await axios.post("/api/auth/login", {
						nickname,
						password,
					});

					set({ token: data.token });
				} catch (err) {
					console.error(err);
				}
			},

			user: null,

			getUser: () => get().user,

			valide: async () => {
				const { token } = get();

				try {
					if (token !== null) {
						const { data } = await axios.post("/api/auth/valide", {
							token,
						});

						set({ user: data });
					}
				} catch (err) {
					console.error(err);
					set({ token: null, user: null });
				}
			},
		}),
		{ name: "zustand-auth" },
	),
);
