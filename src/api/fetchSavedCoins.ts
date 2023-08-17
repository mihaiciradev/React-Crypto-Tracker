import { CoinData } from "../constants/types";
import apiService from "./apiService";
import { savedCoinsEndpoint } from "./constants";

export const fetchSavedCoins = (coins: { [key: string]: CoinData }) => {
  const coinIdsArray = Object.keys(coins).map((key) => coins[key].id);
  const coinIds = coinIdsArray.join(",");

  const queryParams = new URLSearchParams();
  queryParams.append("ids", coinIds);
  queryParams.append("vs_currencies", "usd");

  const endpoint = `${savedCoinsEndpoint}?${queryParams.toString()}`;
  return apiService.get(endpoint);
};

export default fetchSavedCoins;
