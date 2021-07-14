//
export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)); //Метод JSON.parse() разбирает строку JSON, возможно с преобразованием получаемого в процессе разбора значения.
  } catch (e) {
    console.log("Error getting data from localStorage", e);
    return null;
  }
};
//(key, data)куда записываем и что записываем
export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data)); //setItem(названиеКлюча, значениеКлюча)
  } catch (e) {
    console.log("Error saving data from localStorage", e);
  }
};
