import { sign, verify } from "jsonwebtoken";

const tokenSecret = String(process.env.TOKEN_SECRET);

interface Payload {
	id: string;
}

export const generateToken = (payload: Payload) => sign(payload, tokenSecret);

export const verifyToken = (token: string): Payload =>
	verify(token, tokenSecret) as Payload;
