import LiftInterface from "./LiftInterface";

interface CurrentWorkoutInterface {
    exercises: LiftInterface
    exerciseOrder: number[];
    startTime: string;
    finishTime: string;
}

export default CurrentWorkoutInterface