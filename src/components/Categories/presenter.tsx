import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import { ICategory } from '../../models';
import Category from './Category';

export type IProps = {
  categories: ICategory[];
  addCategory: () => void;
  removeCategory: (category: ICategory) => () => void;
};

export default function Categories({
  categories,
  addCategory,
  removeCategory
}: IProps) {
  return (
    <div className="mb-3">
      {categories.map(category => (
        <Category
          key={category.id as string}
          category={category}
          removeCategory={removeCategory(category)}
        />
      ))}
      <Button bsStyle="success" onClick={addCategory}>
        Add Category
      </Button>
    </div>
  );
}
