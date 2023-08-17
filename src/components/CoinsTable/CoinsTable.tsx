import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import Icon from "react-crypto-icons";
import { CoinData } from "../../constants/types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Icon as MuiIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteCoin } from "../../redux/slices/coins";
import { getLocalStorageCoins } from "../../constants/utils";

type CoinsTableProps = {
  coins: CoinData[];
};

export default function CoinsTable({ coins }: CoinsTableProps) {
  const dispatch = useDispatch();

  const ErrorRow = ({ text }: { text: string }) => {
    return (
      <TableRow>
        <TableCell component="th" scope="row"></TableCell>
        <TableCell align="center" sx={{ color: "white" }}>
          {text}
        </TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    );
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: "800px" }}>
        <Table aria-label="simple table" sx={{ backgroundColor: "black" }}>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid white",
                "&>th": {
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell align="left" sx={{ paddingLeft: "25px" }}>
                Name
              </TableCell>
              <TableCell align="center">
                <Grid container spacing={0} direction="column">
                  Current Price
                  <Typography variant="h6" sx={{ fontSize: ".7rem" }}>
                    updated every minute
                  </Typography>
                </Grid>{" "}
              </TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(coins.length === 0 || coins.every((e) => !e.activeOnTable)) && (
              <ErrorRow text="No coins to track" />
            )}

            {coins.length > 0 &&
              coins.map((coin: CoinData) => {
                if (coin.activeOnTable)
                  return (
                    <TableRow
                      key={coin.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>th, &>td": {
                          color: "white",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Grid container spacing={0} gap={2} alignItems="center">
                          {" "}
                          <Icon name={coin.symbol} size={25} />
                          {coin.name}
                        </Grid>
                      </TableCell>
                      <TableCell align="center">
                        {coin.usd ? `${coin.usd} USD` : `error`}{" "}
                      </TableCell>
                      <TableCell align="center">
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dispatch(deleteCoin(coin.id));
                            localStorage.setItem(
                              "coins",
                              JSON.stringify(
                                getLocalStorageCoins().filter(
                                  (c: CoinData) => c.id !== coin.id
                                )
                              )
                            );
                          }}
                        >
                          <MuiIcon
                            component={DeleteOutlineIcon}
                            sx={{
                              color: "white",
                              "&:hover": {
                                opacity: ".4",
                              },
                            }}
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
