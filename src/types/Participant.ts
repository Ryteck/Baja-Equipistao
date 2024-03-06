import { User } from "@prisma/client";

type Participant = User & { include: boolean };

export default Participant;
