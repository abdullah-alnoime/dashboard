"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersHeader({ setDebouncedSearch }) {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button className="cursor-pointer" asChild>
          <Link href="users/create">Add user</Link>
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users by email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </>
  );
}
