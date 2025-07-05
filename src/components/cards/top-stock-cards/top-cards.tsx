"use client";
import { useHandleTopStockCards } from "./handlers/handle-top-stock-cards";
import {
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { StockCard } from "./stock-card";
import { TopCardsSkeleton } from "./top-cards-skeleton";

export const TopCards = () => {
  const { currentSavedStocks, deleteStock } = useHandleTopStockCards();

  if (currentSavedStocks?.length === 0) {
    return (
      <div className="w-full">
        <TopCardsSkeleton/>
      </div>
    );
  }

  return (
    <div className="relative">
      {" "}
      {/* Added container for positioning */}
      <Carousel
        opts={{
          align: "center", // Changed from "start" to "center"
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {currentSavedStocks.map((stock, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <StockCard stock={stock} onDelete={deleteStock} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons - now properly positioned */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full" />
      </Carousel>
    </div>
  );
};
