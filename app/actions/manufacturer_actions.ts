export const addManufacturer = (manufacturer: string) => ({ manufacturer, type: ManufacturerActions.ADD_MANUFACTURER });
export const removeManufacturer = () => ({ type: ManufacturerActions.REMOVE_MANUFACTURER });

export const ManufacturerActions = {
    ADD_MANUFACTURER: 'ADD_MANUFACTURER',
    REMOVE_MANUFACTURER: 'REMOVE_MANUFACTURER',
};
