import * as jwt from 'jsonwebtoken';

type JWTVerifyOption<T extends Record<string, any>> = {
  [K in keyof T]: T[K]; // Mantiene las claves dinámicas con sus tipos
} & {
  iat: number;
  exp: number;
};

export class JwtService {
  sign<T = any, k = any>({
    payload,
    secret,
    options,
  }: {
    payload: T;
    secret: string;
    options?: jwt.SignOptions;
  }) {
    console.log({ options });
    return jwt.sign(payload as any, secret, options) as k;
  }

  verify<T = any>({
    token,
    secret,
    options,
  }: {
    token: string;
    secret: string;
    options?: jwt.VerifyOptions;
  }): JWTVerifyOption<T> {
    return jwt.verify(token, secret, options) as JWTVerifyOption<T>;
  }
}
