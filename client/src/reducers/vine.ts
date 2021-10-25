import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StoreState } from '../store';
import { getVines } from '../services/api';
import Vine from '../entities/Vine';

export interface VineState {
    vines: Vine[];
}

export const selectVines = (state: StoreState): Vine[] => state.vine.vines;

export const fetchVines = createAsyncThunk(
    'vine/fetchVines',
    async () => {
        try {
            const { data: resp } = await getVines();

            return resp.data as Vine[];
        } catch(e) {
            console.log(e);
            return new Array<Vine>();
        }
    },
);

const initialState = {
    vines: new Array<Vine>(),
} as VineState;

const vineSlice = createSlice({
    name: 'vine',
    initialState,
    reducers: {
        setVines(state, action: PayloadAction<Vine[]>) {
            state.vines = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVines.fulfilled, (state, action) => {
            state.vines = action.payload;
        });
    },
});

export const {
    setVines,
} = vineSlice.actions;

export default vineSlice.reducer;
