import { ErrorRes } from '@cookingblog/api/interfaces';
import { AnyAction, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix);
const isPending = (action: AnyAction) => action.type.endsWith('/pending');
const isFulfilled = (action: AnyAction) => action.type.endsWith('/fulfilled');
const isRejected = (action: AnyAction) => action.type.endsWith('/rejected');

export const isPendingAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isPending(action);
};

export const isRejectedAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isRejected(action);
};

export const isFulfilledAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};

type ThunkApiConfig = {
  rejectValue: ErrorRes['data']['errors'];
};

export const withErrorHandler = <Returned, ThunkArg>(
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>
): AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig> => async (
  args,
  thunkAPI
) => {
  try {
    return await payloadCreator(args, thunkAPI);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};
