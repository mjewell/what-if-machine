import { observer } from 'mobx-react';
import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

import { ICategory } from '../models';
import TransactionRow from './TransactionRow';

export type IProps = {
  category: ICategory;
};

export default observer(function Transactions({ category }: IProps) {
  category.transactions.forEach(t => t);

  return (
    <div className="mb-3">
      <Droppable droppableId={`transactions-dropzone-${category.id as string}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="py-3">
            {category.transactions.map((t, index) => (
              <TransactionRow
                key={t.id as string}
                transaction={t}
                removeTransaction={() => category.removeTransaction(index)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button bsStyle="success" onClick={category.addTransaction}>
        Add Transaction
      </Button>
    </div>
  );
});
