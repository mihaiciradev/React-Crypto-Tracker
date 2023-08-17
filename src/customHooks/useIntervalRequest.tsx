import { useEffect, useRef } from "react";
import { RequestFn } from "../constants/types";

const useIntervalRequest = (requestFn: RequestFn, interval: number) => {
  const intervalId = useRef<any>();

  const start = () => {
    // invoke at start
    requestFn();

    // start the timer
    intervalId.current = setInterval(() => {
      requestFn();
    }, interval);
  };

  const call = () => {
    requestFn();
  };

  const stop = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  return { start, stop, call };
};

export default useIntervalRequest;
