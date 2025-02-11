import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IV, Password } from 'src/brands';
import { Encrypted } from 'src/brands/encypted.brand';
import { Key } from 'src/brands/key.brand';

@Injectable()
export class CypherIVService {
  encrypt<T = any>({ iv, key, text }: { text: string; key: Key; iv: IV }): T {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(key, 'hex'),
      Buffer.from(iv, 'hex'),
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex') as T;
  }

  decrypt<T = any>(encryptData: Encrypted, key: Key, iv: IV) {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key, 'hex'),
      Buffer.from(iv, 'hex'),
    );
    let decryptedData = decipher.update(encryptData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData as T;
  }
}
