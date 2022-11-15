import { Box, Text, VStack, Heading } from "native-base";
import React from "react";

interface TemplateCardProps {
  title: string;
  lifts: string[];
  author: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  author,
  lifts,
}) => {
  return (
    <VStack
      borderWidth={1}
      borderColor={"gray.300"}
      p={2}
      space={1}
      borderRadius={"sm"}
      w={"full"}
      flex={1}
    >
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
  );
};

export default TemplateCard;
