import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

import { ICategory, ITransaction } from '../../models';
import Rows from './Rows';

export type IProps = {
  category: ICategory;
  transactions: ITransaction[];
  addTransaction: () => void;
};

export default function Transactions({
  category,
  transactions,
  addTransaction
}: IProps) {
  return (
    <div className="mb-3">
      <Droppable droppableId={`transactions-dropzone-${category.id as string}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="py-3">
            <Rows category={category} transactions={transactions} />
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
