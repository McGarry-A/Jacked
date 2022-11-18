let counter = 1;

const useId = (prefix: "set" | "lift" | "temp") => {
  const id = `${prefix}-${counter.toString().padStart(2, "0")}`;
  counter++;
  return id;
};

export default useId;
