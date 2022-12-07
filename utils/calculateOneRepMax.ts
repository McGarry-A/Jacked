interface calculateOneRepMaxProps {
    weight: string;
    reps: string;
}

const calculateOneRepMax = (arr: Array<calculateOneRepMaxProps>): number[] => { 
    return arr.map((set) => {
        if (!set) return 0
        const weight = parseInt(set.weight)
        const reps = parseInt(set.reps)
        const oneRepMax = weight * (36 / (37 - reps))
        return Math.round(oneRepMax)
    })
 }

export default calculateOneRepMax

// NOTE: 
// HOW TO CALCULATE 1 REP MAX
// Brzycki formula: Weight × (36 / (37 – number of reps))
// Epley formula: Weight × (1 + (0.0333 × number of reps))
// Lombardi formula: Weight × (number of reps ^ 0.1)
// O'Conner formula: Weight × (1 + (0.025 × number of reps))