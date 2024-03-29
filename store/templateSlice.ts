import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

interface ILiftDataWithSets {
  exerciseId: number;
  exerciseName: string;
  liftId: string;
  liftNumber: number;
  sets: {
    [key: string]: {
      reps: string;
      weight: string;
      setNumber: number;
    };
  };
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
    // deleteFolder: (
    //   state,
    //   { payload: folderId }: PayloadAction<FolderIdType>
    // ) => {
    //   delete state.folders[folderId];
    // },
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
          ({ exerciseId, exerciseName, liftId, sets }: any) => {
            state.folders[folder_id].templates[tempId].exercises[liftId] = {
              exerciseId,
              exerciseName,
              sets,
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
        const { templateData, folderData } = payload;

        folderData.map((folder) => {
          state.folders[folder.id] = {
            name: folder.title,
            id: folder.id,
            templates: {},
          };
        });

        templateData.map((template) => {
          state.folders[template.folder_id].templates[template.id] = {
            exerciseOrder: [],
            templateName: template.template_name,
            tempId: template.id,
            exercises: JSON.parse(template.exercises),
          };
        });

        state.status = "fulfilled";
      })
      .addCase(getUserTemplateData.rejected, (state, _) => {
        state.status = "rejected";
      })
      .addCase(deleteTemplate.fulfilled, (state, { payload }) => {
        const { folderId, templateId } = payload;

        delete state.folders[folderId].templates[templateId];
      })
      .addCase(deleteTemplate.rejected, (state, _) => {
        state.status = "rejected";
      })
      .addCase(deleteFolder.fulfilled, (state, { payload }) => {
        const { folderId } = payload;

        delete state.folders[folderId];
      })
      .addCase(deleteFolder.rejected, (state, _) => {
        state.status = "rejected";
      });
  },
});

export const createFolder = createAsyncThunk(
  "template/createFolder",
  async (payload: CreateFolderInterface, { rejectWithValue }) => {
    const { title, userId: user_id } = payload;
    const newFolder: any = {
      title,
      user_id,
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
    const { params: exercises, folId, title, userId } = payload;

    const newTemplate: any = {
      exercises: JSON.stringify(exercises),
      folder_id: folId,
      template_name: title,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from("templates")
      .insert(newTemplate);

    if (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }

    newTemplate.tempId = data[0].id;

    return newTemplate;
  }
);

export const getUserTemplateData = createAsyncThunk(
  "template/getUserData",
  async (payload: string, { rejectWithValue }) => {
    const { data: folder_data, error: folder_erorr } = await supabase
      .from("folders")
      .select()
      .eq("user_id", payload);
    const { data: template_data, error: template_error } = await supabase
      .from("templates")
      .select()
      .eq("user_id", payload);

    if (template_error || folder_erorr) {
      console.error(template_error || folder_erorr);
      return rejectWithValue(template_error || folder_erorr);
    }

    return { templateData: template_data, folderData: folder_data };
  }
);

export const deleteTemplate = createAsyncThunk(
  "template/deleteWidget",
  async (payload: string, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("templates")
      .delete()
      .eq("id", payload);

    if (error) {
      return rejectWithValue(error);
    }

    return { folderId: data[0].folder_id, templateId: data[0].id };
  }
);

interface IDeleteFolder {
  folderId: string;
  templateIds?: string[];
}

export const deleteFolder = createAsyncThunk(
  "template/deleteFolder",
  async (payload: IDeleteFolder, { rejectWithValue }) => {
    const { folderId, templateIds } = payload;

    if (templateIds) {
      const templateIdsAsNumbers = templateIds.map((id) => parseInt(id));
      const { error } = await supabase
        .from("templates")
        .delete()
        .in("id", templateIdsAsNumbers);

      if (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }

    const { data, error } = await supabase
      .from("folders")
      .delete()
      .eq("id", folderId);

    if (error) {
      console.log(error);
      return rejectWithValue(error);
    }

    return { folderId: data[0].id };
  }
);

export const { emptyFolder } = templateSlice.actions;
export default templateSlice.reducer;
