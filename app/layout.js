import { Toaster } from "sonner";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Better Auth App",
  description: "Full-stack authentication with Better Auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster position="top-center" expand richColors />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
