interface calculateOneRepMaxProps {
    weight: string;
    reps: string;
}[]

const calculateOneRepMax = (): number => { return 1 }

export default calculateOneRepMax

// NOTE: 
// HOW TO CALCULATE 1 REP MAX
// Brzycki formula: Weight × (36 / (37 – number of reps))
// Epley formula: Weight × (1 + (0.0333 × number of reps))
// Lombardi formula: Weight × (number of reps ^ 0.1)
// O'Conner formula: Weight × (1 + (0.025 × number of reps))


// NOTE: 
// SHAPE OF OBJECT
// {
// exercise_id: 2
// lift_id: 142
// set: Array(3)
// 0:
// reps: "10"
// weight: "90"
// __proto__: Object
// 1:
// reps: "10"
// weight: "100"
// __proto__: Object
// 2:
// reps: "10"
// weight: "110"
// __proto__: Object
// length: 3
// __proto__: Array(0)
// user_id: "5936f6bc-7db7-46d9-9af5-bc78ec84095e"
// workouts:
// id: 114
// }