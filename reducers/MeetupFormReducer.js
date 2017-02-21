import moment from 'moment';
import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  SET_CURRENT_MEETUP,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS,
  CREATE_VOTING_SUCCESS,
  SET_VOTE,
  RESET_MEETUP,
} from '../actions/types';

const thirtyMin = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm');
const hour = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm');
const hourTwo = moment().add(2, 'hour').format('YYYY-MM-DD HH:mm');
const hourThree = moment().add(3, 'hour').format('YYYY-MM-DD HH:mm');

const INITIAL_STATE = {
  name: '',
  description: '',
  start: hourTwo,
  end: hourThree,
  state: 'New York',
  venue: { name: 'Top Picks', id: 'topPicks' },
  venues: {},
  status: 'created',
  location: '',
  voteStart: thirtyMin,
  voteEnd: hour
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEETUP_CHANGED:
      return { ...state, [action.prop]: action.value };
    case ADD_MEETUP:
      return { ...state, loading: true };
    case ADD_MEETUP_SUCCESS:
      return INITIAL_STATE;
    case SET_CURRENT_MEETUP:
      return { ...state, ...action.meetup };
    case EDIT_MEETUP:
      return { ...state, loading: true };
    case EDIT_MEETUP_SUCCESS:
      return INITIAL_STATE;
    case SET_VOTE: {
      const venue = state.venues[action.venueId];
      venue.votes = action.vote;
      const venues = { ...state.venues, venue };
      return { ...state, venues };
    }
    case RESET_MEETUP:
      return INITIAL_STATE;
    default:
      return state;
  }
};
