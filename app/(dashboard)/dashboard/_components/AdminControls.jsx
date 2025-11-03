import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import {
  BookText,
  ChevronRightIcon,
  Folders,
  GraduationCap,
  Mails,
  Users,
} from "lucide-react";

export default function AdminControls() {
  const links = [
    {
      id: 1,
      address: "/admin/users",
      icon: <Users />,
      title: "User Management",
      description: "Manage users and roles",
    },
    {
      id: 2,
      address: "/admin/projects",
      icon: <Folders />,
      title: "Projects",
      description: "Manage projects",
    },
    {
      id: 3,
      address: "/admin/universities",
      icon: <GraduationCap />,
      title: "Universities",
      description: "Manage universities",
    },
    {
      id: 4,
      address: "/admin/courses",
      icon: <BookText />,
      title: "Courses",
      description: "Manage courses",
    },
    {
      id: 5,
      address: "/admin/messages",
      icon: <Mails />,
      title: "Messages",
      description: "View contact messages",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Admin Controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(({ id, address, icon, title, description }) => (
          <Item key={id} variant="outline">
            <ItemMedia variant="icon">{icon}</ItemMedia>
            <ItemContent>
              <ItemTitle className="text-lg font-bold">{title}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" asChild>
                <Link href={address}>
                  <ChevronRightIcon />
                </Link>
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
}
