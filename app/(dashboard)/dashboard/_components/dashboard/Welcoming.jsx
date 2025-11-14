"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourses } from "@/hooks/useCourses";
import { useMessages } from "@/hooks/useMessages";
import { usePermissions } from "@/hooks/usePermissions";
import { useProjects } from "@/hooks/useProjects";
import { useUniversities } from "@/hooks/useUniversities";
import { BadgeCheck, Mail, UserCog } from "lucide-react";

export default function Welcoming() {
  const { permissions, session } = usePermissions();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: universities, isLoading: universitiesLoading } =
    useUniversities();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: messages, isLoading: messagesLoading } = useMessages();
  const {
    user: { name, email, role, emailVerified },
  } = session;
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
      {permissions.isAdmin && (
        <div>
          <h2 className="text-xl font-semibold my-4">Statistics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {projectsLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    projects?.length
                  )}
                </ItemTitle>
                <ItemDescription className="text-center">
                  Total number of projects you currently have
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {universitiesLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    universities?.length
                  )}
                </ItemTitle>
                <ItemDescription className="text-center">
                  Total number of university degrees you currently have
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {coursesLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    courses?.length
                  )}
                </ItemTitle>
                <ItemDescription className="text-center">
                  Total number of courses you have currently taken
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent className="items-center">
                <ItemTitle className="text-6xl text-center font-bold">
                  {messagesLoading ? (
                    <Skeleton className="w-[40px] h-[60px]" />
                  ) : (
                    messages?.length
                  )}
                </ItemTitle>
                <ItemDescription className="text-center">
                  Total number of messages you have received so far
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </div>
      )}
    </div>
  );
}
