interface DataInterface {
  [key: string]: {
    name: string;
    category: "Barbell" | "Dumbell" | "Machine" | "Cable";
    targets: string;
    id: string;
  };
}

const data: DataInterface = {
  "ex-01": {
    name: "Barbell Bench",
    category: "Barbell",
    targets: "Chest",
    id: "ex-01",
  },
  "ex-02": {
    name: "Squat",
    category: "Barbell",
    targets: "Legs",
    id: "ex-02",
  },
  "ex-03": {
    name: "Strict Military Press",
    category: "Barbell",
    targets: "Shoulders",
    id: "ex-03",
  },
  "ex-04": {
    name: "Barbell Row",
    category: "Barbell",
    targets: "Back",
    id: "ex-04",
  },
  "ex-05": {
    name: "Incline Dumbell Press",
    category: "Dumbell",
    targets: "Chest",
    id: "ex-05",
  },
};

export default data;
