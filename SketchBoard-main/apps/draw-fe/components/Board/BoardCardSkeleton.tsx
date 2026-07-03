export const BoardCardSkeleton = () => {
  return (
    <div className="group relative block aspect-[4/3] rounded-xl border border-border bg-surface p-6 animate-pulse">
      <div className="relative h-full flex flex-col justify-between">
        <div className="h-8 w-8 bg-border rounded-md"></div>
        <div>
          <div className="h-6 w-3/4 bg-border rounded-md"></div>
          <div className="mt-2 h-4 w-1/2 bg-border rounded-md"></div>
        </div>
      </div>
    </div>
  );
};