import { SetInterface } from "./CurrentWorkoutInterface";

export interface TemplateSliceInterface {
    status: "fulfilled" | "pending" | "rejected" | "idle";
    folders: FolderInterface
}

export interface FolderInterface {
    [key: string]: {
        name: string;
        id: string;
        templates: TemplateInterface
    }
}

export interface TemplateInterface {
    [key: string]: {
        exerciseOrder: string[];
        templateName: string;
        tempId: string;
        exercises: TemplateExerciseInterface
    }
}

export interface TemplateExerciseInterface {
    [key: string]: {
        exerciseId: number;
        exerciseName: string;
        sets: SetInterface
    }
}