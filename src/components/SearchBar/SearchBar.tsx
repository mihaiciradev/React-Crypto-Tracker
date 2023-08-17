import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { CoinData } from "../../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { coinsSelector } from "../../redux/selectors/coinsSelector";
import { addCoin } from "../../redux/slices/coins";
import { localCopyOfAllCoins } from "../../constants/const";
import { getLocalStorageCoins } from "../../constants/utils";

type SearchBarProps = {
  coinDictionary: CoinData[];
  triggerRequest: any;
};

export default function SearchBar({
  coinDictionary,
  triggerRequest,
}: SearchBarProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly CoinData[]>([]);
  const loading = open && options.length === 0;

  const savedCoins = useSelector(coinsSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        setOptions([...localCopyOfAllCoins]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300, border: "2px solid black", borderRadius: "10px" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.id}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <li
          {...props}
          onClick={() => {
            console.log("e pus baaaaa");
            setOpen(false);

            if (savedCoins.length > 8) {
              window.alert("Too many coins to track. Delete some.");
              return;
            }

            if (
              !getLocalStorageCoins().every((c: CoinData) => c.id !== option.id)
            ) {
              window.alert("Coin already tracked.");
              return;
            }

            console.log("dwarf");

            const newCoins = savedCoins.map(({ usd, ...coin }) => ({
              ...coin,
            }));
            triggerRequest.call();
            newCoins.push({ ...option, activeOnTable: true });
            localStorage.setItem("coins", JSON.stringify(newCoins));
            dispatch(addCoin(option));
            console.log("gata");
          }}
        >
          {option.id}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            shrink: false,
          }}
          InputProps={{
            ...params.InputProps,
            placeholder: "Search coin",
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
