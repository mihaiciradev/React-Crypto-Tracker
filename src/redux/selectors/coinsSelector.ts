import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCoins = (state: RootState) => state.coins;

export const coinsSelector = createSelector(selectCoins, (coins) => coins);
