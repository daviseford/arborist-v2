import { ICopyList } from '../definitions/copylist';

export const addCopyList = (obj: ICopyList) => ({
  obj,
  type: CopyActions.ADD_COPYLIST,
});

export const updateCopyList = (obj: ICopyList[]) => ({
  obj,
  type: CopyActions.UPDATE_COPYLIST,
});

export const clearCopyList = () => ({
  type: CopyActions.CLEAR_COPYLIST,
});

export const CopyActions = {
  ADD_COPYLIST: 'ADD_COPYLIST',
  CLEAR_COPYLIST: 'CLEAR_COPYLIST',
  UPDATE_COPYLIST: 'UPDATE_COPYLIST',
};

// export const setVisibilityFilter = filter => ({
//   filter,
//   type: 'SET_VISIBILITY_FILTER',
// });

// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id,
// });

// export const VisibilityFilters = {
//   SHOW_ACTIVE: 'SHOW_ACTIVE',
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
// };
