import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const BLOG_FEATURE_KEY = 'blog';

/*
 * Update these interfaces according to your requirements.
 */
export interface BlogEntity {
  id: number;
}

export interface BlogState extends EntityState<BlogEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const blogAdapter = createEntityAdapter<BlogEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchBlog())
 * }, [dispatch]);
 * ```
 */
export const fetchBlog = createAsyncThunk(
  'blog/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getBlogs()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialBlogState: BlogState = blogAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const blogSlice = createSlice({
  name: BLOG_FEATURE_KEY,
  initialState: initialBlogState,
  reducers: {
    add: blogAdapter.addOne,
    remove: blogAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state: BlogState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchBlog.fulfilled,
        (state: BlogState, action: PayloadAction<BlogEntity[]>) => {
          blogAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchBlog.rejected, (state: BlogState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const blogReducer = blogSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(blogActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const blogActions = blogSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllBlog);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = blogAdapter.getSelectors();

export const getBlogState = (rootState: unknown): BlogState =>
  rootState[BLOG_FEATURE_KEY];

export const selectAllBlog = createSelector(getBlogState, selectAll);

export const selectBlogEntities = createSelector(getBlogState, selectEntities);
