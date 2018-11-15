import { ICopyList, ICopyListUpdate } from '../definitions/copylist';

export const addCopyList = (obj: ICopyList) => ({
  obj,
  type: CopyListActions.ADD_COPYLIST,
});

export const batchUpdateCopyList = (obj: ICopyList[]) => ({
  obj,
  type: CopyListActions.BATCH_UPDATE_COPYLIST,
});

export const updateCopyList = (obj: ICopyListUpdate) => ({
  obj,
  type: CopyListActions.UPDATE_COPYLIST,
});

export const updateProgress = (obj: ICopyListUpdate) => ({
  obj,
  type: CopyListActions.UPDATE_PROGRESS,
});

export const clearCopyList = () => ({
  type: CopyListActions.CLEAR_COPYLIST,
});

export const CopyListActions = {
  ADD_COPYLIST: 'ADD_COPYLIST',
  BATCH_UPDATE_COPYLIST: 'BATCH_UPDATE_COPYLIST',
  CLEAR_COPYLIST: 'CLEAR_COPYLIST',
  UPDATE_COPYLIST: 'UPDATE_COPYLIST',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
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
