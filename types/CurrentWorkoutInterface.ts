import LiftInterface from "./LiftInterface";

interface CurrentWorkoutInterface {
    workoutId: number;
    workoutTitle: string;
    isActive: boolean
    exercises: LiftInterface
    exerciseOrder: number[];
    startTime: string;
    finishTime: string;
    totalSets: number;
    totalVolume: number;
    status: "pending" | "idle" | "success" | "error"
}

export default CurrentWorkoutInterface