import { CopyListActions } from '../actions/copy_list_actions';

const copy_lists = (state = [], action) => {
    switch (action.type) {
        case CopyListActions.ADD_COPYLIST:      // Add a single ICopyList object to the state
            return [
                ...state,
                action.obj,
            ];
        case CopyListActions.BATCH_UPDATE_COPYLIST:   // Replaces the contents of copy_list
            return action.obj;
        case CopyListActions.CLEAR_COPYLIST:    // Replaces copy_list with an empty array
            return [];
        default:
            return state;
    }
};

export default copy_lists;
