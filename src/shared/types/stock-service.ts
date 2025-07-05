import {
  TStockLookupResponse,
  TLocalStorageStock,
  TStockQuote,
} from "./stocks";

export interface IStockService {
  saveNewStockOnLS(stockSymbol: string, alertPrice: number): Promise<void>;
  saveStocksOnLS(stocks: TLocalStorageStock[]): void;

  deleteStockFromLS(stockSymbol: string): void;

  getStocksLookup(filter: string): Promise<TStockLookupResponse>;
  getStockQuote(stockSymbol: string): Promise<TStockQuote>;
  getStocksFromLS(): TLocalStorageStock[];
}
