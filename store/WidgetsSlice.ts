import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

export interface IOneRepMaxLine {
  type: "ONE_REP_MAX_EST";
  title: string;
  subtitle: string;
  exerciseId: number;
  user_id: string;
}

export interface IWidgetInterface {
  type: "SESSION_FREQUENCY";
  title: string;
  subtitle: string;
  user_id: string;
}

export type TWidget = IWidgetInterface | IOneRepMaxLine

interface IInitialState {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  widgets: {
    [key: string]: TWidget
  };
}

const initialState: IInitialState = {
  status: "idle",
  widgets: {},
};

const widgetSlice = createSlice({
  name: "widget_slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWidget.fulfilled, (state, { payload }) => {
      if (!payload) return

      const { widgetId } = payload

      const { type, title, subtitle } = payload as TWidget

      let newWidget = {
        title,
        subtitle,
        type,
      }

      state.widgets[widgetId] = newWidget as TWidget

      if (type === "ONE_REP_MAX_EST") {
        const { exerciseId } = payload as IOneRepMaxLine
        const newWidget = state.widgets[widgetId] as IOneRepMaxLine
        newWidget.exerciseId = exerciseId
      }
    })
      .addCase(createWidget.rejected, (state, payload) => {
        state.status = "rejected"
      })
      .addCase(getWidgets.fulfilled, (state, { payload }) => {
        payload.map(el => {
          if ("exerciseId" in el) {
            const { exerciseId, title, subtitle, type, user_id } = el as IOneRepMaxLine
            return state.widgets[el.id] = {
              exerciseId,
              subtitle,
              title,
              type,
              user_id
            }
          }

          const { title, subtitle, type, user_id } = el as IWidgetInterface
          return state.widgets[el.id] = {
            subtitle,
            title,
            type,
            user_id
          }
        })

        state.status = "fulfilled"
      })
      .addCase(getWidgets.rejected, (state, _) => {
        state.status = "rejected"
      })
      .addCase(deleteWidget.fulfilled, (state, { payload }) => {
        state.status = "fulfilled"
        delete state.widgets[payload]
      })
  },
});

interface IGetWidgets {
  userId: string;
}

export const getWidgets = createAsyncThunk(
  "widget/getWidgets",
  async (payload: IGetWidgets, { rejectWithValue }) => {
    console.log("GETWIDGETS!")
    const { userId } = payload

    const { data, error } = await supabase.from("widgets").select("id, type, title, subtitle, exerciseId").eq("user_id", userId)

    if (error) {
      console.error(error)
      return rejectWithValue([])
    }

    return data
  }
)

export const createWidget = createAsyncThunk(
  "widget/createWidget",
  async (payload: TWidget, { rejectWithValue }) => {
    const { subtitle, title, type, user_id } = payload

    let newWidget = {
      type,
      title,
      subtitle,
      user_id
    }

    if ("exerciseId" in payload && type === "ONE_REP_MAX_EST") {
      const { exerciseId } = payload as IOneRepMaxLine
      newWidget = { ...newWidget, exerciseId } as IOneRepMaxLine
    }

    const { data, error } = await supabase.from("widgets").insert(newWidget)

    if (error) {
      console.error(error)
      return rejectWithValue({})
    }

    return {
      ...payload, widgetId: data[0].id
    }
  }
)

interface IDeleteWidget {
  widgetId: number;
}

export const deleteWidget = createAsyncThunk(
  "widget/deleteWidget",
  async (payload: IDeleteWidget, { rejectWithValue }) => {
    const { widgetId } = payload

    const { error } = await supabase.from("widgets").delete().eq("id", widgetId)

    if (error) {
      return rejectWithValue([])
    }

    return widgetId
  }
)
// export const { createWidget } = widgetSlice.actions
export default widgetSlice.reducer;