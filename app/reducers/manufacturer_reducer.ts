import { ManufacturerActions } from '../actions/manufacturer_actions';

const defaultState = '';
export type TManufacturerState = string;

const manufacturerReducer = (state: TManufacturerState = defaultState, action) => {
    switch (action.type) {
        case ManufacturerActions.ADD_MANUFACTURER:
            return action.manufacturer;
        case ManufacturerActions.REMOVE_MANUFACTURER:
            return defaultState;
        default:
            return state;
    }
};

export default manufacturerReducer;
