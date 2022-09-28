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

export const currentWorkoutAtom = atom( 
    (get) => {
        const currentWorkout: any[] = []
        get(exerciseListAtom).map(el => {
            if (get(addToWorkoutIds).includes(el.id)) {
                currentWorkout.push(el)
            }
        })

        return currentWorkout
    }
)