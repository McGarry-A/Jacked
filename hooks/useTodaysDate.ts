const useTodaysDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const date = yyyy + "-" + mm + "-" + dd;
  return date
};

export default useTodaysDate