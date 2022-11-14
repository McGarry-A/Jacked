import moment from "moment";

const getDaysAgo = (date: string) => {
  const current = moment();
  const dateMoment = moment(date);

  const differenceInDays = current.diff(dateMoment, "days");

  if (differenceInDays === 0) return `Today`;
  if (differenceInDays === 1) return `1 day ago`;
  if (differenceInDays < 30) return `${differenceInDays} days ago`;

  return date
};

export default getDaysAgo;
