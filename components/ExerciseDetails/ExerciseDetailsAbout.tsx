import { Text, VStack } from "native-base";
import Loader from "../Utils/Loader";

interface IExerciseDetailsAbout {
  exercise_details:
    | {
        id: number;
        description: string;
        name: string;
        category: string;
        image: string;
      }
    | undefined;
  isLoading: boolean;
}

const ExerciseDetailsAbout = (props: IExerciseDetailsAbout) => {
  const { exercise_details, isLoading } = props;

  if (!exercise_details || isLoading) return <Loader />;

  const { name, category, description } = exercise_details;

  return (
    <VStack space={2}>
      <Text fontSize={"lg"} fontWeight={500}>
        {name}
      </Text>
      <Text>{category}</Text>
      <Text>{description}</Text>
    </VStack>
  );
};

export default ExerciseDetailsAbout;
