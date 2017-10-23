import moment from 'moment';
import Expense from "../../../models/expense";

const expenses = [
  new Expense({
    id: '1',
    description: 'abc',
    amount: 1000,
    createdAt: moment(1).valueOf()
  }),
  new Expense({
    id: '2',
    description: 'aaa',
    amount: 2000,
    createdAt: moment(1).subtract(4, 'days').valueOf()
  }),
  new Expense({
    id: '3',
    description: 'def',
    amount: 500,
    createdAt: moment(1).add(4, 'days').valueOf()
  }),
  new Expense({
    id: '4',
    description: 'zzz',
    amount: 1000,
    createdAt: moment(1).valueOf()
  })
];

export default expenses;