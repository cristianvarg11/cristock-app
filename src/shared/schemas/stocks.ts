import { object, number, string } from "zod";

export enum EStockResponseType {
  TRADE = "trade",
}

export enum EStocksLS {
  SAVED_STOCKS = "savedStocks",
}

export const stockLookupSchema = object({
  description: string(),
  displaySymbol: string(),
  symbol: string(),
  type: string(),
});

export const stockValueSchema = object({
  p: number(), // the last price
  s: string(), // symbol
  t: number(), // timestamp
  v: number(), // volume
});

export const stockQuoteSchema = object({
  c: number(), // current price
  d: number(), // change
  dp: number(), // percent change
  h: number(), // high price of the day
  l: number(), // low price of the day
  o: number(), // open price of the day
  pc: number(), // previous close price
  t: number(), // timestamp
});

export const localStorageStockSchema = object({
  symbol: string(),
  alertPrice: number(),
  prevPrice: number(),
  currentPrice: number(),
  changePercentage: number(),
});
