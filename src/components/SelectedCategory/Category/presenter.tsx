import * as React from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import { ICategory } from '../../../models';
import Transactions from '../../../presenters/Transactions';

export type IProps = {
  category: ICategory;
  removeCategory: () => void;
};

export default function Category({ category, removeCategory }: IProps) {
  return (
    <div>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="name"
          value={category.name}
          onChange={(e: any) => category.setName(e.target.value)}
        />
      </FormGroup>
      <Transactions category={category} />
      <Button bsStyle="danger" className="ml-3" onClick={removeCategory}>
        Delete Category
      </Button>
    </div>
  );
}
