import { TPrimaryDirectory, TSecondaryDirectory } from './directory';

export interface IDestinationState {
    path: string;
}
export interface IFileInfo {
    filepath: string;
    filename: string;
}

export interface IDirState {
    type: TPrimaryDirectory | TSecondaryDirectory;
    index: number;
    path: string;
    files: IFileInfo[];
}

export interface ICameraState {
    manufacturer: string;
    model: string;
    number: number | null;
}
