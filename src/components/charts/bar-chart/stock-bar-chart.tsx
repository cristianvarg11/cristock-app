"use client";
import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { useStockStore } from "@/shared/stores/stocks-store";

export function StockBarChart() {
  const { currentSavedStocks } = useStockStore();

  // Transform data for the chart
  const chartData = currentSavedStocks.map((stock) => ({
    changePercentage: stock.changePercentage,
    currentPrice: stock.currentPrice,
    alertPrice: stock.alertPrice,
    symbol: stock.symbol,
  }));

  return (
    <div className="w-full p-4 border rounded-lg bg-background">
      <h2 className="text-xl font-semibold mb-4">Stock Price Comparison</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="symbol"
              label={{
                position: "bottom",
              }}
            />

            <YAxis
              label={{
                value: "Price ($)",
                angle: -90,
                position: "left",
              }}
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="currentPrice"
              name="Current Price"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="alertPrice"
              name="Alert Price"
              fill="#dc5b5b"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
