import { kDirectoryPrimary, kDirectorySecondary } from '../utils/config';
import { DirectoryActions } from './../actions/directory_actions';
import { IDirState } from './../definitions/state';

const directoryReducer = (state: IDirState[] = [], action) => {
    switch (action.type) {
        case DirectoryActions.ADD_PRIMARY_DIRECTORY:
            // Remove previous primary directory, if any, and any duplicates
            const primary_filter = state.filter(x => x.type !== kDirectoryPrimary && x.index !== action.index);
            return [
                ...primary_filter,
                { type: kDirectoryPrimary, index: action.index },
            ];
        case DirectoryActions.ADD_SECONDARY_DIRECTORY:
            const secondary_filter = state.filter(x => x.index !== action.index);
            return [
                ...secondary_filter,
                { type: kDirectorySecondary, index: action.index },
            ];
        case DirectoryActions.UPDATE_DIRECTORY:
            const dir_index = state.findIndex(x => x.index === action.directory.index);
            const new_state = [...state];
            new_state[dir_index] = action.directory;
            return new_state;
        case DirectoryActions.REMOVE_DIRECTORY:
            const remove_filter = state.filter(x => x.index !== action.index);
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
