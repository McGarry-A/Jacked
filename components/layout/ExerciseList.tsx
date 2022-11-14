import { FlatList, ScrollView } from "native-base";
import ExerciseInterface from "../../types/ExerciseInterface";
import ExerciseCard from "./ExerciseCard";

interface Props {
  data: ExerciseInterface[];
  cardProps?: Object;
}

export const ExerciseList: React.FC<Props> = ({ data, cardProps }) => {
  return (
    <ScrollView my={2} flexGrow={1}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ExerciseCard {...item} {...cardProps} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};
