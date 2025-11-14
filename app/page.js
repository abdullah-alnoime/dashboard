import { Hero, Navbar, Footer } from "@/components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
