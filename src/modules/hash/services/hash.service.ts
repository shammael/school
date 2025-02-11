import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Hash, Password } from 'src/brands';

@Injectable()
export class HashService {
  async hash(password: Password): Promise<Hash> {
    return (await argon2.hash(password, {
      type: argon2.argon2id, // Use argon2id algorithm
      memoryCost: 2 ** 16, // Memory cost in KB
      timeCost: 4, // Number of iterations
      parallelism: 2, // Degree of parallelism
      hashLength: 32, // Length of the hash
    })) as Hash;
  }

  async verify(hash: Hash, password: Password): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
