import { ITransaction } from '../models';

export default (transaction: ITransaction) => {
  const {
    id,
    amountStr,
    name,
    recurrence,
    setAmount,
    setName,
    setRecurrence
  } = transaction;

  return {
    id,
    amount: amountStr,
    name,
    recurrence,
    setAmount: (e: any) => setAmount(e.target.value),
    setName: (e: any) => setName(e.target.value),
    setRecurrence
  };
};
