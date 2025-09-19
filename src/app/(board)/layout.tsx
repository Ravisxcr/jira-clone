"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="mx-auto max-w-screen-2xl px-6 py-4 flex justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Image src="/jira-logo.svg" alt="Jira Logo" width={25} height={25} />

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-700 font-medium">
              <Button asChild variant="ghost">
                <Link
                  href="/projects"
                  className={pathname === "/projects" ? "text-blue-600 font-semibold" : ""}
                >
                  Projects
                </Link>
              </Button>

              <Button asChild variant="ghost">
                <Link
                  href="/issues"
                  className={pathname === "/issues" ? "text-blue-600 font-semibold" : ""}
                >
                  Issues
                </Link>
              </Button>

              <Button asChild variant="ghost">
                <Link
                  href="/boards"
                  className={pathname === "/boards" ? "text-blue-600 font-semibold" : ""}
                >
                  Boards
                </Link>
              </Button>
              <Button variant="primary">
                <Link href={"/create-new"}>Create</Link>
            </Button>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            

            {/* Profile Avatar */}
            <Avatar>
              <AvatarImage src="/profile.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center mt-20 md:pt-1">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
