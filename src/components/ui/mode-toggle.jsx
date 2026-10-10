import { useTheme } from "next-themes"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 text-sm border rounded"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  )
}