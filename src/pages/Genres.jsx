import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import api from "@/lib/api"
import Modal from "@/components/ui/Modal"

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: "",
  })

  const fetchGenres = async () => {
    const res = await api.get("/genres")
    setGenres(res.data.data)
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  const openAdd = () => {
    setForm({ name: "" })
    setEditId(null)
    setOpen(true)
  }

  const openEdit = (g) => {
    setForm({ name: g.name })
    setEditId(g.id)
    setOpen(true)
  }

  const handleSave = async () => {
    if (editId) {
      await api.put(`/genres/${editId}`, form)
    } else {
      await api.post("/genres", form)
    }

    setOpen(false)
    fetchGenres()
  }

  const handleDelete = async (id) => {
    await api.delete(`/genres/${id}`)
    fetchGenres()
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-between">
        <h1 className="text-xl font-bold">GENRES</h1>

        <button
          onClick={openAdd}
          className="bg-cyan-500 text-white px-4 py-2 rounded"
        >
          + ADD
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-xl">
        <table className="w-full text-sm">

          <thead className="bg-gray-200 dark:bg-zinc-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">NAME</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {genres.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="p-3">{g.id}</td>
                <td className="p-3">{g.name}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEdit(g)}
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(g.id)}
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

      <Modal
        open={open}
        title={editId ? "Edit Genre" : "Add Genre"}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">

          <input
            className="w-full border p-2"
            placeholder="Genre Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
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