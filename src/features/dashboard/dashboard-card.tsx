"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DottedSeperator } from "@/components/dotted-seperator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiPlus } from "react-icons/fi";
import { FaProjectDiagram, FaTasks } from "react-icons/fa";

export const DashboardCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none bg-white">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <div className="flex flex-col items-center">
          <Avatar className="w-16 h-16 mb-4">
            <AvatarImage src="/profile.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Welcome, John Doe!</CardTitle>
          <p className="text-sm text-muted-foreground">Here's a quick overview of your work</p>
        </div>
      </CardHeader>

      <div className="px-7 mb-2">
        <DottedSeperator />
      </div>

      <CardContent className="p-7 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/projects">
            <Button variant="outline" className="w-full justify-start">
              <FaProjectDiagram className="mr-2" />
              View Projects
            </Button>
          </Link>

          <Link href="/issues">
            <Button variant="outline" className="w-full justify-start">
              <FaTasks className="mr-2" />
              View Issues
            </Button>
          </Link>
        </div>

        <Button size="lg" className="w-full mt-4">
          <FiPlus className="mr-2" />
          Create New Task
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeperator />
      </div>

      <CardContent className="p-7 text-sm text-center text-muted-foreground">
        Need help?{" "}
        <Link href="/support">
          <span className="text-blue-700">Contact Support</span>
        </Link>
      </CardContent>
    </Card>
  );
};
