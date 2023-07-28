import 'dotenv/config';
import { z } from 'zod';


const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    HOST: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('Invalid Environment Variables', _env.error.format());
    throw new Error('invalid Environment Variables.');
}

export const env = _env.data;
