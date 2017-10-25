import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { ICategory } from '../../models';
import Rows from './Rows';

export type IProps = {
  category: ICategory;
};

export default function Transactions({ category }: IProps) {
  return (
    <div className="mb-3">
      <Droppable droppableId={`transactions-dropzone-${category.id as string}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="py-3">
            <Rows category={category} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button bsStyle="success" onClick={category.addTransaction}>
        Add Transaction
      </Button>
    </div>
  );
}
