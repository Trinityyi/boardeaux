/**
 * This is not an actual partial state object with reducer and initial state.
 * For the time being, this is just a collection of shared actions, the results
 * of which reside inside other parts of the state.
 */

export const actionTypes = {
  LOG_CARD_ACTIVITY: 'LOG_CARD_ACTIVITY'
};

export const actions = {
  logCardActivity: (id, message) => {
    return {
      type: actionTypes.LOG_CARD_ACTIVITY,
      id,
      message: {
        text: message,
        timestamp: new Date()
      }
    };
  }
};
