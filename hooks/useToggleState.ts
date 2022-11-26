import { useState } from "react";

const useToggleState = (init?: boolean) => {
  const [state, setState] = useState<boolean>(init ? init : false);
  const toggleState = () => setState(s => !s)
  const setToggleState = (bool: boolean) => setState(bool)

  return { state, setToggleState, toggleState }
};


export default useToggleState