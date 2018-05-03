import { CameraActions } from '../actions/camera_actions';

const defaultState = '';

export type TCameraState = string;

const cameraReducer = (state: TCameraState = '', action) => {
    switch (action.type) {
        case CameraActions.ADD_CAMERA:
            return action.camera;
        case CameraActions.REMOVE_CAMERA:
            return defaultState;
        default:
            return state;
    }
};

export default cameraReducer;
