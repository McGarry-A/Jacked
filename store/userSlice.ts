import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
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
    reset: (state) => (state = initialState),
    loginWithGoogle: (state, { payload }) => {
      state.user.isLoggedIn = true;
      state.user.userId = payload.user.id;
      state.status = "fulfilled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        const { user } = payload

        state.status = "fulfilled";
        state.user.isLoggedIn = true;
        state.user.userId = user!.id
      })
      .addCase(userSignup.rejected, (state, _) => {
        state.status = "rejected";
      })
      .addCase(userSignup.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(userLogin.fulfilled, (state) => {
        const user = supabase.auth.user();

        state.user.isLoggedIn = true;
        state.user.userId = user!.id;
        state.status = "fulfilled";
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
        // state.status = "fulfilled";
        // state.user.isLoggedIn = true;
        // state.user.userId = payload.id;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userLogin.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(userSignout.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(userSignout.fulfilled, (state) => {
        state.status = "fulfilled";
        state.user = initialState.user;
      })
      .addCase(userSignout.pending, (state) => {
        state.status = "pending";
      });
  },
});

interface AuthPayload {
  email: string;
  password: string;
}

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (details: AuthPayload, { rejectWithValue }) => {
    const { email, password } = details;
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) return rejectWithValue(error.message)

    const data = { user, session };

    return data
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

    if (error) return thunkAPI.rejectWithValue(error);

    const data = { user, session };
    return data;
  }
);

export const userSignout = createAsyncThunk(
  "user/userSignout",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) return rejectWithValue(error);
  }
);

export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });

    if (!user) return rejectWithValue({});

    return user;
  }
);

export const { reset } = userSlice.actions;

export default userSlice.reducer;
