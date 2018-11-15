import { CameraActions } from '../actions/camera_actions';
import { ICameraState } from './../definitions/state';

const defaultState = { model: '', number: null, manufacturer: '' };

const cameraReducer = (state: ICameraState = defaultState, action) => {
    switch (action.type) {
        case CameraActions.ADD_CAMERA_MODEL:
            return {
                ...state,
                model: action.model,
            };
        case CameraActions.ADD_CAMERA_NUMBER:
            return {
                ...state,
                number: action.number,
            };
        case CameraActions.ADD_CAMERA_MANUFACTURER:
            return {
                ...state,
                manufacturer: action.manufacturer,
            };
        default:
            return state;
    }
};

export default cameraReducer;
