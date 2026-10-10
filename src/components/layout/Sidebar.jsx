import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Music,
  Users,
  Disc3,
  Tags,
  ListMusic,
} from "lucide-react"

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Songs",
    path: "/songs",
    icon: Music,
  },
  {
    name: "Artists",
    path: "/artists",
    icon: Users,
  },
  {
    name: "Albums",
    path: "/albums",
    icon: Disc3,
  },
  {
    name: "Genres",
    path: "/genres",
    icon: Tags,
  },
  {
    name: "Playlists",
    path: "/playlists",
    icon: ListMusic,
  },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white flex flex-col">

      <div className="p-4 text-lg font-bold border-b border-gray-800">
        🎵 KS MUSIC
      </div>

      <nav className="flex flex-col p-3 gap-1 text-sm">

        {menus.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          )
        })}

      </nav>

    </aside>
  )
}