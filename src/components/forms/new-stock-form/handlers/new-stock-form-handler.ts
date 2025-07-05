import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { stockWebsocket } from "@/shared/helpers/stock-websocket";
import stockService from "@/shared/services/stocks-service";

import {
  newStockFormSchema,
  TNewStockForm,
} from "../schemas/new-stock-form-schema";

export const useNewStockFormHandler = () => {
  const newStockFormInstance = useForm<TNewStockForm>({
    resolver: zodResolver(newStockFormSchema),
    defaultValues: {
      newStockAlertPrice: undefined,
    },
  });

  const getStocksToSelect = async (symboldToFilter: string) => {
    if (!symboldToFilter) return;

    const res = await stockService.getStocksLookup(symboldToFilter);

    if (!res?.result) return;

    const formattedData = res.result.map((stock) => {
      return {
        value: stock.symbol,
        label: stock.description,
      };
    });

    return formattedData;
  };

  const onSaveNewStock = async () => {
    const { newStockSymbol, newStockAlertPrice } =
      newStockFormInstance.getValues();

    await stockService.saveNewStockOnLS(
      newStockSymbol.value,
      Number(newStockAlertPrice),
    );

    // Subscribe to the new stock
    stockWebsocket.send(
      JSON.stringify({ type: "subscribe", symbol: newStockSymbol.value }),
    );

    // Dispatch custom event to trigger refresh
    window.dispatchEvent(new Event("stockUpdated"));

    // Reset form
    newStockFormInstance.reset({
      newStockSymbol: {
        value: "",
        label: undefined,
      },
      newStockAlertPrice: "",
    });
  };

  return {
    newStockFormInstance,
    getStocksToSelect,
    onSaveNewStock,
  };
};
