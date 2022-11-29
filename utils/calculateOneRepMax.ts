interface calculateOneRepMaxProps {
    weight: string;
    reps: string;
}

const calculateOneRepMax = (arr: Array<calculateOneRepMaxProps>): number => { return 1 }

export default calculateOneRepMax

// NOTE: 
// HOW TO CALCULATE 1 REP MAX
// Brzycki formula: Weight × (36 / (37 – number of reps))
// Epley formula: Weight × (1 + (0.0333 × number of reps))
// Lombardi formula: Weight × (number of reps ^ 0.1)
// O'Conner formula: Weight × (1 + (0.025 × number of reps))