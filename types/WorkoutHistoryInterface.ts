export interface workoutHistoryInterface {
    [key: number]: {
        workoutId: number;
        name: string;
        date: string;
        lifts: [];
    }
}