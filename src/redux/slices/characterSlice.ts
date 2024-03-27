import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RICK_AND_MORTY_API } from '../../constants/RICK_AND_MORTY_API';

interface CharacterState {
    data: any;
    details: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CharacterState = {
    data: null,
    details: null,
    status: 'idle',
    error: null,
};

export const loadCharacters = createAsyncThunk(
    'characters/load',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`${RICK_AND_MORTY_API.characters}/?page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch characters');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
        }
    }

);

export const loadCharacterDetails = createAsyncThunk(
    'characters/loadDetails',
    async (characterId: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`${RICK_AND_MORTY_API.characters}/${characterId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch character details');
            }
            const details = await response.json();
            return details;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
        }
    }
);

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(loadCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(loadCharacterDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCharacterDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.details = action.payload;
            })
            .addCase(loadCharacterDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default characterSlice.reducer;


