export const addCamera = (camera: string) => ({ camera, type: CameraActions.ADD_CAMERA });
export const removeCamera = () => ({ type: CameraActions.REMOVE_CAMERA });

export const CameraActions = {
    ADD_CAMERA: 'ADD_CAMERA',
    REMOVE_CAMERA: 'REMOVE_CAMERA',
};