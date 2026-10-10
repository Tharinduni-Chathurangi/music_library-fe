const cards = [
  {
    title: "SONGS",
    count: 10,
    light: "bg-blue-50 border-blue-200 text-blue-700",
    dark: "dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300",
  },
  {
    title: "ARTISTS",
    count: 5,
    light: "bg-green-50 border-green-200 text-green-700",
    dark: "dark:bg-green-950/40 dark:border-green-800 dark:text-green-300",
  },
  {
    title: "ALBUMS",
    count: 3,
    light: "bg-purple-50 border-purple-200 text-purple-700",
    dark: "dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-300",
  },
  {
    title: "GENRES",
    count: 6,
    light: "bg-yellow-50 border-yellow-200 text-yellow-700",
    dark: "dark:bg-yellow-950/40 dark:border-yellow-800 dark:text-yellow-300",
  },
  {
    title: "PLAYLISTS",
    count: 4,
    light: "bg-pink-50 border-pink-200 text-pink-700",
    dark: "dark:bg-pink-950/40 dark:border-pink-800 dark:text-pink-300",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {cards.map((c, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl border text-center shadow-sm transition hover:scale-[1.02] ${c.light} ${c.dark}`}
          >
            <h2 className="text-sm font-semibold tracking-wide">
              {c.title}
            </h2>

            <p className="text-2xl font-bold mt-2">
              {c.count}
            </p>
          </div>
        ))}

      </div>

    </div>
  )
}