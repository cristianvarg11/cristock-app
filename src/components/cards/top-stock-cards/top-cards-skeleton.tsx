import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const TopCardsSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="relative">
        {/* Cards row for carousel */}
        <div className="flex gap-4 overflow-hidden">
          {/* Skeleton Card 1 */}
          <Card className="min-w-[280px] flex-shrink-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-8 w-20" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Skeleton Card 2 */}
          <Card className="min-w-[280px] flex-shrink-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-8 w-24" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Skeleton Card 3 */}
          <Card className="min-w-[280px] flex-shrink-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-8 w-16" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-14" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty state overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-background/90 backdrop-blur-sm px-6 py-4 rounded-lg border shadow-sm">
            <div className="text-muted-foreground text-lg font-medium">No top items to show</div>
            <div className="text-muted-foreground/60 text-sm mt-1">
              Top performing items will appear here when available
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
