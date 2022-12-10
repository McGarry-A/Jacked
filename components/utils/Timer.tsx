import { Box, Text } from "native-base";
import { useEffect, useState } from "react";

const Timer = () => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const myInterval = setInterval(() => {
      setSecondsElapsed((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(myInterval);
  }, []);

  useEffect(() => {
    secondsToFormattedTime();
  }, [secondsElapsed]);

  const secondsToFormattedTime = () => {
    const hours = Math.floor(secondsElapsed / (60 * 60))
      .toString()
      .padStart(2, "0");

    const divisor_for_minutes = secondsElapsed % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60)
      .toString()
      .padStart(2, "0");

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds).toString().padStart(2, "0");

    setFormattedTime(`${hours}:${minutes}:${seconds}`);
  };
  return (
    <Box
      width={"20"}
      backgroundColor={"coolGray.100"}
      borderRadius={5}
      flexDir="row"
      justifyContent={"center"}
      py={1}
      px={2}
    >
      <Text color={"coolGray.400"}>{formattedTime}</Text>
    </Box>
  );
};

export default Timer;
