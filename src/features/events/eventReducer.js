import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';
import { sampleData } from '../../app/api/sampleData';

const initialState = {
  events: sampleData,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    default:
      return state;
  }
}
