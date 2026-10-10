import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-zinc-950 dark:text-white">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Topbar />

        <main className="p-6 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  )
}