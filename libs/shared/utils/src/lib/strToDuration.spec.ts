import strToDuration from './strToDuration';

describe('String to Duration utility', () => {
  it('should convert string to duration correctly', () => {
    expect(strToDuration('20s')).toEqual(20 * 1000);
    expect(strToDuration('20 s')).toEqual(20 * 1000);
    expect(strToDuration('20min')).toEqual(20 * 60 * 1000);
    expect(strToDuration('20 min')).toEqual(20 * 60 * 1000);
    expect(strToDuration('20hr')).toEqual(20 * 60 * 60 * 1000);
    expect(strToDuration('20 hr')).toEqual(20 * 60 * 60 * 1000);
  });

  it('should be defined', () => {
    expect(strToDuration).toBeDefined();
  });
});
