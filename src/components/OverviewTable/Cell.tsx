import * as React from 'react';
import { Table } from 'react-bootstrap';

import { DateOnly } from '../../utilities/DateOnly';

function generateClassNames(amount: number, isSubtotal: boolean): string {
  let classNames = ['align-middle'];

  if (isSubtotal) {
    classNames.push('font-weight-bold');
  }

  if (amount > 0) {
    classNames.push('text-success');
  } else if (amount < 0) {
    classNames.push('text-danger');
  }

  return classNames.join(' ');
}

export type IProps = {
  val: number;
  name?: string;
  isSubtotal?: boolean;
};

export default function Row({ val, name = val, isSubtotal = false }: IProps) {
  return <td className={generateClassNames(val, isSubtotal)}>{name}</td>;
}
