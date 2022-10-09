// liftId should be generated on supabase
interface LiftInterface {
  [key: string]: {
    exerciseId: number;
    exerciseName: string;
    sets: SetInterface;
    liftId: number;
  };
}

// setId should be generated on supabase 
export interface SetInterface {
  [key: string]: {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
  };
}

export default LiftInterface;
