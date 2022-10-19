interface CurrentWorkoutInterface {
  workoutTitle: string;
  isActive: boolean;
  exercises: LiftInterface;
  exerciseOrder: string[];
  startTime: string;
  finishTime: string;
  totalSets: number;
  totalVolume: number;
  status: "pending" | "idle" | "success" | "error";
}

// liftId should be generated on supabase
export interface LiftInterface {
  [key: string]: {
    exerciseId: number;
    exerciseName: string;
    sets: SetInterface;
    liftNumber: number;
    liftId: string;
  };
}

export interface SetInterface {
  [key: string]: {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
    setId: string;
  };
}
export default CurrentWorkoutInterface;
