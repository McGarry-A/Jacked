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

  const renderCategory = () => {
    return (
      <VStack>
        <Text fontWeight={600} fontSize={"md"}>Category</Text>
        <Text>{category}</Text>
      </VStack>
    );
  };

  const renderDescription = () => {
    return (
      <VStack>
        <Text fontWeight={600} fontSize={"md"}>Description</Text>
        <Text>{description}</Text>
      </VStack>
    )
  };

  const renderName = () => {
    <Text fontSize={"lg"} fontWeight={500}>
      {name}
    </Text>;
  };

  return (
    <VStack space={2}>
      {renderName()}
      {renderCategory()}
      {renderDescription()}
    </VStack>
  );
};

export default ExerciseDetailsAbout;
