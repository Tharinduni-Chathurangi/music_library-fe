export default function Table({ columns, data }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b dark:border-gray-800">
            {columns.map((col, i) => (
              <th key={i} className="p-3 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b dark:border-gray-800">
              {Object.values(row).map((cell, j) => (
                <td key={j} className="p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}