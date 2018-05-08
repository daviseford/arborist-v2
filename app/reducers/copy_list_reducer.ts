import { CopyListActions } from '../actions/copy_list_actions';
import { ICopyList, ICopyListUpdate } from './../definitions/copylist';

const updateCopyList = (state: ICopyList[], action: { obj: ICopyListUpdate }) => {
    const newState = [...state];
    const i = newState.findIndex(x => x.filepath === action.obj.filepath);
    if (i < 0) { throw new Error(`Couldn't find ${JSON.stringify(action.obj)}`); }
    newState[i] = { ...newState[i], ...action.obj };
    return newState;
};

const copy_lists = (state = [], action) => {
    switch (action.type) {
        case CopyListActions.ADD_COPYLIST:      // Add a single ICopyList object to the state
            return [
                ...state,
                action.obj,
            ];
        case CopyListActions.BATCH_UPDATE_COPYLIST:   // Replaces the contents of copy_list
            return action.obj;
        case CopyListActions.UPDATE_COPYLIST:   // Updates a single copyObj
            const updatedState = updateCopyList(state, action);
            return updatedState;

        case CopyListActions.CLEAR_COPYLIST:    // Replaces copy_list with an empty array
            return [];
        default:
            return state;
    }
};

export default copy_lists;
