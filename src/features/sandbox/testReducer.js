const INCREMENT_DATA = 'INCREMENT_DATA';
const DECREMENT_DATA = 'DECREMENT_DATA';
const SET_LATLNG = 'SET_LATLNG';

export const increment = value => ({
  type: INCREMENT_DATA,
  payload: value,
});

export const decrement = value => ({
  type: DECREMENT_DATA,
  payload: value,
});

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
