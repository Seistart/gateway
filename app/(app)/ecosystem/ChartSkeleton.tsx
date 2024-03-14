export const ChartSkeleton = () => {
  return (
    <div className="skeleton-container flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-primary  text-center text-gray-800">
      <p>
        With a large amount of nodes it might take time for the graph to load.
      </p>
    </div>
  )
}
