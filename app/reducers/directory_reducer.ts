import { DirectoryActions } from '../actions/directory_actions';
import { TPrimaryDirectory, TSecondaryDirectory } from '../definitions/directory';
import { kDirectoryPrimary, kDirectorySeconday } from '../utils/config';

export interface IDirState { type: TPrimaryDirectory | TSecondaryDirectory; dir: string; }

const directoryReducer = (state: IDirState[] = [], action) => {
    switch (action.type) {
        case DirectoryActions.ADD_PRIMARY_DIRECTORY:
            // Remove previous primary directory, if any, and any duplicates
            const primary_filter = state.filter(x => x.type !== kDirectoryPrimary && x.dir !== action.dir);
            return [
                ...primary_filter,
                { type: kDirectoryPrimary, dir: action.dir },
            ];
        case DirectoryActions.ADD_SECONDARY_DIRECTORY:
            const secondary_filter = state.filter(x => x.dir !== action.dir);
            return [
                ...secondary_filter,
                { type: kDirectorySeconday, dir: action.dir },
            ];
        case DirectoryActions.REMOVE_DIRECTORY:
            const remove_filter = state.filter(x => x.dir !== action.dir);
            return [
                ...remove_filter,
            ];
        case DirectoryActions.CLEAR_DIRECTORIES:
            return [];
        default:
            return state;
    }
};

export default directoryReducer;
