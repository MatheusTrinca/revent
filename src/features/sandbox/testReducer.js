import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReduces';
import { delay } from '../../app/common/util/util';
import { toast } from 'react-toastify';

const INCREMENT_DATA = 'INCREMENT_DATA';
const DECREMENT_DATA = 'DECREMENT_DATA';
const SET_LATLNG = 'SET_LATLNG';

export const increment = value => async dispatch => {
  dispatch(asyncActionStart());
  try {
    await delay(1000);
    dispatch({ type: INCREMENT_DATA, payload: value });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err));
  }
};

export const decrement = value => async dispatch => {
  dispatch(asyncActionStart());
  try {
    await delay(1000);
    dispatch({ type: DECREMENT_DATA, payload: value });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err));
    toast.error(err);
  }
};

export const setLatLng = latLng => ({
  type: SET_LATLNG,
  payload: latLng,
});

const initialState = {
  data: 42,
  latLng: null,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_DATA:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_DATA:
      return {
        ...state,
        data: state.data - action.payload,
      };
    case SET_LATLNG:
      return {
        ...state,
        latLng: action.payload,
      };
    default:
      return state;
  }
}
