import { v4 as uuid } from 'uuid';
import { actions as columnsActions } from './columns';
import { actions as interfaceActions } from './interface';
import {
  actions as activityLogActions,
  actionTypes as activityLogActionTypes
} from './activityLog';
import { priorities } from '../shared';

const { addCardToColumn } = columnsActions;
const { setCardModalId } = interfaceActions;
const { logCardActivity } = activityLogActions;

export const initialState = {};

export const actionTypes = {
  CREATE_CARD: 'CREATE_CARD',
  SET_CARD_TITLE: 'SET_CARD_TITLE',
  SET_CARD_DESCRIPTION: 'SET_CARD_DESCRIPTION',
  SET_PRIORITY: 'SET_PRIORITY',
  ADD_TAG: 'ADD_TAG',
  REMOVE_TAG: 'REMOVE_TAG',
  ARCHIVE_CARD: 'ARCHIVE_CARD',
  DELETE_CARD: 'DELETE_CARD',
  RESTORE_CARD: 'RESTORE_CARD',
  SET_CARD_DUE_DATE: 'SET_CARD_DUE_DATE'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CREATE_CARD:
    return {
      ...state,
      [action.id]: action.data
    };
  case actionTypes.SET_CARD_TITLE:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        title: action.title
      }
    };
  case actionTypes.SET_CARD_DESCRIPTION:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        description: action.description
      }
    };
  case actionTypes.SET_PRIORITY:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        priority: action.priority
      }
    };
  case actionTypes.ADD_TAG:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        tags: [
          ...state[action.id].tags,
          action.tag
        ]
      }
    };
  case actionTypes.REMOVE_TAG:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        tags: state[action.id].tags
          .filter(x => x !== action.tag)
      }
    };
  case actionTypes.ARCHIVE_CARD:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        archived: true
      }
    };
  case actionTypes.DELETE_CARD:
    return Object.keys(state).reduce((acc, key) => {
      if (key !== action.id) acc[key] = state[key];
      return acc;
    }, {});
  case actionTypes.RESTORE_CARD:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        archived: false
      }
    };
  case actionTypes.SET_CARD_DUE_DATE:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        dueDate: action.dueDate
      }
    };
  case activityLogActionTypes.LOG_CARD_ACTIVITY:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        activityLog: [
          ...state[action.id].activityLog,
          action.message
        ]
      }
    };
  default:
    return state;
  }
};

export const actions = {
  createCard: (data, columnId) => dispatch => {
    const { title, description, tags } = data;
    const id = uuid();
    dispatch({
      type: actionTypes.CREATE_CARD,
      data: {
        id,
        title,
        description: description ? description : '',
        priority: 2,
        tags: tags ? tags : [],
        archived: false,
        activityLog: []
      },
      id
    });
    dispatch(addCardToColumn(id, columnId));
  },
  setCardTitle: (id, title) => {
    return {
      type: actionTypes.SET_CARD_TITLE,
      title,
      id
    };
  },
  setCardDescription: (id, description) => {
    return {
      type: actionTypes.SET_CARD_DESCRIPTION,
      description,
      id
    };
  },
  setCardPriority: (id, priority) => (dispatch, getState) => {
    const { title, priority: lastPriority } = getState().cards[id];
    const user = getState().users['user'];
    dispatch(logCardActivity(id, `${user.name} changed priority of card ${title} from ${priorities[lastPriority]} to ${priorities[priority]}.`));
    dispatch({
      type: actionTypes.SET_PRIORITY,
      priority,
      id
    });
  },
  addTag: (id, tag) => {
    return {
      type: actionTypes.ADD_TAG,
      tag,
      id
    };
  },
  removeTag: (id, tag) => {
    return {
      type: actionTypes.REMOVE_TAG,
      tag,
      id
    };
  },
  archiveCard: id => (dispatch, getState) => {
    const { title } = getState().cards[id];
    const user = getState().users['user'];
    dispatch(logCardActivity(id, `${user.name} archived card ${title}.`));
    dispatch({
      type: actionTypes.ARCHIVE_CARD,
      id
    });
  },
  deleteCard: id => dispatch => {
    dispatch(setCardModalId(null));
    return {
      type: actionTypes.DELETE_CARD,
      id
    };
  },
  setCardDueDate: (id, dueDate) => (dispatch, getState) => {
    const { title } = getState().cards[id];
    const user = getState().users['user'];
    dispatch(logCardActivity(id, dueDate
      ? `${user.name} set due date for ${title} to ${dueDate.toLocaleDateString('en-GB')}.`
      : `${user.name} cleared due date for ${title}.`
    ));
    dispatch({
      type: actionTypes.SET_CARD_DUE_DATE,
      id,
      dueDate
    });
  },
  restoreCard: id => (dispatch, getState) => {
    const { title } = getState().cards[id];
    const user = getState().users['user'];
    dispatch(logCardActivity(id, `${user.name} restored card ${title}.`));
    dispatch({
      type: actionTypes.RESTORE_CARD,
      id
    });
  },
  logCardActivity
};

export default reducer;
