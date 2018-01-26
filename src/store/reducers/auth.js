export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        isDemo: action.isDemo
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};