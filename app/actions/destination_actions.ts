import { IDirState } from '../definitions/state';

export const addDestination = (path: string) => ({
  path,
  type: DestinationActions.ADD_DESTINATION_PATH,
});

export const clearDestination = () => ({
  type: DestinationActions.CLEAR_DESTINATION_PATH,
});

export const DestinationActions = {
  ADD_DESTINATION_PATH: 'ADD_DESTINATION_PATH',
  CLEAR_DESTINATION_PATH: 'CLEAR_DESTINATION_PATH',
};
