export const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className="py-6">
      <div className="grid grid-cols-3 place-items-center gap-4">
        <div>
          <h2 className="mb-2">Block 1</h2>
          <p className="text-sm">Content for block 1...</p>
        </div>
        <div>
          <h2 className="mb-2">Block 2</h2>
          <p className="text-sm">Content for block 2...</p>
        </div>
        <div>
          <h2 className="mb-2">Block 3</h2>
          <p className="text-sm">Content for block 3...</p>
        </div>
      </div>
      <div className="mt-4 text-center text-xs">
        <p>&copy; {date} SeiStart</p>
      </div>
    </footer>
  )
}
