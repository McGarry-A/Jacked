export interface workoutHistoryInterface {
  id: number;
  workout_name: string;
  date: string;
  lifts: {
    [key: number]: {
      exercise_name: string;
    };
  };
}

export type workoutHistoryType = workoutHistoryInterface[];
