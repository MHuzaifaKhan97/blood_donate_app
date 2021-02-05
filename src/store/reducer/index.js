import { ADD_DONOR, FETCH_BY_ID, FETCH_DONORS } from '../constant';

const INITIAL_STATE = {
    donors: [],
    categories: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_DONOR: return {
            ...state,
            donors: [action.payload, ...state.donors]
        }
        case FETCH_DONORS: return {
            ...state,
            donors: [action.payload, ...state.donors]
        }
        default: return state;
    }
}
export default reducer;