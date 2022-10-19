// interface CurrentWorkoutInterface {
//     workoutTitle: string;
//     isActive: boolean
//     exercises: LiftInterface
//     exerciseOrder: number[];
//     startTime: string;
//     finishTime: string;
//     totalSets: number;
//     totalVolume: number;
//     status: "pending" | "idle" | "success" | "error"
// }

interface CurrentWorkoutInterface {
  workoutTitle: string;
  isActive: boolean;
  exercises: LiftInterface[];
  exerciseOrder: number[];
  startTime: string;
  finishTime: string;
  totalSets: number;
  totalVolume: number;
  status: "pending" | "idle" | "success" | "error";
}

// liftId should be generated on supabase
export interface LiftInterface {
  exerciseId: number;
  exerciseName: string;
  sets: SetInterface[];
  liftNumber: number;
}

// interface LiftInterface {
//   [key: string]: {
//     exerciseId: number;
//     exerciseName: string;
//     sets: SetInterface;
//     liftId: number;
//   };
// }

// setId should be generated on supabase
// export interface SetInterface {
//   [key: string]: {
//     weight: string;
//     reps: string;
//     rpe: number;
//     setNumber: number;
//   };
// }

export interface SetInterface {
  weight: string;
  reps: string;
  rpe: number;
  setNumber: number;
}
export default CurrentWorkoutInterface;
