
export const addPrimaryDirectory = (dir: string) => ({
  dir,
  type: DirectoryOptions.ADD_PRIMARY_DIRECTORY,
});

export const addSecondaryDirectory = (dir: string) => ({
  dir,
  type: DirectoryOptions.ADD_SECONDARY_DIRECTORY,
});

export const removeDirectory = (dir: string) => ({
  dir,
  type: DirectoryOptions.REMOVE_DIRECTORY,
});

export const clearDirectories = () => ({
  type: DirectoryOptions.CLEAR_DIRECTORIES,
});

export const DirectoryOptions = {
  ADD_PRIMARY_DIRECTORY: 'ADD_PRIMARY_DIRECTORY',
  ADD_SECONDARY_DIRECTORY: 'ADD_SECONDARY_DIRECTORY',
  CLEAR_DIRECTORIES: 'CLEAR_DIRECTORIES',
  REMOVE_DIRECTORY: 'REMOVE_DIRECTORY',
};
