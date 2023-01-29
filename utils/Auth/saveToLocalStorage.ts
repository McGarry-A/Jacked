const saveToLocalStorage = (key: string, value: any) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(value));
};

export default saveToLocalStorage;
