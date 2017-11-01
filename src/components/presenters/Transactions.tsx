import { observer } from 'mobx-react';
import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

import TransactionRow, {
  IProps as ITransactionRowProps
} from './TransactionRow';

export type IProps = {
  id: string;
  transactions: ITransactionRowProps['transaction'][];
  removeTransaction: (index: number) => void;
  addTransaction: () => void;
};

export default observer(function Transactions({
  id,
  transactions,
  removeTransaction,
  addTransaction
}: IProps) {
  return (
    <div className="mb-3">
      <Droppable droppableId={`transactions-dropzone-${id}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="py-3">
            {transactions.map((t, index) => (
              <TransactionRow
                key={t.id as string}
                transaction={t}
                removeTransaction={() => removeTransaction(index)}
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
});
