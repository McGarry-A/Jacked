const getFromLocalStorage = async (key: string) => {
  const token = localStorage.getItem(key) || null;
  return token;
};

export default getFromLocalStorage;
