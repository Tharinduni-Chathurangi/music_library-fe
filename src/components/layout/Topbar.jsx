import ModeToggle from "../ui/mode-toggle"

export default function Topbar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white dark:bg-zinc-900 dark:border-zinc-800">

      <div className="font-semibold">
        MUSIC ADMIN PANEL
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

    </header>
  )
}