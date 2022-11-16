import { Box, Text, VStack, Heading, Pressable } from "native-base";
import React from "react";

interface TemplateCardProps {
  title: string;
  lifts: string[];
  author: string;
  navigation: any;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  author,
  lifts,
  navigation,
}) => {
  return (
    <Pressable
      borderWidth={1}
      borderColor={"gray.300"}
      p={2}
      borderRadius={"sm"}
      w={"full"}
      flex={1}
      onPress={() =>
        navigation.navigate("ActiveWorkout", {
          title: "test",
        })
      }
    >
      <VStack space={1}>
        <Heading fontSize="sm">{title}</Heading>
        <Text fontSize={"xs"}>
          {lifts.map((lift, index) => {
            return <React.Fragment key={index}>{lift + " "}</React.Fragment>;
          })}
        </Text>
        <Text fontSize={"xs"} opacity={50}>
          {author}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default TemplateCard;
