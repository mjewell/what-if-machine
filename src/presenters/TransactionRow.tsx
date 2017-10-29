import { observer } from 'mobx-react';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Form } from 'react-bootstrap';

import DragHandle from './DragHandle';
import Transaction, { IProps as ITransactionProps } from './Transaction';

export type IProps = {
  transaction: ITransactionProps['transaction'] & { id: string };
  removeTransaction: () => void;
};

export default observer(function TransactionRow({
  transaction,
  removeTransaction
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
});
