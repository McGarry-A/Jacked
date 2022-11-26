import { useState } from "react";

const useToggleState = () => {
  const [state, setState] = useState<boolean>(false);
  const toggleState = () => setState(s => !s)
  const setToggleState = (bool: boolean) => setState(bool)

  return { state, setToggleState, toggleState }
};


export default useToggleState