import { IExerciseHistory } from "../../hooks/useExerciseHistory";
import calculateOneRepMax from "./calculateOneRepMax";

export const getEstimatedOneRepMax = (history: IExerciseHistory) => {
  const oneRepMaxes = Object.values(history).map((lift) => {
    const { sets } = lift;

    if (!sets.length) return [0];
    return calculateOneRepMax(sets);
  });

  const oneRepMaxArr = oneRepMaxes.map((el) => Math.max(...el));

  return Math.max(...oneRepMaxArr);
};

export const getAcheivedOneRepMax = (history: IExerciseHistory) => {
  const sets = Object.values(history)
    .map((lift) => lift.sets)
    .flat(1);

  const bestSet = sets.reduce(
    (acc, set) => {
      if (!set) return acc;
      const weight = parseInt(set.weight);
      const reps = parseInt(set.reps);
      if (reps >= 1 && weight > acc.weight) return { weight, reps };
      return acc;
    },
    { weight: 0, reps: 0 }
  );

  return bestSet;
};

export const getBestVolume = (history: IExerciseHistory) => {
  const sets = Object.values(history)
    .map((lift) => lift.sets)
    .flat(1);

  const volume = sets.reduce((acc, set) => {
    if (!set) return acc;
    const weight = parseInt(set.weight);
    const reps = parseInt(set.reps);
    const volume = weight * reps;
    return acc + volume;
  }, 0);

  return volume;
};

export const getBestPerformance = (history: IExerciseHistory) => {

  interface set {
    weight: number;
    reps: number;
    setNumber: number;
  }

  let bestPerformance: set[] = []
  const repsArr = Array.from({ length: 10 }, (_, i) => i + 1);

  const sets = Object.values(history)
    .map((lift) => lift.sets)
    .flat(1);

  repsArr.forEach((reps, i) => {
    const newSets = sets.filter((set) => set.reps === reps.toString());
    const reducedSets = newSets.reduce(
      (acc, set) => {
        if (!set) return acc;

        const weight = parseInt(set.weight);
        const reps = parseInt(set.reps);

        if (weight > acc.weight)
          return { weight, reps, setNumber: set.setNumber };
        return acc;
      },
      { weight: 0, reps: 0, setNumber: 0 }
    );

    bestPerformance.push(reducedSets)
  });

  return bestPerformance;
};
