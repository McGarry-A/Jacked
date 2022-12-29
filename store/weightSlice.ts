import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface IWeight {
    weight: string;
    date: string;
}

interface InitialStateInterface {
    weight: IWeight[];
    status: "fulfilled" | "pending" | "rejected" | "idle";
}

const initialState: InitialStateInterface = {
    weight: [],
    status: "idle",
};

const weightSlice = createSlice({
    name: "weightSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWeight.fulfilled, (state, payload: PayloadAction<IWeight>) => {
                state.weight.push(payload.payload)
            })
    },
});

interface getHistoryProps {
    userId: string;
}

export const getWeight = createAsyncThunk(
    "workoutHistorySlice/getHistory",
    async (payload: getHistoryProps, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("weight")
            .select()
            .order("id", { ascending: false })
            .eq("user_id", payload.userId)

        if (error) {
            console.error(error.message);
            return rejectWithValue(error.message)
        }
        return data;
    }
);

interface IAddWeight {
    weight: string;
    userId: string;
}

export const addWeight = createAsyncThunk(
    "weightSlice/addWeight",
    async (payload: IAddWeight, { rejectWithValue }) => {
        const { data, error } = await supabase.from("weight").insert({
            weight: payload.weight,
            user_id: payload.userId
        })

        if (error) {
            console.error(error)
            return rejectWithValue(error.message)
        }

        const date = data[0].created_at
        const formattedData = {
            weight: payload.weight,
            date: date
        }

        return formattedData
    }
)

export default weightSlice.reducer;
