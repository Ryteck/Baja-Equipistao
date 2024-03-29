"use client";

import { User } from "@prisma/client";
import type { FC } from "react";
import { UserForm } from "../forms/user";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { ResetPassword } from "./reset-password";

interface Props {
	user: User;
}

export const UserRow: FC<Props> = ({ user }) => (
	<TableRow>
		<TableCell className="font-medium">
			<p>{user.name}</p>
			<span className="text-sm font-light text-foreground/40">{user.id}</span>
		</TableCell>

		<TableCell>{user.nickname}</TableCell>

		<TableCell>{user.pixKey ?? "<=^-^=>"}</TableCell>

		<TableCell>
			<Badge variant={user.admin ? "default" : "secondary"}>
				{user.admin ? "Sim" : "Não"}
			</Badge>
		</TableCell>

		<TableCell>
			<Badge variant={user.active ? "default" : "secondary"}>
				{user.active ? "Sim" : "Não"}
			</Badge>
		</TableCell>

		<TableCell className="text-right space-x-2 flex justify-end">
			<UserForm user={user} />
			<ResetPassword user={user} />
		</TableCell>
	</TableRow>
);
