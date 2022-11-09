import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface InitialStateInterface {
  user: {
    isLoggedIn: boolean;
    userId: string;
  };
  status: "fulfilled" | "pending" | "rejected" | "idle";
}

const initialState: InitialStateInterface = {
  user: {
    isLoggedIn: false,
    userId: "",
  },
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.user.isLoggedIn = true;
    }),
      builder.addCase(userSignup.rejected, (state, _) => {
        state.status = "rejected";
      }),
      builder.addCase(userSignup.pending, (state, _) => {
        state.status = "pending";
      }),
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        const user = supabase.auth.user()

        state.status = "pending";
        state.user.isLoggedIn = true;
        state.user.userId = user!.id;
        state.status = "fulfilled"
      }),
      builder.addCase(userLogin.pending, (state) => {
        state.status = "pending";
      }),
      builder.addCase(userLogin.rejected, (state, payload) => {
        state.status = "rejected";
      });
  },
});

interface AuthPayload {
  email: string;
  password: string;
}

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (details: AuthPayload, _) => {
    const { email, password } = details;
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    const data = { user, session };

    if (error) return console.error(error)

    return data;
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (details: AuthPayload, thunkAPI) => {
    const { email, password } = details;
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) return thunkAPI.rejectWithValue(error)

    const data = { user, session };
    return data;
  }
);

export const { reset } = userSlice.actions

export default userSlice.reducer;
