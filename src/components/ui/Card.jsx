export default function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}