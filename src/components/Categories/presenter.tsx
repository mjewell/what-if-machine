import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

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
        <div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="name"
              value={category.name}
              onChange={(e: any) => category.setName(e.target.value)}
            />
          </FormGroup>
          <Transactions key={category.id as string} category={category} />
        </div>
      ))}
      <Button bsStyle="success" onClick={addCategory}>
        Add Category
      </Button>
    </div>
  );
}
