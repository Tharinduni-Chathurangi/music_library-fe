export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 w-[500px] p-5 rounded-xl space-y-4">
        
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {children}
      </div>
    </div>
  )
}