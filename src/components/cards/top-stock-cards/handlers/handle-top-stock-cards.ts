/* eslint-disable @typescript-eslint/no-unused-vars */
// src/shared/hooks/use-handle-top-stock-cards.ts (updated)
import { useEffect } from 'react';
import { stockWebsocket } from '@/shared/helpers/stock-websocket';
import { useStockStore } from '@/shared/stores/stocks-store';
import stockService from '@/shared/services/stocks-service';
import { TStocksData } from '@/shared/types/stocks'; // Make sure TStock includes alertPrice
import { sendPushNotification, subscribeToPushNotifications } from '@/shared/helpers/push-notifications';

export const useHandleTopStockCards = () => {
  const { currentSavedStocks, setCurrentSavedStocks } = useStockStore();

  useEffect(() => {
    // Attempt to subscribe to push notifications when the component mounts
    // This will prompt the user for permission.
    subscribeToPushNotifications();
  }, []); // Run once on mount

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => { // Mark as async
      const data: TStocksData = JSON.parse(event.data);

      if (data.data) {
        const updatedStocks = [...currentSavedStocks];
        let notificationTriggered = false; // Flag to avoid multiple notifications for same stock in one update

        for (const stock of updatedStocks) {
          const similarStock = data?.data.find(
            (stockValue) => stockValue.s === stock.symbol,
          );

          if (similarStock) {
            const oldPrice = stock.currentPrice;
            const newPrice = similarStock.p;

            stock.prevPrice = oldPrice;
            stock.currentPrice = newPrice;

            // Check for alert price
            if (stock.alertPrice && newPrice >= stock.alertPrice && oldPrice < stock.alertPrice) {
              // Trigger push notification
              console.log(`Alert for ${stock.symbol}: Current price ${newPrice} is >= alert price ${stock.alertPrice}`);
              await sendPushNotification(
                `Stock Alert: ${stock.symbol}`,
                `Price reached ${newPrice} (Alert: ${stock.alertPrice})`,
                `/stock/${stock.symbol}`
              );
              notificationTriggered = true; // Set flag
            }
          }
        }

        // Only update local storage and store if there were actual updates or notifications
        if (updatedStocks.some(stock => stock.prevPrice !== undefined)) { // Check if any price actually changed
          stockService.saveStocksOnLS(updatedStocks);
          setCurrentSavedStocks(updatedStocks);
        }
      }
    };

    if (currentSavedStocks.length > 0) {
      stockWebsocket.addEventListener('message', handleMessage);
    }

    return () => {
      stockWebsocket.removeEventListener('message', handleMessage);
    };
  }, [currentSavedStocks, setCurrentSavedStocks]); // Add currentSavedStocks to dependencies

  const deleteStock = (symbol: string) => {
    stockService.deleteStockFromLS(symbol);
    stockWebsocket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    setCurrentSavedStocks(
      currentSavedStocks.filter((stock) => stock.symbol !== symbol),
    );
  };

  return {
    currentSavedStocks,
    deleteStock,
  };
};