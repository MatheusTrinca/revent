const INCREMENT_DATA = 'INCREMENT_DATA';
const DECREMENT_DATA = 'DECREMENT_DATA';

export const increment = value => ({
  type: INCREMENT_DATA,
  payload: value,
});

export const decrement = value => ({
  type: DECREMENT_DATA,
  payload: value,
});

const initialState = {
  data: 42,
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
    default:
      return state;
  }
}
