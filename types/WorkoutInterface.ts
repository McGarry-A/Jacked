export interface ILifts {
  set: ISet[];
  exercise_id: string;
  exercise_name: string;
  lift_id: string;
}

export interface IWorkout {
  name: string;
  id: string;
  date: string;
  lifts: ILifts[];
}

export interface ISet {
  weight: string;
  reps: string;
  setNumber: number;
}
