import { Decimal } from 'decimal.js-light';
import { identity } from 'lodash';

export function sumDecimals(arr: Decimal[]) {
  return arr.reduce((sum, element) => sum.add(element), new Decimal(0));
}
