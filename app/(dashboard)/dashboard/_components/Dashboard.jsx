import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  AdminControls,
  DashboardHeader,
  DashboardTabs,
  Welcoming,
} from "./dashboard";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Welcoming />
          <AdminControls />
          <DashboardTabs />
        </main>
      </div>
    </ProtectedRoute>
  );
}
