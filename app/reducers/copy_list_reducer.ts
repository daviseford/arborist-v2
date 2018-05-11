import { CopyListActions } from '../actions/copy_list_actions';
import { ICopyList, ICopyListUpdate } from './../definitions/copylist';

const addCopyList = (state: ICopyList[], action: { obj: ICopyList }): ICopyList[] => {
    const i = state.findIndex(x => x.filepath === action.obj.filepath);
    if (i < 0) {   // this is the desired path
        return [...state, action.obj];
    } else {    // this saves us from adding duplicates
        return updateCopyList(state, action);
    }
};

const updateCopyList = (state: ICopyList[], action: { obj: ICopyListUpdate }): ICopyList[] => {
    const i = action.obj.index;
    const newState = [...state];
    newState[i] = { ...newState[i], ...action.obj };
    return newState;
};

const copy_lists = (state = [], action) => {
    switch (action.type) {
        case CopyListActions.ADD_COPYLIST:          // Add a single ICopyList object to the state
            return addCopyList(state, action);
        case CopyListActions.BATCH_UPDATE_COPYLIST: // Replaces the contents of copy_list
            return action.obj;
        case CopyListActions.UPDATE_COPYLIST:       // Updates a single copyObj
            return updateCopyList(state, action);
        case CopyListActions.CLEAR_COPYLIST:        // Replaces copy_list with an empty array
            return [];
        default:
            return state;
    }
};

export default copy_lists;
