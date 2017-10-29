import { ICategory } from '../models';
import transactionToProps from './transactionToProps';

export default (category: ICategory) => {
  const {
    name,
    setName,
    id,
    transactions,
    removeTransaction,
    addTransaction
  } = category;

  return {
    name,
    setName: (e: any) => setName(e.target.value),
    id: id,
    transactions: transactions.map(transactionToProps),
    removeTransaction: (index: number) => () => removeTransaction(index),
    addTransaction: addTransaction
  };
};
