import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { supabase } from "../supabase/supabaseClient";

interface IWeight {
    labels: string[]
    values: number[]
}

interface InitialStateInterface {
    weight: IWeight;
    status: "fulfilled" | "pending" | "rejected" | "idle" | "refreshing";
}

const initialState: InitialStateInterface = {
    weight: {
        labels: [],
        values: []
    },
    status: "idle",
};

const weightSlice = createSlice({
    name: "weightSlice",
    initialState: initialState,
    reducers: {
        addWeight: (state, { payload }) => {
            state.weight.labels.push(payload.date)
            state.weight.values.push(payload.weight)

            state.status = "refreshing"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeight.fulfilled, (state, payload) => {
                const { payload: data } = payload

                const labels = data.map((item: any) => {
                    const dateOnly = item.created_at.split(" ")[0];
                    return moment(dateOnly).format("DD/MM");
                })

                const values = data.map(({ weight }: { weight: string }) => parseInt(weight))

                state.weight.labels = labels
                state.weight.values = values
                state.status = "fulfilled"
            })
    },
});

interface getWeightProps {
    userId: string;
}

export const getWeight = createAsyncThunk(
    "workoutHistorySlice/getHistory",
    async (payload: getWeightProps, { rejectWithValue }) => {

        const { data, error } = await supabase
            .from("weight")
            .select()
            .order("id", { ascending: false })
            .eq("user_id", payload.userId)
            .limit(7)

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
