import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

import { ITransaction } from '../../models';
import Rows from './Rows';

export type IProps = {
  addTransaction: () => void;
};

export default function Transactions({ addTransaction }: IProps) {
  return (
    <div className="mb-3">
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <Rows />
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
