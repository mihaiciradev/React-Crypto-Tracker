import React from "react";
import { Alert, Grid, Typography, IconButton, Slide } from "@mui/material";
import { CoinData } from "../../constants/types";
import { useDispatch } from "react-redux";
import { changeTableActivity } from "../../redux/slices/coins";

type CoinsBarProps = {
  coins: CoinData[];
};

export default function CoinsBar({ coins }: CoinsBarProps) {
  const dispatch = useDispatch();

  return (
    <Grid
      container
      spacing={0}
      gap={3}
      alignItems="center"
      sx={{
        outline: "2px solid black",
        borderRadius: "10px",
        width: "max-content",
        padding: "7px",
      }}
    >
      <Typography
        sx={{
          paddingRight: "10px",
          borderRight: "2px solid black",
        }}
      >
        Traced coins
      </Typography>
      {coins.length > 0 &&
        coins.map((coin) => (
          <button
            key={coin.id}
            style={{
              border: "2px solid black",
              padding: "8px",
              background: "transparent",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: coin.activeOnTable ? "1" : ".3",
            }}
            onClick={() => {
              dispatch(changeTableActivity(coin.id));
            }}
          >
            {coin.symbol}
          </button>
        ))}
    </Grid>
  );
}
