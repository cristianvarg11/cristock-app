import { useEffect } from "react";

import { stockWebsocket } from "@/shared/helpers/stock-websocket";
import { useStockStore } from "@/shared/stores/stocks-store";
import stockService from "@/shared/services/stocks-service";
import { TStocksData } from "@/shared/types/stocks";

export const useHandleTopStockCards = () => {
  const { currentSavedStocks, setCurrentSavedStocks } = useStockStore();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data: TStocksData = JSON.parse(event.data);

      if (data.data) {
        const updatedStocks = [...currentSavedStocks];

        updatedStocks.forEach((stock) => {
          const similarStock = data?.data.find(
            (stockValue) => stockValue.s === stock.symbol,
          );

          if (similarStock) {
            stock.prevPrice = stock.currentPrice;
            stock.currentPrice = similarStock.p;
          }
        });

        stockService.saveStocksOnLS(updatedStocks);
        setCurrentSavedStocks(updatedStocks);
      }
    };

    if (currentSavedStocks.length > 0) {
      stockWebsocket.addEventListener("message", handleMessage);
    }

    return () => {
      stockWebsocket.removeEventListener("message", handleMessage);
    };
  }, [currentSavedStocks, setCurrentSavedStocks]);

  const deleteStock = (symbol: string) => {
    stockService.deleteStockFromLS(symbol);
    stockWebsocket.send(JSON.stringify({ type: "unsubscribe", symbol }));
    setCurrentSavedStocks(
      currentSavedStocks.filter((stock) => stock.symbol !== symbol),
    );
  };

  return {
    currentSavedStocks,
    deleteStock,
  };
};
