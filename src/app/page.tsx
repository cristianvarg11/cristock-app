"use client";
import { NewStockForm } from "@/components/forms";
import { TopCards } from "@/components/cards";

import { useGetStocks } from "@/shared/hooks/use-get-stocks";
import { StockBarChart } from "@/components/charts";

export default function Home() {
  useGetStocks();

  return (
    <div className="space-y-8">
      {/* Top cards section */}
      <section className="max-w-6xl mx-auto px-4">
        <TopCards />
      </section>

      {/* Form section */}
      <section className="max-w-6xl mx-auto px-4">
        <NewStockForm />
      </section>

      {/* Chart section */}
      <section className="max-w-6xl mx-auto px-4">
        <StockBarChart />
      </section>
    </div>
  );
}
