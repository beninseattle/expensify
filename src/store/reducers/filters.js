const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  stopDate: undefined
};
export const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: action.sortBy
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_STOP_DATE':
      return {
        ...state,
        stopDate: action.stopDate
      };

    default:
      return state;
  }
};
