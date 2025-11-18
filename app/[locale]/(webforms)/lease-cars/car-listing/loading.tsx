// app/loading.tsx

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-secondary"
        style={{ borderTopColor: '#800000' }} // Maroon color
      ></div>
    </div>
  )
}
