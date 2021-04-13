import { fetchBlog, blogAdapter, blogReducer } from './blog.slice';

describe('blog reducer', () => {
  it('should handle initial state', () => {
    const expected = blogAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(blogReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchBlogs', () => {
    let state = blogReducer(undefined, fetchBlog.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = blogReducer(state, fetchBlog.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = blogReducer(
      state,
      fetchBlog.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
