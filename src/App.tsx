import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import fetchSavedCoins from "./api/fetchSavedCoins";
import { defaultApiCoins } from "./constants/const";
import CoinsTable from "./components/CoinsTable/CoinsTable";
import AppLogo from "./assets/AppLogo";
import { CoinData, RequestFn } from "./constants/types";
import { getLocalStorageCoins } from "./constants/utils";
import { Alert, Grid, IconButton, Slide } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchAllCoins from "./api/fetchAllCoins";
import { useSelector, useDispatch } from "react-redux";
import { coinsSelector } from "./redux/selectors/coinsSelector";
import { setCoins } from "./redux/slices/coins";
import CloseIcon from "@mui/icons-material/Close";
import useIntervalRequest from "./customHooks/useIntervalRequest";
import CoinsBar from "./components/CoinsBar/CoinsBar";

function App() {
  // const [coins, setCoins] = useState<CoinData[]>([]);
  const [coinDictionary, setCoinDictionary] = useState<CoinData[]>([]);

  const dispatch = useDispatch();

  const savedCoins = useSelector(coinsSelector);

  const [apiOverflow, setApiOverflow] = useState(false);

  useEffect(() => {
    // Data persistance from localStorage
    const localStorageData = getLocalStorageCoins();
    if (localStorageData) {
      dispatch(setCoins(localStorageData));
      return;
    } else {
      const defaultCoins = defaultApiCoins;
      localStorage.setItem("coins", JSON.stringify(defaultCoins));
    }

    // const defaultCoins = defaultApiCoins;
    // localStorage.setItem("coins", JSON.stringify(defaultCoins));
  }, []);

  const intervalRequestFn = () => {
    fetchSavedCoins(getLocalStorageCoins() || null)
      .then((response: any) => {
        const data = response.data;
        const localStorageCoins = getLocalStorageCoins();
        const refreshedCoins: CoinData[] = Object.keys(data).map((coin) => {
          return {
            usd: data[coin].usd,
            ...localStorageCoins.find((c: CoinData) => c.id === coin),
          };
        });

        // Dispatch the action and return the promise for chaining
        return dispatch(setCoins(refreshedCoins));
      })
      .catch((error: any) => {
        console.error("Error fetching data (Saved coins fetch):", error);
        if (error.response?.status == 429) {
          if (!apiOverflow) setApiOverflow(true);
        }
      });
  };

  const intervalRequest = useIntervalRequest(
    intervalRequestFn as RequestFn,
    61000
  );

  const allCoinsRequest = () => {
    //request all the coins from the database
    fetchAllCoins()
      .then((response: any) => {
        const data = response.data;
        setCoinDictionary(data);
      })
      .catch((error: any) => {
        console.error("Error fetching data (All coins fetch):", error);
        if (error.response?.status == 429) {
          if (!apiOverflow) setApiOverflow(true);
          setTimeout(() => {
            allCoinsRequest();
          }, 80000);
        }
      });
  };

  useEffect(() => {
    //initialize requests

    // allCoinsRequest();

    //start intervalRequest (each 1 minute)
    intervalRequest.start();

    return () => {
      intervalRequest.stop();
    };
  }, []);

  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        gap={2}
        direction="column"
        alignItems="center"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            right: 0,
            transform: "translateX(-50%)",
            width: "max-content",
          }}
        >
          <Slide direction="down" in={apiOverflow} mountOnEnter unmountOnExit>
            <Alert severity="error">
              Seems like the API has been overflown. Wait about a minute.
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setApiOverflow(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Alert>
          </Slide>
        </div>
        <AppLogo />
        <SearchBar
          coinDictionary={coinDictionary}
          triggerRequest={intervalRequest}
        />
        <CoinsBar coins={savedCoins} />
        <CoinsTable coins={savedCoins} />
      </Grid>
    </div>
  );
}

export default App;
