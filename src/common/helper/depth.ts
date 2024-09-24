import { inspect } from 'node:util';

export function depthLogger(data: any) {
  console.log(inspect(data, true, Infinity));
}

export function depthExtractor(data: any) {
  return inspect(data, true, Infinity);
}
