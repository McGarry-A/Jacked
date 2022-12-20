import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { folders } from "../data";
import { LiftData } from "../screens/modals/AddExercises";
import { supabase } from "../supabase/supabaseClient";
import { TemplateSliceInterface } from "../types/TemplateSliceInterface";

const initialState: TemplateSliceInterface = {
  status: "idle",
  folders: folders,
};

type TemplateNameType = string;
type FolderNameType = string;
type FolderIdType = string;
type TemplateIdType = string;
type LiftIdType = string;

interface deleteTemplateInterface {
  tempId: TemplateIdType;
  folId: FolderIdType;
}

interface RemoveLiftInterface {
  folId: FolderIdType;
  tempId: TemplateIdType;
  liftId: LiftIdType;
}

interface CreateTemplateInterface {
  folId: FolderIdType;
  title: TemplateNameType;
  params: LiftData[];
}

interface CreateFolderInterface {
  newFolId: FolderIdType;
  title: FolderNameType;
}

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {
    removeLiftFromTemplate: (
      state,
      { payload }: PayloadAction<RemoveLiftInterface>
    ) => {
      const { folId, tempId, liftId } = payload;

      delete state.folders[folId].templates[tempId].exercises[liftId];
      state.folders[folId].templates[tempId].exerciseOrder.filter(
        (el) => el === liftId
      );
    },
    deleteFolder: (
      state,
      { payload: folderId }: PayloadAction<FolderIdType>
    ) => {
      delete state.folders[folderId];
    },
    emptyFolder: (state, { payload }) => {
      const { folderId } = payload;
      state.folders[folderId].templates = {};
    },
    deleteTemplate: (
      state,
      { payload }: PayloadAction<deleteTemplateInterface>
    ) => {
      const { folId, tempId } = payload;
      delete state.folders[folId].templates[tempId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        const { id, title } = payload;

        const newFolder = {
          templates: {},
          id: id,
          name: title,
        };

        state.folders[id] = newFolder;
      })
      .addCase(createFolder.rejected, (state, _) => {
        state.status = "rejected";
      })
      .addCase(createTemplate.fulfilled, (state, { payload }) => {
        const { folder_id, template_name, tempId } = payload;

        const newTemplate = {
          exercises: {},
          exerciseOrder: [],
          templateName: template_name,
          tempId: tempId,
        };

        state.folders[folder_id].templates[tempId] = newTemplate;

        const { exercises } = payload;

        JSON.parse(exercises).map(
          ({ exerciseId, exerciseName, liftId }: any) => {
            state.folders[folder_id].templates[tempId].exercises[liftId] = {
              exerciseId,
              exerciseName,
              sets: {},
            };

            state.folders[folder_id].templates[tempId].exerciseOrder.push(
              liftId
            );
          }
        );
      })
      .addCase(createTemplate.rejected, (state, _) => {
        state.status = "rejected";
      });
  },
});

export const createFolder = createAsyncThunk(
  "template/createFolder",
  async (payload: CreateFolderInterface, { rejectWithValue }) => {
    const { title } = payload;
    const newFolder: any = {
      title,
    };
    const { data, error } = await supabase.from("folders").insert(newFolder);

    if (error) {
      console.log("ERROR", error);
      return rejectWithValue([]);
    }

    newFolder.id = data[0].id;

    return newFolder;
  }
);

export const createTemplate = createAsyncThunk(
  "template/createTemplate",
  async (payload: CreateTemplateInterface, { rejectWithValue }) => {
    const newTemplate: any = {
      exercises: JSON.stringify(payload.params),
      folder_id: payload.folId,
      template_name: payload.title,
    };

    const { data, error } = await supabase
      .from("templates")
      .insert(newTemplate);

    if (error) {
      console.error(error);
      return rejectWithValue([]);
    }

    console.log("data", data);

    newTemplate.tempId = data[0].id;

    return newTemplate;
  }
);

export const { deleteFolder, emptyFolder, deleteTemplate } =
  templateSlice.actions;
export default templateSlice.reducer;
