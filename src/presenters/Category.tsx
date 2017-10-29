import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import Transactions, { IProps as ITransactionsProps } from './Transactions';

export type IProps = {
  category: {
    name: string;
    setName: (e: any) => void;
    id: string;
    transactions: ITransactionsProps['transactions'];
    removeTransaction: (index: number) => () => void;
    addTransaction: () => void;
  };
  removeCategory: () => void;
};

export default observer(function Category({
  category,
  removeCategory
}: IProps) {
  return (
    <div>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="name"
          value={category.name}
          onChange={category.setName}
        />
      </FormGroup>
      <Transactions
        id={category.id as string}
        transactions={category.transactions}
        removeTransaction={category.removeTransaction}
        addTransaction={category.addTransaction}
      />
      <Button bsStyle="danger" className="ml-3" onClick={removeCategory}>
        Delete Category
      </Button>
    </div>
  );
});
