import throttle from './throttle';

describe('Throttle utility', () => {
  it('should throttle a function', (done) => {
    let callCount = 0;
    const throttleFn = throttle(() => {
      callCount++;
    }, 100);

    throttleFn();
    throttleFn();
    throttleFn();

    expect(callCount).toBe(1);

    setTimeout(() => {
      throttleFn();
      expect(callCount).toBe(2);
      done();
    }, 100);
  });

  it('should not trigger a leading call when leading set to false', (done) => {
    let callCount = 0;

    const throttleFn = throttle(
      () => {
        callCount++;
      },
      100,
      { leading: false }
    );

    throttleFn();
    throttleFn();
    expect(callCount).toBe(0);

    setTimeout(function () {
      // throttleFn();
    }, 110);

    setTimeout(function () {
      throttleFn();
      expect(callCount).toBe(1);
      done();
    }, 110);
  });

  it('should trigger a trailing call', (done) => {
    let callCount = 0;

    const throttleFn = throttle(() => {
      callCount++;
    }, 100);

    throttleFn();
    expect(callCount).toBe(1);
    throttleFn();

    setTimeout(function () {
      expect(callCount).toBe(2);
      done();
    }, 110);
  });

  it('should not trigger a trailing call when invoked once', (done) => {
    let callCount = 0;

    const throttleFn = throttle(() => {
      callCount++;
    }, 100);

    throttleFn();
    expect(callCount).toBe(1);

    setTimeout(function () {
      expect(callCount).toBe(1);
      done();
    }, 60);
  });

  it('should trigger a second throttled call as soon as possible', (done) => {
    let callCount = 0;

    const throttleFn = throttle(() => {
      callCount++;
    }, 100);

    throttleFn();

    setTimeout(function () {
      expect(callCount).toBe(1);
      throttleFn();
    }, 60);

    setTimeout(function () {
      expect(callCount).toBe(1);
    }, 90);

    setTimeout(function () {
      expect(callCount).toBe(2);
      done();
    }, 110);
  });

  it('should be defined', () => {
    expect(throttle).toBeDefined();
  });
});
