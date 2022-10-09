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
  reducers: {},
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
        console.log(payload);
        state.status = "fulfilled";
        state.user.isLoggedIn = true;

        const userId = supabase.auth.user()
        console.log(userId)
        state.user.userId = payload.user!.id;
      }),
      builder.addCase(userLogin.pending, (state) => {
        state.status = "pending";
      }),
      builder.addCase(userLogin.rejected, (state) => {
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
    return data;
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (details: AuthPayload, _) => {
    const { email, password } = details;
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    const data = { user, session };
    return data;
  }
);

export default userSlice.reducer;
