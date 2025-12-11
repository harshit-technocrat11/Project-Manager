import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Trash2 } from "lucide-react";

export default function MembersList({ fullMemberList, onRemove }) {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-bold mb-2">Members</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fullMemberList.map((m) => (
          <div
            key={m._id}
            className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-white"
          >
            {/* LEFT: Member Info */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${m.email}`}
                />
                <AvatarFallback>
                  {m.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {m.name}{" "}
                  <span className="text-xs text-blue-600">{m.role}</span>
                </p>
                <p className="text-sm text-gray-500">{m.email}</p>
              </div>
            </div>

            {/* RIGHT: Remove button */}
            {m.role !== "owner👑" && (
              <button
                onClick={() => onRemove(m._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
