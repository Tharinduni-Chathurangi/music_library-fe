import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import api from "@/lib/api"
import Modal from "@/components/ui/Modal"

export default function Albums() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    title: "",
    cover: "",
    artistId: "",
  })

  const fetchData = async () => {
    const [a, ar] = await Promise.all([
      api.get("/albums"),
      api.get("/artists"),
    ])

    setAlbums(a.data.data)
    setArtists(ar.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openAdd = () => {
    setForm({ title: "", cover: "", artistId: "" })
    setEditId(null)
    setOpen(true)
  }

  const openEdit = (al) => {
    setForm({
      title: al.title,
      cover: al.cover || "",
      artistId: al.artistId,
    })
    setEditId(al.id)
    setOpen(true)
  }

  const handleSave = async () => {
    if (editId) {
      await api.put(`/albums/${editId}`, form)
    } else {
      await api.post("/albums", form)
    }

    setOpen(false)
    fetchData()
  }

  const handleDelete = async (id) => {
    await api.delete(`/albums/${id}`)
    fetchData()
  }



const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch('http://localhost:3001/albums', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      artistId: Number(artistId),
    }),
  });

  const data = await res.json();
  console.log(data);
};


  return (
    <div className="space-y-4">

      <div className="flex justify-between">
        <h1 className="font-bold text-xl">ALBUMS</h1>

        <button
          onClick={openAdd}
          className="bg-cyan-500 text-white px-4 py-2 rounded"
        >
          + ADD
        </button>
      </div>

      <table className="w-full bg-white dark:bg-zinc-900">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>ARTIST</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {albums.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.title}</td>
              <td>{a.artist?.name}</td>

              <td className="flex gap-2">
                <button onClick={() => openEdit(a)}>
                  <Pencil />
                </button>

                <button onClick={() => handleDelete(a.id)}>
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} title="Album" onClose={() => setOpen(false)}>
        <div className="space-y-3">

          <input
            placeholder="Title"
            className="border p-2 w-full"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <select
            className="border p-2 w-full"
            value={form.artistId}
            onChange={(e) =>
              setForm({ ...form, artistId: e.target.value })
            }
          >
            <option>Select Artist</option>
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white w-full p-2"
          >
            Save
          </button>

        </div>
      </Modal>
    </div>
  )
}