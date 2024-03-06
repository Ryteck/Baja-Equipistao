import prismaService from "@/services/prisma";
import RouteParams from "@/types/RouteParams";
import type { FC } from "react";

interface Params {
	raffleId: string;
}

const Page: FC<RouteParams<Params>> = ({ params }) => {
	return <div className="m-auto">sells</div>;
};

export default Page;
export const revalidate = 0;
