import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../../models';
import DragHandle from '../../../presenters/DragHandle';
import Transaction from '../Transaction';

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
              <DragHandle {...provided.dragHandleProps} />
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
