"use client";
import { TrendingUp, TrendingDown, Bell, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { TLocalStorageStock } from "@/shared/types/stocks";
import { Button } from "@/components/ui/button";

type TStockCardProps = {
  stock: TLocalStorageStock;
  onDelete?: (symbol: string) => void;
};

export const StockCard = (props: TStockCardProps) => {
  const { stock, onDelete } = props;
  const { symbol, alertPrice, prevPrice, currentPrice, changePercentage } =
    stock;

  const isPositive = changePercentage >= 0;
  const priceChange = currentPrice - prevPrice;
  const areAlert = currentPrice > alertPrice;

  return (
    <Card
      className="w-full max-w-sm relative"
      style={{
        backgroundColor: areAlert ? "#9ef2a63b" : "#dc5b5b3b",
      }}
    >
      <CardHeader className="pb-3">
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1 h-8 w-8 rounded-full hover:cursor-pointer"
            onClick={() => onDelete(stock.symbol)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">{symbol}</h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span className="text-sm">Alert: ${alertPrice?.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">
            ${currentPrice.toFixed(2)}
          </div>

          <div
            className={`flex items-center gap-2 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}

            <span>
              {isPositive ? "+" : ""}${priceChange.toFixed(2)} (
              {isPositive ? "+" : ""}
              {changePercentage.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Previous Close</span>
            <span className="font-medium">${prevPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
