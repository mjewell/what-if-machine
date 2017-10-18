import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

import { ICategory } from '../../models';
import Transactions from '../Transactions';

export type IProps = {
  categories: ICategory[];
  addCategory: () => void;
};

export default function Categories({ categories, addCategory }: IProps) {
  return (
    <div className="mb-3">
      {categories.map(category => (
        <Transactions key={category.id as string} category={category} />
      ))}
      <Button bsStyle="success" onClick={addCategory}>
        Add Category
      </Button>
    </div>
  );
}
