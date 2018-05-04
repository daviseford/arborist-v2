export interface IPeopleConfig {
    [name: string]: {
        first_name: string;
        last_name: string;
        full_name: string;
        title: string;
    };
}

export interface IManufacturerConfig {
    [name: string]: {
        name: string,
        supported_models: string[];
    };
}
