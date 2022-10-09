import LiftInterface from "./LiftInterface";

interface CurrentWorkoutInterface {
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