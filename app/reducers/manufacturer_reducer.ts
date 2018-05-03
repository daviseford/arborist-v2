import { ManufacturerActions } from '../actions/manufacturer_actions';

const defaultState = [{ manufacturer: null }];

const manufacturerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ManufacturerActions.ADD_MANUFACTURER:
            return [{ manufacturer: action.manufacturer }];
        case ManufacturerActions.REMOVE_MANUFACTURER:
            return defaultState;
        default:
            return state;
    }
};

export default manufacturerReducer;
