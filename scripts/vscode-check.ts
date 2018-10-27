
import * as ChildProcess from 'child_process';

ChildProcess.spawn(
  'node',
  ['node_modules/typescript/bin/tsc', '-w'], { stdio: 'inherit' }
);
