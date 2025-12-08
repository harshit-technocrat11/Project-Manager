import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Join us and start managing your projects efficiently.
        </p>

        <RegisterForm />

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
