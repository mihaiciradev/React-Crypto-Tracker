export const getLocalStorageCoins = () => {
  const ls = localStorage.getItem("coins");

  const parsed = ls !== null ? JSON.parse(ls) : null;

  return parsed;

  // console.log(JSON.parse(localStorage.getItem("coins") || ""));
  // return JSON.parse(localStorage.getItem("coins") || "");
};
