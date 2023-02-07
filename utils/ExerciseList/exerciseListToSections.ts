import ExerciseInterface from "../../types/ExerciseInterface";

interface IReturn {
  title: string;
  data: ExerciseInterface[];
}
const exerciseListToSections = (list: ExerciseInterface[]): IReturn[] => {
  const newList = list.map((el) => {
    const sectionTitle = el.exercise_name[0].toUpperCase();
    return {
      title: sectionTitle,
      data: [el],
    };
  });

  const sections = newList.reduce((acc, curr) => {
    const index = acc.findIndex((el) => el.title === curr.title);
    if (index !== -1) {
      acc[index].data.push(curr.data[0]);
    } else {
      acc.push(curr);
    }
    return acc;
  }, [] as IReturn[]);

  console.log(sections)
  return sections
};

export default exerciseListToSections;
