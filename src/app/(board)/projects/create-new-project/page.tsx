"use client";

import { ProjectForm } from "@/features/dashboard/project-form";

export default function CreateProjectPage() {
  return (
    <div className="marker:min-h-screen flex items-center justify-center bg-neutral-100">
      <ProjectForm />
    </div>
  );
}