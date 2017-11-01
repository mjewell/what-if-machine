import { observer } from 'mobx-react';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import Transactions, { IProps as ITransactionsProps } from './Transactions';

export type IProps = {
  category: {
    name: string;
    setName: (name: string) => void;
    id: string;
    transactions: ITransactionsProps['transactions'];
    removeTransaction: (index: number) => void;
    addTransaction: () => void;
  };
  removeCategory: () => void;
};

@observer
export default class Category extends Component<IProps, {}> {
  setName = (e: any) => {
    const { category } = this.props;
    category.setName(e.target.value);
  };

  render() {
    const { category, removeCategory } = this.props;

    return (
      <div>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="name"
            value={category.name}
            onChange={this.setName}
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
  }
}
