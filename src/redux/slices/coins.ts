import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoinData } from "../../constants/types";

const coinsSlice = createSlice({
  name: "coins",
  initialState: [] as CoinData[],
  reducers: {
    setCoins: (state, action: PayloadAction<CoinData[]>) => {
      return action.payload;
    },
    addCoin: (state, action: PayloadAction<CoinData>) => {
      return [...state, action.payload];
    },
    deleteCoin: (state, action: PayloadAction<string>) => {
      return state.filter((coin) => coin.id !== action.payload);
    },
    changeTableActivity: (state, action: PayloadAction<string>) => {
      // Find the coin with the matching id
      const coinToUpdate = state.find((coin) => coin.id === action.payload);

      if (coinToUpdate) {
        // Toggle the activeOnTable flag
        coinToUpdate.activeOnTable = !coinToUpdate.activeOnTable;
      }

      return state;
    },
  },
});

export const { setCoins, addCoin, deleteCoin, changeTableActivity } =
  coinsSlice.actions;
export default coinsSlice.reducer;
