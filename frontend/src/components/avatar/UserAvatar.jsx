

export default function UserAvatar({ name }) {
  const firstLetter = name ? name[0].toUpperCase() : "?";

  return (
    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
      {firstLetter}
    </div>
  );
}
