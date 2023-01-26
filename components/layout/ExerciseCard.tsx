import {
  Avatar,
  Box,
  Checkbox,
  Pressable,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../../store";
import getExerciseInitials from "../../utils/Workouts/getExerciseInitials";
import { LiftData } from "../../screens/modals/AddExercises";
import useId from "../../hooks/useId";
import useToggleState from "../../hooks/useToggleState";
import { deleteLift } from "../../store/currentWorkoutSlice";
import useColorScheme from "../../hooks/useColorScheme";

interface IProps {
  exercise_name: string;
  category: string;
  targets: string;
  description: string;
  image: string;
  id: number;
  isLoading: boolean;
  setLiftData?: React.Dispatch<React.SetStateAction<LiftData[]>>;
  liftData?: LiftData[];
}

const ExerciseCard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, setLiftData, id } = props;

  const exercises = useAppSelector(
    (state) => state.currentWorkoutSlice.exercises
  );

  const exerciseIdsInWorkout = Object.values(exercises).map(
    (exercise) => exercise.exerciseId
  );

  const isInWorkout = exerciseIdsInWorkout.includes(id);

  const { state: isActive, setToggleState: setIsActive } =
    useToggleState(isInWorkout);

  const backgroundColor = isActive ? "info.50" : "white";

  const handlePressCard = () => {
    const { liftData } = props;
    if (!liftData || !setLiftData) return;
    handleAddToLiftData();
  };

  const handleAddToLiftData = () => {
    const { liftData, id, exercise_name } = props;

    if (!isActive) {
      console.log("adding to lift data");
      const liftId = useId("lift");
      const lift = {
        exerciseId: id,
        exerciseName: exercise_name,
        liftId,
      };

      setLiftData!((liftData) => [...liftData, lift]);
      setIsActive(true);

      return;
    }

    const newState = [...(liftData as LiftData[])];
    const newData = newState.filter((el) => el.exerciseId !== id);
    const liftIdOfRemoved = Object.values(exercises).filter(
      (el) => el.exerciseId === id
    )[0]?.liftId;

    dispatch(deleteLift({ liftId: liftIdOfRemoved }));
    setLiftData!(newData);

    setIsActive(false);
  };

  const renderAvatar = () => {
    const { exercise_name } = props;
    const { h1ColorMode } = useColorScheme();

    return (
      <Avatar marginRight={2} backgroundColor={"transparent"}>
        <Text
          fontSize={"lg"}
          letterSpacing={"xl"}
          fontWeight={"bold"}
          color={h1ColorMode}
        >
          {getExerciseInitials(exercise_name)}
        </Text>
      </Avatar>
    );
  };

  const renderCheckbox = () => {
    const { setLiftData, exercise_name } = props;

    if (setLiftData) {
      return (
        <Box>
          <Checkbox
            accessibilityLabel={`${exercise_name}`}
            value="isActive"
            colorScheme={"info"}
            isChecked={isActive}
            aria-label="Add to workout"
            borderWidth={"0"}
            outlineColor="white"
            _checked={{ backgroundColor: "info.200" }}
          />
        </Box>
      );
    }

    return null;
  };

  const renderBody = () => {
    const { exercise_name, targets } = props;
    const { h2ColorMode } = useColorScheme();

    return (
      <VStack flex={1}>
        <Text color={h2ColorMode} fontWeight={"semibold"}>
          {exercise_name}
        </Text>
        <Text color={"coolGray.400"} fontSize={"sm"}>
          {targets}
        </Text>
      </VStack>
    );
  };

  return (
    <Skeleton
      my={2}
      h={12}
      startColor={"gray.200"}
      endColor={"coolGray.200"}
      isLoaded={isLoading}
    >
      <Box
        padding={3}
        backgroundColor={backgroundColor}
        _dark={{
          backgroundColor: "coolGray.700",
          borderColor: "coolGray.700",
        }}
      >
        <Pressable
          flexDirection={"row"}
          alignItems="center"
          onPress={handlePressCard}
        >
          {renderAvatar()}
          {renderBody()}
          {renderCheckbox()}
        </Pressable>
      </Box>
    </Skeleton>
  );
};

export default ExerciseCard;
