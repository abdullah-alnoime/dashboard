import Link from "next/link";

export default function ForgotPasswordLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-4 p-8 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center">
          <Link href="/signin" className="text-gray-600 hover:underline block">
            Sign in
          </Link>
          <Link href="/" className="text-gray-600 hover:underline block">
            Home
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
