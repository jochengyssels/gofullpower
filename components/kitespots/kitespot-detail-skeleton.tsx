export function KitespotDetailSkeleton() {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-gray-200 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="h-10 w-2/3 bg-gray-300 rounded-lg mb-4"></div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="h-6 w-40 bg-gray-300 rounded-lg"></div>
              <div className="h-6 w-32 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-28 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-28 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-36 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-6 w-36 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="h-6 w-36 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="h-6 w-24 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-[300px] bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
