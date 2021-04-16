import { ErrorRes } from '@cookingblog/api-interfaces';
import { AnyAction, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix);
const isPending = (action: AnyAction) => action.type.endsWith('/pending');
const isFulfilled = (action: AnyAction) => action.type.endsWith('/fulfilled');
const isRejected = (action: AnyAction) => action.type.endsWith('/rejected');

export const isPendingAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  // Note: this cast to AnyAction could also be `any` or whatever fits your case best
  return hasPrefix(action, prefix) && isPending(action);
};

export const isRejectedAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  // Note: this cast to AnyAction could also be `any` or whatever fits your case best - like if you had standardized errors and used `rejectWithValue`
  return hasPrefix(action, prefix) && isRejected(action);
};

export const isFulfilledAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};

// export const withErrorHandler = async <TData>(
//   data: TData,
//   thunkAPI: GetThunkAPI
// ) => {};

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
    return thunkAPI.rejectWithValue(
      (err.response.data as ErrorRes).data.errors
    );
  }
};
