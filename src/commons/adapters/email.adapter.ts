import { isEmail } from 'class-validator';
import { Email } from 'src/brands/email.brand';

export const emailAdapter = (email: string): Email => {
  if (isEmail(email)) {
    return email as Email;
  }
  throw new Error('Invalid Email');
};
