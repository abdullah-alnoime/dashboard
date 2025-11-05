"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {isPending ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-blue-600 hover:underline"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-blue-600 hover:underline"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </span>
            <br />
            with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive dashboard to manage your projects, education,
            courses, and connect with your audience. Everything you need in one
            place.
          </p>
          <div className="flex gap-4 justify-center">
            {session ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/signin"
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className="text-gray-600">
              Showcase your projects with detailed descriptions, tools used, and
              live demos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Education Tracking</h3>
            <p className="text-gray-600">
              Keep track of your universities and academic achievements with
              ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Course Certificates</h3>
            <p className="text-gray-600">
              Display your certifications and skills acquired from online
              courses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✉️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Contact Management</h3>
            <p className="text-gray-600">
              Receive and manage messages from visitors and potential clients.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Features (if logged in as admin) */}
      {session?.user?.role === "admin" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Admin Features</h2>
            <p className="text-gray-600">Powerful tools for administrators</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <span className="text-3xl mb-2 block">👥</span>
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-gray-600">
                Manage users, assign roles, and control access
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <span className="text-3xl mb-2 block">📝</span>
              <h3 className="font-semibold mb-2">Content Control</h3>
              <p className="text-sm text-gray-600">
                Full CRUD operations for all content types
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <span className="text-3xl mb-2 block">📊</span>
              <h3 className="font-semibold mb-2">Message Inbox</h3>
              <p className="text-sm text-gray-600">
                View and respond to all contact messages
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!session && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join now and start managing your portfolio professionally
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Portfolio Dashboard</h3>
              <p className="text-gray-400">
                Your all-in-one solution for managing your professional
                portfolio and connecting with your audience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {session ? (
                  <>
                    <li>
                      <Link href="/dashboard" className="hover:text-white">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile" className="hover:text-white">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-white">
                        Contact
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/signin" className="hover:text-white">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link href="/signup" className="hover:text-white">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Project Management</li>
                <li>Education Tracking</li>
                <li>Course Certificates</li>
                <li>Contact Management</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Portfolio Dashboard. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
