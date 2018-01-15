import moment from 'moment';
import Expense from "../../models/expense";

const expensesFixture = [
  new Expense({
    id: '1',
    description: 'abc',
    amount: 1000,
    createdAt: moment(Date.now()).valueOf()
  }),
  new Expense({
    id: '2',
    description: 'aaa',
    amount: 2000,
    createdAt: moment(Date.now()).subtract(4, 'days').valueOf()
  }),
  new Expense({
    id: '3',
    description: 'def',
    amount: 500,
    createdAt: moment(Date.now()).add(4, 'days').valueOf()
  }),
  new Expense({
    id: '4',
    description: 'zzz',
    amount: 1000,
    createdAt: moment(Date.now()).valueOf()
  })
];

export default expensesFixture;