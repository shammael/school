import { z } from 'zod';

enum NODE_ENV_ENUM {
  'PRODUCTION' = 'production',
  'DEVELOP' = 'development',
  'QUALITY' = 'quality',
  'DEMO' = 'demo',
}

export const schema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.string().transform((value) => {
    if (typeof value === 'boolean') {
      return Boolean(value);
    }
    return value;
  }),
  NODE_ENV: z.nativeEnum(NODE_ENV_ENUM),
  JWT_ACCESS_TOKEN: z.string(),
  JWT_REFRESH_TOKEN: z.string(),
  CYPHER_IV_REFRESH: z.string(),
  CYPHER_KEY_REFRESH: z.string(),
});

export type ENV_TYPE = z.infer<typeof schema>;
