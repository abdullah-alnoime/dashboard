export default function AdminControls() {
  const links = [
    {
      href: "/admin/users",
      color: "blue",
      icon: "👥",
      title: "User Management",
      desc: "Manage users and roles",
    },
    {
      href: "/admin/projects",
      color: "green",
      icon: "🚀",
      title: "Projects",
      desc: "Manage projects",
    },
    {
      href: "/admin/universities",
      color: "purple",
      icon: "🎓",
      title: "Universities",
      desc: "Manage universities",
    },
    {
      href: "/admin/courses",
      color: "yellow",
      icon: "📚",
      title: "Courses",
      desc: "Manage courses",
    },
    {
      href: "/admin/messages",
      color: "red",
      icon: "✉️",
      title: "Messages",
      desc: "View contact messages",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">🔐 Admin Controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`p-4 border-2 border-${link.color}-200 rounded hover:border-${link.color}-400 hover:bg-${link.color}-50 transition`}
          >
            <h4 className={`font-semibold text-${link.color}-700 mb-2`}>
              {link.icon} {link.title}
            </h4>
            <p className="text-sm text-gray-600">{link.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
