import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../models/IPost'
import { fetchOnePost, fetchPosts } from './ActionCreators';

interface PostState {
	post: IPost;
	posts: IPost[];
	isPostsLoading: boolean;
	isOnePostLoading: boolean;
};

const initialState: PostState = {
	post: {} as IPost,
	posts: [],
	isPostsLoading: false,
	isOnePostLoading: false,
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.fulfilled.type, (state, action: PayloadAction<IPost[]>) => {
				state.isPostsLoading = false;
				state.posts = action.payload;
			})
			.addCase(fetchOnePost.fulfilled.type, (state, action: PayloadAction<IPost>) => {
				state.isOnePostLoading = false;
				state.post = action.payload;
			})
			.addCase(fetchPosts.pending.type, (state) => {
				state.isPostsLoading = true;
			})
			.addCase(fetchOnePost.pending.type, (state) => {
				state.isOnePostLoading = true;
			})
	}
});

export default postSlice.reducer;
