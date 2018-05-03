import { CameraActions } from '../actions/camera_actions';

const defaultState = [{ camera: null }];

const cameraReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CameraActions.ADD_CAMERA:
            return [{ camera: action.camera }];
        case CameraActions.REMOVE_CAMERA:
            return defaultState;
        default:
            return state;
    }
};

export default cameraReducer;
