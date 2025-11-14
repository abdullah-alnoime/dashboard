import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MessageForm } from "./_components";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 grid place-items-center">
      <ProtectedRoute>
        <div className="w-full max-w-xl p-5 flex justify-center items-center">
          <div className="max-w-3xl w-full">
            <MessageForm />
          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
