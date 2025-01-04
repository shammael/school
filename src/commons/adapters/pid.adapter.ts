import { Pid } from 'src/brands';
import { REGEX_MATCHER } from 'utils';

export const pidAdapter = (pid: string): Pid => {
  if (!REGEX_MATCHER.PID.test(pid)) {
    throw new Error('Not a valid PID');
  }

  return pid as Pid;
};
