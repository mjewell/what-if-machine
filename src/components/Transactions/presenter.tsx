import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../models';
import { ITransactionsStore } from '../../stores';
import Transaction from '../Transaction';
import Row from './Row';

export type IProps = {
  removeTransaction: (index: number) => () => void;
  addTransaction: () => void;
  transactions: ITransaction[];
};

export default function Transactions({
  transactions,
  addTransaction,
  removeTransaction
}: IProps) {
  return (
    <div className="mb-3">
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {transactions.map((t, index) => (
              <Row
                key={t.id as string}
                transaction={t}
                removeTransaction={removeTransaction(index)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button bsStyle="success" onClick={addTransaction}>
        Add Transaction
      </Button>
    </div>
  );
}
