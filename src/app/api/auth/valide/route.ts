import { verifyToken } from "@/libs/token";
import prismaService from "@/services/prisma";

export async function POST(request: Request) {
	const { token } = await request.json();
	const { id } = verifyToken(token);

	const user = await prismaService.user.findUniqueOrThrow({
		where: { id, active: true },
	});

	return Response.json(user);
}
