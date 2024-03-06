import { createHash } from "crypto";
import { compare, genSalt, hash } from "bcrypt";

const hashRounds = Number(process.env.HASH_ROUNDS);
const hashSecret = String(process.env.HASH_SECRET);

const generateCHash = (arg: string): string =>
	createHash("sha256").update(arg).digest("hex");

const generateLCHash = (arg: string): string =>
	Array.from({ length: hashRounds }).reduce(
		generateCHash,
		`${hashSecret}&${arg}`,
	);

const generateBSalt = (): Promise<string> => genSalt(hashRounds);

export const generateBHash = async (arg: string): Promise<string> => {
	const lcHash = generateLCHash(arg);
	const bsalt = await generateBSalt();
	return hash(lcHash, bsalt);
};

export const compareBHash = async (
	text: string,
	bHash: string,
): Promise<boolean> => {
	const lcHash = generateLCHash(text);
	return compare(lcHash, bHash);
};
