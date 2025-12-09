import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MembersList({ fullMemberList }) {
  if (!fullMemberList || fullMemberList.length === 0) {
    return <p className="text-gray-500 text-sm mt-3">No members added yet</p>;
  }

  const owner = fullMemberList[0];
  const members = fullMemberList.slice(1);

  console.log("owner:", owner)
  console.log("members:", members)
  
  return (
    <div className="mt-6 space-y-6">
      {/* Owner */}
      <div>
        <h2 className="text-lg font-bold mb-2">Owner</h2>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${owner.email}`}
            />
            <AvatarFallback>
              {owner.name}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">{owner.name}</p>
            <p className="text-sm text-gray-600">{owner.email}</p>
          </div>
        </div>
      </div>

      {/* Members */}
      <div>
        <h2 className="text-lg font-bold mb-2">Members</h2>

        {members.length === 0 ? (
          <p className="text-gray-500 text-sm">No members added yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {members.map((m) => (
              <div
                key={m._id}
                className="flex items-center gap-3 p-3 border rounded-lg shadow-sm bg-white"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${m.email}`}
                  />
                  <AvatarFallback>
                    {m.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
