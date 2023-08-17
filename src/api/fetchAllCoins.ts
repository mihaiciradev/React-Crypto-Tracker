import apiService from "./apiService";
import { allCoinsEndpoint, savedCoinsEndpoint } from "./constants";

export const fetchAllCoins = () => {
  const endpoint = allCoinsEndpoint;
  return apiService.get(endpoint);
};

export default fetchAllCoins;
