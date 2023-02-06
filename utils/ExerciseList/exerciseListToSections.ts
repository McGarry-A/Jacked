import ExerciseInterface from "../../types/ExerciseInterface";

interface IReturn {
    title: string;
    data: ExerciseInterface[]
}
const exerciseListToSections = (list: ExerciseInterface[]): IReturn[] => {
    let newList: IReturn[] = []
    const sortedList = list.sort(
        (a, b) => a.exercise_name.toLocaleLowerCase().
            localeCompare(b.exercise_name.toLowerCase()))

    sortedList.forEach((el) => {
        const firstLetter = el.exercise_name[0]
        newList.push({ data: [el], title: firstLetter })
    })

    const sad = newList.reduce((acc, curr) => {

    }, [{ title: "", data: [] }])

    return []
}

export default exerciseListToSections;