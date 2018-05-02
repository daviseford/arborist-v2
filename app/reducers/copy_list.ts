import { CopyActions } from '../actions/copy_list';

const copy_lists = (state = [], action) => {
    switch (action.type) {
        case CopyActions.ADD_COPYLIST:      // Add a single ICopyList object to the state
            return [
                ...state,
                action.obj,
            ];
        case CopyActions.UPDATE_COPYLIST:   // Replaces the contents of copy_list
            return action.obj;
        case CopyActions.CLEAR_COPYLIST:    // Replaces copy_list with an empty array
            return [];
        default:
            return state;
    }
};

export default copy_lists;
