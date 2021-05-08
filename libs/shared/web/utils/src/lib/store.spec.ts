import {
  isPendingAction,
  isRejectedAction,
  isFulfilledAction,
  withErrorHandler,
} from './store';

describe('isPendingAction store utils', () => {
  it('should able to check pending actions', () => {
    let isPending = isPendingAction('')({ type: 'action/pending' });
    expect(isPending).toBeTruthy();
    isPending = isPendingAction('')({ type: 'action/action' });
    expect(isPending).toBeFalsy();
  });

  it('should be defined', () => {
    expect(isPendingAction).toBeDefined();
  });
});

describe('isFulfilledAction store utils', () => {
  it('should able to check fulfilled actions', () => {
    let isFulfilled = isFulfilledAction('')({ type: 'action/fulfilled' });
    expect(isFulfilled).toBeTruthy();
    isFulfilled = isFulfilledAction('')({ type: 'action/action' });
    expect(isFulfilled).toBeFalsy();
  });

  it('should be defined', () => {
    expect(isFulfilledAction).toBeDefined();
  });
});

describe('isRejectedAction store utils', () => {
  it('should able to check rejected actions', () => {
    let isRejected = isRejectedAction('')({ type: 'action/rejected' });
    expect(isRejected).toBeTruthy();
    isRejected = isRejectedAction('')({ type: 'action/action' });
    expect(isRejected).toBeFalsy();
  });

  it('should be defined', () => {
    expect(isRejectedAction).toBeDefined();
  });
});

describe('withErrorHandler store utils', () => {
  it('should be defined', () => {
    expect(withErrorHandler).toBeDefined();
  });
});
