import mapStringMatch from './mapStringMatch';

describe('Map string match util', () => {
  it('should convert match string correctly', () => {
    const newStr = mapStringMatch('123, 123 World', '123', (e, m) =>
      m ? 'Hello' : e
    );
    expect(newStr).toEqual(['', 'Hello', ', ', 'Hello', ' World']);
  });

  it('should be defined', () => {
    expect(mapStringMatch).toBeDefined();
  });
});
