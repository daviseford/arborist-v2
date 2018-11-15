import { DestinationActions } from '../actions/destination_actions';
import { IDestinationState } from '../definitions/state';

const defaultState = { path: '' };

const destinationReducer = (state: IDestinationState = defaultState, action) => {
    switch (action.type) {
        case DestinationActions.ADD_DESTINATION_PATH:
            return {
                ...state,
                path: action.path,
            };
        case DestinationActions.CLEAR_DESTINATION_PATH:
            return {
                ...state,
                path: defaultState.path,
            };
        default:
            return state;
    }
};

export default destinationReducer;
