interface LiftInterface {
  [key: number]: {
    exerciseId: number;
    exerciseName: string;
    sets: SetInterface[];
  };
}

export interface SetInterface {
  weight: string;
  reps: string;
  rpe: number;
}

export default LiftInterface;
