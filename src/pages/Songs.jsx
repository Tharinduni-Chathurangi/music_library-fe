import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import api from "@/lib/api"
import Modal from "@/components/ui/Modal"

export default function Songs() {
  const [songs, setSongs] = useState([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: "",
    releaseDate: "",
    artistId: "",
    albumId: "",
    genreId: "",
  })

  // FETCH
  const fetchSongs = async () => {
    const res = await api.get("/songs")
    setSongs(res.data.data)
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  // OPEN ADD
  const openAdd = () => {
    setForm({
      name: "",
      releaseDate: "",
      artistId: "",
      albumId: "",
      genreId: "",
    })
    setEditId(null)
    setOpen(true)
  }

  // OPEN EDIT
  const openEdit = (song) => {
    setForm({
      name: song.name,
      releaseDate: song.releaseDate?.split("T")[0] || "",
      artistId: song.artistId,
      albumId: song.albumId || "",
      genreId: song.genreId || "",
    })
    setEditId(song.id)
    setOpen(true)
  }

  // SAVE
  const handleSave = async () => {
  const payload = {
    ...form,
    artistId: Number(form.artistId),
    albumId: form.albumId ? Number(form.albumId) : null,
    genreId: form.genreId ? Number(form.genreId) : null,
  };

  if (editId) {
    await api.put(`/songs/${editId}`, payload);
  } else {
    await api.post("/songs", payload);
  }

  setOpen(false);
  fetchSongs();
};

  // DELETE
  const handleDelete = async (id) => {
    await api.delete(`/songs/${id}`)
    fetchSongs()
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">SONGS</h1>

        <button
          onClick={openAdd}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
        >
          + ADD
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 dark:bg-zinc-800 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">NAME</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        title={editId ? "Edit Song" : "Add Song"}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">

          <input
            className="w-full border p-2"
            placeholder="Song Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full border p-2"
            value={form.releaseDate}
            onChange={(e) =>
              setForm({ ...form, releaseDate: e.target.value })
            }
          />

          <input
            className="w-full border p-2"
            placeholder="Artist ID"
            value={form.artistId}
            onChange={(e) =>
              setForm({ ...form, artistId: e.target.value })
            }
          />

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