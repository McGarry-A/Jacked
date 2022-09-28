import { atom } from "jotai";

/* EXERCISE LIST ATOMS */
export const exerciseListAtom = atom<any[]>([]);
export const isLoadingAtom = atom<boolean>(true);
export const errorAtom = atom<boolean>(false);

/* EXERCISE LIST FILTER ATOM */
export const exerciseListFilterAtom = atom("");
export const filteredExerciseList = atom<any[]>([]);

/* MEMORY OF WHAT EXERCISES TO ADD TO THE WORKOUT */
export const addToWorkoutIds = atom<number[]>([])