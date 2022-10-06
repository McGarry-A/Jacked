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
}

export default CurrentWorkoutInterface