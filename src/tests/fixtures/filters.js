import moment from 'moment';

const defaultFilters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  stopDate: undefined
};

const populatedFilters = {
  text: 'coffee',
  sortBy: 'amount',
  startDate: moment(Date.now()),
  stopDate: moment(Date.now()).add(3,'days')
};

export {defaultFilters, populatedFilters};