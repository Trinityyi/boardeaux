export const initialState = {
  'user': {
    id: 'user',
    name: 'User'
  }
};

export const actionTypes = {
  SET_USER_NAME: 'SET_USER_NAME'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_USER_NAME:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        name: action.name
      }
    };
  default:
    return state;
  }
};

export const actions = {
  setUserName: (id, name) => {
    return {
      type: actionTypes.SET_USER_NAME,
      id,
      name
    };
  }
};

export default reducer;
