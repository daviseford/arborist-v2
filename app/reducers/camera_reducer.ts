import { CameraActions } from '../actions/camera_actions';

const defaultState = [{ camera: null }];
export interface ICameraState { camera: string | null; }

const cameraReducer = (state: ICameraState[] = defaultState, action) => {
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
