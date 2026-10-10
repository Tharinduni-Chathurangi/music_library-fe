import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import api from "@/lib/api"
import Modal from "@/components/ui/Modal"

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const [songs, setSongs] = useState([])

  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: "",
    cover: "",
    songIds: [],
  })

  // FETCH
  const fetchData = async () => {
    const [p, s] = await Promise.all([
      api.get("/playlists"),
      api.get("/songs"),
    ])

    setPlaylists(p.data.data)
    setSongs(s.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // OPEN ADD
  const openAdd = () => {
    setForm({
      name: "",
      cover: "",
      songIds: [],
    })
    setEditId(null)
    setOpen(true)
  }

  // OPEN EDIT
  const openEdit = (p) => {
    setForm({
      name: p.name,
      cover: p.cover || "",
      songIds: p.songs?.map((s) => s.songId || s.id) || [],
    })
    setEditId(p.id)
    setOpen(true)
  }

  // TOGGLE SONG
  const toggleSong = (id) => {
    setForm((prev) => ({
      ...prev,
      songIds: prev.songIds.includes(id)
        ? prev.songIds.filter((s) => s !== id)
        : [...prev.songIds, id],
    }))
  }

  // SAVE
  const handleSave = async () => {
  try {
    const payload = {
      name: form.name,
      cover: form.cover,
      songIds: form.songIds,
    }

    if (editId) {
      await api.put(`/playlists/${editId}`, payload)
    } else {
      await api.post("/playlists", payload)
    }

    setOpen(false)
    fetchData()
  } catch (err) {
    console.error("SAVE ERROR:", err)
  }
}

  // DELETE
  const handleDelete = async (id) => {
    await api.delete(`/playlists/${id}`)
    fetchData()
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-between">
        <h1 className="text-xl font-bold">PLAYLISTS</h1>

        <button
          onClick={openAdd}
          className="bg-cyan-500 text-white px-4 py-2 rounded"
        >
          + ADD
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white dark:bg-zinc-900 text-sm">
        <thead className="bg-gray-200 dark:bg-zinc-800">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">NAME</th>
            <th className="p-3">SONGS</th>
            <th className="p-3">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {playlists.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.name}</td>

              <td className="p-3 text-xs">
                {p.songs?.map((s) => s.song?.name || s.name).join(", ")}
              </td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <Modal
        open={open}
        title={editId ? "Edit Playlist" : "Add Playlist"}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">

          <input
            className="w-full border p-2"
            placeholder="Playlist Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full border p-2"
            placeholder="Cover URL"
            value={form.cover}
            onChange={(e) =>
              setForm({ ...form, cover: e.target.value })
            }
          />

          {/* SONG SELECTOR */}
          <div className="border p-2 max-h-40 overflow-auto">
            <p className="font-semibold mb-2">Select Songs</p>

            {songs.map((s) => (
              <label key={s.id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.songIds.includes(s.id)}
                  onChange={() => toggleSong(s.id)}
                />
                {s.name}
              </label>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Save
          </button>

        </div>
      </Modal>

    </div>
  )
}