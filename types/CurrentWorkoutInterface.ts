import LiftInterface from "./LiftInterface";

interface CurrentWorkoutInterface {
    exercises: LiftInterface
    exerciseOrder: number[];
    startTime: string;
    finishTime: string;
    totalSets: number;
    totalVolume: number;
}

export default CurrentWorkoutInterface