export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-96 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="space-y-4">
        <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
        <div className="h-[600px] w-full bg-muted animate-pulse rounded"></div>
      </div>
    </div>
  )
}
