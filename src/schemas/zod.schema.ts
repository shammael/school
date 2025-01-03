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
});

export type ENV_TYPE = z.infer<typeof schema>;
