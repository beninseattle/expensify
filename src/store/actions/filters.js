export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

/**
 * @param {moment} startDate
 */
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

/**
 * @param {moment} stopDate
 */
export const setStopDate = (stopDate) => ({
  type: 'SET_STOP_DATE',
  stopDate
});
