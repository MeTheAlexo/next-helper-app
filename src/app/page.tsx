export default function Page() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Mobile App</h1>
      <div className="grid gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
          <div key={item} className="rounded-lg bg-gray-100 p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold">Item {item}</h2>
            <p className="text-sm text-gray-600">
              This is a sample item in our mobile layout.
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
