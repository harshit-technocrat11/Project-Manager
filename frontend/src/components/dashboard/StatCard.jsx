

export default function StatCard({ title, value, desc, icon }) {
  return (
    <div className="p-6 rounded-xl shadow-md border bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>

      <p className="text-4xl font-bold mt-4">{value}</p>

      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}
