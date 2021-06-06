import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  CLEAR_COMMENTS,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  SET_START_DATE,
  RETAIN_STATE,
} from './eventConstants';

const initialState = {
  events: [],
  comments: [],
  moreEvents: true,
  selectedEvent: null,
  lastVisible: null,
  filter: 'all',
  startDate: new Date(),
  retainState: false,
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
    case FETCH_EVENTS:
      return {
        ...state,
        events: [...state.events, ...action.payload.events],
        moreEvents: action.payload.moreEvents,
        lastVisible: action.payload.lastVisible,
      };
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: action.payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: true,
        lastVisible: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: action.payload,
      };
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        startDate: action.payload,
        moreEvents: true,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
