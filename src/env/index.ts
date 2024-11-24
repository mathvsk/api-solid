import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
    PORT: z.coerce.number().default(3333),
});

const validateEnv = envSchema.safeParse(process.env);

if (!validateEnv.success) {
    console.error('Invalid environment variables', validateEnv.error.format());

    throw new Error(validateEnv.error.message);
}

export const env = validateEnv.data;