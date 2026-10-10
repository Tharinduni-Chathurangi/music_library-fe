import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import api from "@/lib/api"
import Modal from "@/components/ui/Modal"

export default function Artists() {
  const [artists, setArtists] = useState([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: "",
    country: "",
    bio: "",
    image: "",
  })

  const fetchArtists = async () => {
    try {
      const res = await api.get("/artists")
      setArtists(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  const openAdd = () => {
    setForm({
      name: "",
      country: "",
      bio: "",
      image: "",
    })
    setEditId(null)
    setOpen(true)
  }

  const openEdit = (artist) => {
    setForm({
      name: artist.name || "",
      country: artist.country || "",
      bio: artist.bio || "",
      image: artist.image || "",
    })

    setEditId(artist.id)
    setOpen(true)
  }

  const handleSave = async () => {
    try {
      if (editId) {
        await api.put(`/artists/${editId}`, form)
      } else {
        await api.post("/artists", form)
      }

      setOpen(false)
      fetchArtists()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this artist?")) return

    try {
      await api.delete(`/artists/${id}`)
      fetchArtists()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Artists
        </h1>

        <button
          onClick={openAdd}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Artist
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">IMAGE</th>
              <th className="p-3 text-left">NAME</th>
              <th className="p-3 text-left">COUNTRY</th>
              <th className="p-3 text-left">ACTIONS</th>
            </tr>
          </thead>

          <tbody>

            {artists.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No Artists Found
                </td>
              </tr>
            )}

            {artists.map((artist) => (

              <tr
                key={artist.id}
                className="border-t dark:border-zinc-800"
              >
                <td className="p-3">
                  {artist.id}
                </td>

                <td className="p-3">
                  <img
                    src={
                      artist.image ||
                      "https://placehold.co/60x60?text=Artist"
                    }
                    alt={artist.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                </td>

                <td className="p-3 font-medium">
                  {artist.name}
                </td>

                <td className="p-3">
                  {artist.country}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">

                    <button
                      onClick={() => openEdit(artist)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(artist.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Modal
        open={open}
        title={editId ? "Edit Artist" : "Add Artist"}
        onClose={() => setOpen(false)}
      >

        <div className="space-y-4">

          <input
            className="w-full border rounded p-2"
            placeholder="Artist Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded p-2"
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value,
              })
            }
          />

          <textarea
            className="w-full border rounded p-2"
            placeholder="Biography"
            rows={4}
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded p-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />

          {form.image && (
            <div className="flex justify-center">
              <img
                src={form.image}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </Modal>

    </div>
  )
}