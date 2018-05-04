export const addCameraModel = (model: string) => ({ model, type: CameraActions.ADD_CAMERA_MODEL });
export const addCameraNumber = (number: number) => ({ number, type: CameraActions.ADD_CAMERA_NUMBER });
export const addCameraManufacturer = (manufacturer: string) => (
    { manufacturer, type: CameraActions.ADD_CAMERA_MANUFACTURER }
);

export const CameraActions = {
    ADD_CAMERA_MANUFACTURER: 'ADD_CAMERA_MANUFACTURER',
    ADD_CAMERA_MODEL: 'ADD_CAMERA_MODEL',
    ADD_CAMERA_NUMBER: 'ADD_CAMERA_NUMBER',
};
