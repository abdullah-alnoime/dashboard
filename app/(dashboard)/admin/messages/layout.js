import { AdminRoute } from "@/components/auth/AdminRoute";
import { MessagesWrapper } from "./_components";

export default function MessagesLayout({ children }) {
  return (
    <AdminRoute>
      <MessagesWrapper>{children}</MessagesWrapper>;
    </AdminRoute>
  );
}
