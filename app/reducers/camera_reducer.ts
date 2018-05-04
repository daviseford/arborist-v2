import { CameraActions } from '../actions/camera_actions';

const defaultState = { model: '', number: null, manufacturer: '' };

export interface ICameraState {
    manufacturer: string;
    model: string;
    number: number | null;
}

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
