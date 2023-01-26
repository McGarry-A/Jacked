const getExerciseInitials = (itemName: string) => {
  return itemName.split(" ").map((el) => {
    return `${el[0]}`;
  });
};

export default getExerciseInitials