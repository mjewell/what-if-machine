import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../../models';
import Transaction from '../Transaction';
import Handle from './Handle';

export type IProps = {
  removeTransaction: () => void;
  transaction: ITransaction;
};

export default function TransactionRow({
  removeTransaction,
  transaction
}: IProps) {
  return (
    <Draggable draggableId={`transaction-${transaction.id}`}>
      {(provided, snapshot) => (
        <div>
          <div ref={provided.innerRef} style={provided.draggableStyle}>
            <Form inline>
              <Handle {...provided.dragHandleProps} />
              <Transaction transaction={transaction} />
              <Button
                bsStyle="danger"
                className="ml-3"
                onClick={removeTransaction}
              >
                Delete
              </Button>
            </Form>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
