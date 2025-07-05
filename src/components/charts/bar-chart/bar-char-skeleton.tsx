import { Skeleton } from "@/components/ui/skeleton"

export const BarChartSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="relative">
        {/* Chart container */}
        <div className="h-64 sm:h-72 md:h-80 border rounded-lg p-2 sm:p-4 bg-background">
          {/* Y-axis labels */}
          <div className="absolute left-1 sm:left-2 top-2 sm:top-4 flex flex-col justify-between h-56 sm:h-64 md:h-72">
            <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
          </div>

          {/* Chart area */}
          <div className="ml-8 sm:ml-12 h-56 sm:h-64 md:h-72 flex items-end justify-between gap-1 sm:gap-2 md:gap-4 border-l border-b border-muted">
            {/* Mobile: 4 bars, Tablet: 5 bars, Desktop: 6 bars */}
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton className="w-8 sm:w-10 md:w-12 h-20 sm:h-24 md:h-32" />
              <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton className="w-8 sm:w-10 md:w-12 h-16 sm:h-20 md:h-24" />
              <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton className="w-8 sm:w-10 md:w-12 h-24 sm:h-28 md:h-40" />
              <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton className="w-8 sm:w-10 md:w-12 h-12 sm:h-16 md:h-20" />
              <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            </div>
            {/* Show 5th bar on tablet and up */}
            <div className="hidden sm:flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton className="w-8 sm:w-10 md:w-12 h-20 sm:h-24 md:h-36" />
              <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            </div>
            {/* Show 6th bar on desktop only */}
            <div className="hidden md:flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton className="w-8 sm:w-10 md:w-12 h-16 sm:h-20 md:h-28" />
              <Skeleton className="h-2 sm:h-3 w-6 sm:w-8" />
            </div>
          </div>
        </div>

        {/* Empty state overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-background/90 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg border shadow-sm max-w-xs sm:max-w-sm">
            <div className="text-muted-foreground text-base sm:text-lg font-medium">No stock to show</div>
            <div className="text-muted-foreground/60 text-xs sm:text-sm mt-1">
              Stock data will appear here when available
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
