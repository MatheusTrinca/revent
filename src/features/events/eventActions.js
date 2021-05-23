import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
} from './eventConstants';
import { fetchSampleData } from '../../app/api/mockAPI';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReduces';

export const loadEvents = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const events = await fetchSampleData();
    dispatch({ type: FETCH_EVENTS, payload: events });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err));
  }
};

export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};
export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};
export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};
