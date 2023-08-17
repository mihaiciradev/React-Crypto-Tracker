export type CoinData = {
  id: string;
  symbol: string;
  name: string;
  usd?: string;
  activeOnTable?: boolean;
};

export type RequestFn = () => Promise<any>;
