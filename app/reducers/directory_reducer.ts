import { DirectoryOptions } from '../actions/directory_actions';
import { TPrimaryDirectory, TSecondaryDirectory } from '../definitions/directory';
import { kDirectoryPrimary, kDirectorySeconday } from '../utils/config';

interface IDirState { type: TPrimaryDirectory | TSecondaryDirectory; dir: string; }

const directoryReducer = (state: IDirState[] = [], action) => {
    switch (action.type) {
        case DirectoryOptions.ADD_PRIMARY_DIRECTORY:
            // Remove previous primary directory, if any, and any duplicates
            const primary_filter = state.filter(x => x.type !== kDirectoryPrimary && x.dir !== action.dir);
            return [
                ...primary_filter,
                { type: kDirectoryPrimary, dir: action.dir },
            ];
        case DirectoryOptions.ADD_SECONDARY_DIRECTORY:
            const secondary_filter = state.filter(x => x.dir !== action.dir);
            return [
                ...secondary_filter,
                { type: kDirectorySeconday, dir: action.dir },
            ];
        case DirectoryOptions.REMOVE_DIRECTORY:
            const remove_filter = state.filter(x => x.dir !== action.dir);
            return [
                ...remove_filter,
            ];
        case DirectoryOptions.CLEAR_DIRECTORIES:
            return [];
        default:
            return state;
    }
};

export default directoryReducer;
