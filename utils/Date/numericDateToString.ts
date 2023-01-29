const numbericDateToString = (date: string): string => {
  const newDate = date.split("-");
  const year = Number(newDate[0]);
  const month = Number(newDate[1]);
  const day = Number(newDate[2]);

  const stringDate = new Date(year, month - 1, day);
  return stringDate.toDateString();
};

export default numbericDateToString