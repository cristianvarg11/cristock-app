import { create } from "zustand";

import { IStockStore, IStockStoreActions } from "../types/stock-store";
import { TLocalStorageStock } from "../types/stocks";

export const useStockStore = create<IStockStore & IStockStoreActions>(
  (set) => ({
    currentSavedStocks: [],

    setCurrentSavedStocks: (stocks: TLocalStorageStock[]) =>
      set({ currentSavedStocks: stocks }),

    cleanStockStore: () => set({ currentSavedStocks: [] }),
  }),
);
