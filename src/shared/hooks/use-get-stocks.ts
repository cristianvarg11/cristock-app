import { useEffect } from "react";

import { stockWebsocket } from "../helpers/stock-websocket";
import { useStockStore } from "../stores/stocks-store";
import stockService from "../services/stocks-service";

export const useGetStocks = () => {
  const { setCurrentSavedStocks } = useStockStore();

  const fetchAndSubscribeStocks = () => {
    const stocksFromLS = stockService.getStocksFromLS();
    setCurrentSavedStocks(stocksFromLS);

    if (stocksFromLS.length > 0) {
      stockWebsocket.addEventListener("open", () => {
        stocksFromLS.forEach((stock) => {
          stockWebsocket.send(
            JSON.stringify({ type: "subscribe", symbol: stock.symbol }),
          );
        });
      });
    }
  };

  useEffect(() => {
    fetchAndSubscribeStocks();

    // Add event listener for custom stock update event
    window.addEventListener("stockUpdated", fetchAndSubscribeStocks);

    return () => {
      window.removeEventListener("stockUpdated", fetchAndSubscribeStocks);
    };
    // eslint-disable-next-line
  }, []);
};
