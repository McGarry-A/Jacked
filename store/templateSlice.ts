import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LiftData } from "../screens/modals/AddExercises";
import { supabase } from "../supabase/supabaseClient";
import { TemplateSliceInterface } from "../types/TemplateSliceInterface";

const initialState: TemplateSliceInterface = {
  status: "idle",
  folders: {},
};

type TemplateNameType = string;
type FolderNameType = string;
type FolderIdType = string;
type TemplateIdType = string;
type LiftIdType = string;

interface RemoveLiftInterface {
  folId: FolderIdType;
  tempId: TemplateIdType;
  liftId: LiftIdType;
}

// NOTE: 
// CREATE THIS AND SQUASH ANY ISSUES THAT COME UP
// WITH USING THE NEW INTERFACE
interface ILiftDataWithSets extends LiftData {
  sets: {
    reps: string;
    weight: string;
    setNumber: string;
  }
}

interface CreateTemplateInterface {
  folId: FolderIdType;
  title: TemplateNameType;
  params: ILiftDataWithSets[];
  userId: string;
}

interface CreateFolderInterface {
  title: FolderNameType;
  userId: string;
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
      })
      .addCase(getUserTemplateData.fulfilled, (state, { payload }) => {
        const { templateData, folderData } = payload

        folderData.map(folder => {
          state.folders[folder.id] = {
            name: folder.title,
            id: folder.id,
            templates: {}
          }
        })

        templateData.map(template => {
          state.folders[template.folder_id].templates[template.id] = {
            exerciseOrder: [],
            templateName: template.template_name,
            tempId: template.id,
            exercises: JSON.parse(template.exercises)
          }
        })

        state.status = "fulfilled"
      }).addCase(getUserTemplateData.rejected, (state, _) => {
        state.status = "rejected"
      }).addCase(deleteTemplate.fulfilled, (state, { payload }) => {
        const { folderId, templateId } = payload;

        delete state.folders[folderId].templates[templateId];
      }).addCase(deleteTemplate.rejected, (state, _) => {
        state.status = "rejected"
      })
  },
});

export const createFolder = createAsyncThunk(
  "template/createFolder",
  async (payload: CreateFolderInterface, { rejectWithValue }) => {
    const { title, userId: user_id } = payload;
    const newFolder: any = {
      title,
      user_id
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
      user_id: payload.userId
    };

    const { data, error } = await supabase
      .from("templates")
      .insert(newTemplate)

    if (error) {
      console.error(error);
      return rejectWithValue([]);
    }

    console.log("data", data);

    newTemplate.tempId = data[0].id;

    return newTemplate;
  }
);

export const getUserTemplateData = createAsyncThunk(
  "template/getUserData",
  async (payload: string, { rejectWithValue }) => {

    const { data: folder_data, error: folder_erorr } = await supabase.from("folders").select().eq('user_id', payload)
    const { data: template_data, error: template_error } = await supabase.from("templates").select().eq('user_id', payload)

    if (template_error || folder_erorr) {
      console.error(template_error || folder_erorr)
      return rejectWithValue(template_error || folder_erorr)
    }

    return { templateData: template_data, folderData: folder_data }

  }
)

export const deleteTemplate = createAsyncThunk(
  "template/deleteWidget",
  async (payload: string, { rejectWithValue }) => {

    const { data, error } = await supabase
      .from("templates")
      .delete()
      .eq("id", payload)

    if (error) {
      return rejectWithValue(error)
    }

    console.log("data", data)

    return { folderId: data[0].folder_id, templateId: data[0].id }
  }
)

export const { deleteFolder, emptyFolder } =
  templateSlice.actions;
export default templateSlice.reducer;
