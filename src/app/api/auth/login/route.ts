import { compareBHash } from "@/libs/hash";
import { generateToken } from "@/libs/token";
import prismaService from "@/services/prisma";

export async function POST(request: Request) {
	const { nickname, password } = await request.json();

	const user = await prismaService.user.findUnique({
		where: { nickname, active: true },
	});

	if (user === null || !(await compareBHash(password, user.password))) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const token = generateToken({ id: user.id });

	return Response.json({ token });
}
