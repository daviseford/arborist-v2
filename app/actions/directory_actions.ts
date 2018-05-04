
export const addPrimaryDirectory = (index: number) => ({
  index,
  type: DirectoryActions.ADD_PRIMARY_DIRECTORY,
});

export const addSecondaryDirectory = (index: number) => ({
  index,
  type: DirectoryActions.ADD_SECONDARY_DIRECTORY,
});

export const removeDirectory = (index: number) => ({
  index,
  type: DirectoryActions.REMOVE_DIRECTORY,
});

export const clearDirectories = () => ({
  type: DirectoryActions.CLEAR_DIRECTORIES,
});

export const DirectoryActions = {
  ADD_PRIMARY_DIRECTORY: 'ADD_PRIMARY_DIRECTORY',
  ADD_SECONDARY_DIRECTORY: 'ADD_SECONDARY_DIRECTORY',
  CLEAR_DIRECTORIES: 'CLEAR_DIRECTORIES',
  REMOVE_DIRECTORY: 'REMOVE_DIRECTORY',
};
