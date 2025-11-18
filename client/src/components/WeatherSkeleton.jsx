import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-300">
      <Card className="rounded-3xl p-8 md:p-12">
        <div className="space-y-4 md:space-y-6 flex flex-col items-center">
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
          <Skeleton className="h-20 w-40" />
          <Skeleton className="h-8 w-48" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="rounded-2xl p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
