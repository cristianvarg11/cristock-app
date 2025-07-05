import { TLocalStorageStock } from "./stocks";

export interface IStockStore {
  currentSavedStocks: TLocalStorageStock[];
}

export interface IStockStoreActions {
  setCurrentSavedStocks(stocks: TLocalStorageStock[]): void;
  cleanStockStore(): void;
}
