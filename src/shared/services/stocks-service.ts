import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { IStockService } from "@/shared/types/stock-service";
import { EStocksLS } from "@/shared/schemas/stocks";
import { fetcher } from "@/shared/helpers/fetcher";
import {
  TStockLookupResponse,
  TLocalStorageStock,
  TStockQuote,
} from "@/shared/types/stocks";

import { baseUrl, finnhubToken } from "../consts/finnhub-consts";

export class StockService implements IStockService {
  public async getStocksLookup(filter: string): Promise<TStockLookupResponse> {
    try {
      const res = await fetcher<TStockLookupResponse>(
        `${baseUrl}/search?q=${filter}&token=${finnhubToken}`,
      );

      return res;
    } catch (error) {
      throw error;
    }
  }

  public async getStockQuote(stockSymbol: string): Promise<TStockQuote> {
    try {
      const res = await fetcher<TStockQuote>(
        `${baseUrl}/quote?symbol=${stockSymbol}&token=${finnhubToken}`,
      );

      return res;
    } catch (error) {
      throw error;
    }
  }

  public getStocksFromLS(): TLocalStorageStock[] {
    return JSON.parse(localStorage.getItem(EStocksLS.SAVED_STOCKS) || "[]");
  }

  public saveStocksOnLS(stocks: TLocalStorageStock[]): void {
    localStorage.setItem(EStocksLS.SAVED_STOCKS, JSON.stringify(stocks));
  }

  public async saveNewStockOnLS(
    stockSymbol: string,
    alertPrice: number,
  ): Promise<void> {
    try {
      const currentLSStocks = this.getStocksFromLS();
      const existingStock = currentLSStocks.find(
        (stock) => stock.symbol === stockSymbol,
      );

      // If stock exists, update the alert price
      if (existingStock) {
        if (existingStock.alertPrice === alertPrice) {
          toast.info(`${stockSymbol} already has this alert price`);
          return;
        }

        const updatedStock = {
          ...existingStock,
          alertPrice,
        };

        this.saveStocksOnLS(
          currentLSStocks.map((stock) =>
            stock.symbol === stockSymbol ? updatedStock : stock,
          ),
        );
        toast.success(`${stockSymbol} alert price updated to $${alertPrice}`);
        return;
      }

      // For new stocks, fetch quote and add to LS
      const currentStockQuote = await this.getStockQuote(stockSymbol);

      if (Object.keys(currentStockQuote).length === 0) {
        toast.error("You don't have access to this stock");
        return;
      }

      const newStockToLS: TLocalStorageStock = {
        symbol: stockSymbol,
        alertPrice,
        changePercentage: currentStockQuote.dp,
        currentPrice: currentStockQuote.c,
        prevPrice: currentStockQuote.pc,
      };

      this.saveStocksOnLS([...currentLSStocks, newStockToLS]);
      toast.success(`${stockSymbol} added with alert at $${alertPrice}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Failed to save stock");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  public deleteStockFromLS(stockSymbol: string): void {
    try {
      const currentStocks = this.getStocksFromLS();
      const updatedStocks = currentStocks.filter(
        (stock) => stock.symbol !== stockSymbol,
      );

      this.saveStocksOnLS(updatedStocks);
      toast.success(`${stockSymbol} removed from tracking`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete stock");
    }
  }
}

const stockService = new StockService();
export default stockService;
