export function KitespotsLoading() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-3" />
              <div className="flex gap-2 mb-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-6 bg-gray-200 rounded-full w-16" />
                ))}
              </div>
              <div className="h-16 bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 bg-gray-200 rounded-lg mb-1 w-full" />
              <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-4" />
              <div className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded-lg w-24" />
                <div className="h-8 bg-gray-200 rounded-lg w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator for pagination */}
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 w-64 h-12 animate-pulse flex justify-center items-center">
          <div className="bg-gray-200 h-6 w-40 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
