import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPost } from '../../models/IPost';

export const fetchPosts = createAsyncThunk(
	'post/fetchAll',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Не удалось загрузить посты')
		}
	}
);

export const fetchOnePost = createAsyncThunk(
	'post/fetchOne',
	async (id: number, thunkAPI) => {
		try {
			const response = await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Не удалось загрузить пост')
		}
	}
);
