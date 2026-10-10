import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"

import { Outlet } from "react-router-dom";

import Dashboard from "./pages/Dashboard"
import Songs from "./pages/Songs"
import Artists from "./pages/Artists"
import Albums from "./pages/Albums"
import Genres from "./pages/Genres"
import Playlists from "./pages/Playlists"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/songs" element={<Songs />} />
  <Route path="/artists" element={<Artists />} />
  <Route path="/albums" element={<Albums />} />
  <Route path="/genres" element={<Genres />} />
  <Route path="/playlists" element={<Playlists />} />
</Routes>
      </Layout>
    </BrowserRouter>
  )
}