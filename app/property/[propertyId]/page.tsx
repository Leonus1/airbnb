import { Suspense } from "react";
import PropertyDetails from "@/components/PropertyDetails/PropertyDetails";
import { Skeleton } from "@/components/ui/skeleton";

interface Params {
  [key: string]: string;
}

export default function PropertyPage({ params }: { params: Params }) {
  return (
    <div>
      <Suspense fallback={<SkeletonLoading />}>
        <PropertyDetails params={params} />
      </Suspense>
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className="space-y-2 flex flex-col">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="space-y-2 flex flex-col">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>

      <Skeleton className="h-72 w-full rounded-lg" />
    </div>
  );
}
