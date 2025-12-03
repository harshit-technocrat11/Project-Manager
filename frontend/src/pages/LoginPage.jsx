// import React from 'react'

// export default function LoginPage() {
//   return <h1 className="text-2xl font-bold">Login</h1>;
// }
import { LoginForm } from "@/components/auth/LoginForm";

export default function Page() {
  return (
    <div className="flex bg-gray-300 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl mb-10 font-bold justify-self-center">
           PROJECT MANAGER
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
