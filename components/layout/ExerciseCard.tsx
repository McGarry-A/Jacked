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
import { addLift, deleteLift } from "../../store/currentWorkoutSlice";
import useColorScheme from "../../hooks/useColorScheme";
import ExerciseDetailsModal from "../modal/ExerciseDetailsModal";
import { useEffect, useState } from "react";

interface IProps {
  exercise_name: string;
  category: string;
  targets: string;
  description: string;
  image: string;
  id: number;
  isLoading: boolean;
  showExerciseDetails: boolean;
}

const ExerciseCard = (props: IProps) => {
  const { isLoading, id } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { exercises } = useAppSelector((state) => state.currentWorkoutSlice);
  const { exerciseOrder } = useAppSelector(
    (state) => state.currentWorkoutSlice
  );

  const liftId = `lift-${id}`;

  useEffect(() => {
    if (exerciseOrder.includes(liftId)) {
      setIsActive(true);
    }
  }, [exerciseOrder]);

  const backgroundColor = isActive ? "info.50" : "white";

  const handlePressCard = () => {
    const { showExerciseDetails } = props;

    if (showExerciseDetails) return setIsOpen(true);

    handleAddToLiftData();
  };

  const handleAddToLiftData = () => {
    const { id, exercise_name } = props;

    const lift = {
      exerciseId: id,
      exerciseName: exercise_name,
      liftId,
      userId,
    };

    if (!isActive) dispatch(addLift([lift]));

    const liftIdOfRemoved = Object.values(exercises).filter(
      (el) => el.exerciseId === id
    )[0]?.liftId;

    dispatch(deleteLift({ liftId: liftIdOfRemoved }));
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
    const { exercise_name, showExerciseDetails } = props;

    if (!showExerciseDetails) {
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

  const renderExerciseDetailsModal = () => {
    if (!isOpen) return null;

    const { exercise_name } = props;

    return (
      <ExerciseDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        exerciseName={exercise_name}
        exerciseId={id}
      />
    );
  };

  return (
    <>
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
      {renderExerciseDetailsModal()}
    </>
  );
};

export default ExerciseCard;
