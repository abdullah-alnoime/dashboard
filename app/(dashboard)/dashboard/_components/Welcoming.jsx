import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Mail, UserCog } from "lucide-react";

export default function Welcoming({ session, isAdmin, data, loading }) {
  const {
    user: { name, email, role, emailVerified },
  } = session;
  const totalProjects = 12;
  const totalCourses = 12;
  const totalUniversities = 12;
  const totalMessages = 12;
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        Welcome, {name}!
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Mail />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-lg font-bold">Email</ItemTitle>
            <ItemDescription>{email}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <UserCog />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-lg font-bold">Role</ItemTitle>
            <ItemDescription>{role}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <BadgeCheck />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-lg font-bold">Status</ItemTitle>
            <ItemDescription>
              {emailVerified ? "Verified" : "Unverified"}
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
      {isAdmin && (
        <div>
          <h2 className="text-xl font-semibold my-4">Statistics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {loading.projectsLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    data.projects.length
                  )}
                </ItemTitle>
                <ItemDescription>
                  Number of projects you currently have
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {loading.universitiesLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    data.universities.length
                  )}
                </ItemTitle>
                <ItemDescription>
                  Number of universities you currently have
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {loading.coursesLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    data.courses.length
                  )}
                </ItemTitle>
                <ItemDescription>
                  Number of courses & certifications you currently have
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {loading.messagesLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    data.messages.length
                  )}
                </ItemTitle>
                <ItemDescription>
                  Number of messages you currently have
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </div>
      )}
    </div>
  );
}
