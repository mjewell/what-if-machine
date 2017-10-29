import { observer } from 'mobx-react';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../models';
import DragHandle from '../DragHandle';
import Transaction from '../Transaction';
import transactionToProps from './transactionToProps';

export type IProps = {
  removeTransaction: () => void;
  transaction: ITransaction;
};

export default observer(function TransactionRow({
  removeTransaction,
  transaction
}: IProps) {
  const transactionProps = transactionToProps(transaction);

  return (
    <Draggable draggableId={`transaction-${transaction.id}`}>
      {(provided, snapshot) => (
        <div>
          <div ref={provided.innerRef} style={provided.draggableStyle}>
            <Form inline>
              <DragHandle {...provided.dragHandleProps} />
              <Transaction transaction={transactionProps} />
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
