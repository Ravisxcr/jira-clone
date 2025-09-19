"use client"

import { useState } from "react"
import { KanbanBoard } from "@/features/kanban/components/kanban-board"

import type { Ticket, TicketStatus, Project } from "@/features/kanban/schemas"
import { ProjectHeader } from "@/features/kanban/components/project-header"

// Add project data before initialTickets
const project: Project = {
  id: "ECOM",
  name: "E-Commerce Platform",
  key: "ECOM",
  description: "Next-generation e-commerce platform with modern features",
  avatar: "/placeholder.svg?height=40&width=40",
  lead: {
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  members: [
    { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Alex Brown", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
  ],
  createdAt: "2024-01-01",
}

// Mock data
const initialTickets: Ticket[] = [
  {
    id: "PROJ-1",
    title: "Implement user authentication",
    description: "Add login and registration functionality with JWT tokens",
    status: "todo",
    priority: "high",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    labels: ["backend", "security"],
    storyPoints: 8,
    createdAt: "2024-01-15",
  },
  {
    id: "PROJ-2",
    title: "Design landing page",
    description: "Create responsive landing page with hero section and features",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    labels: ["frontend", "design"],
    storyPoints: 5,
    createdAt: "2024-01-14",
  },
  {
    id: "PROJ-3",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    labels: ["devops", "automation"],
    storyPoints: 13,
    createdAt: "2024-01-13",
  },
  {
    id: "PROJ-4",
    title: "Fix mobile responsive issues",
    description: "Resolve layout problems on mobile devices",
    status: "review",
    priority: "medium",
    assignee: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    labels: ["frontend", "bug"],
    storyPoints: 3,
    createdAt: "2024-01-12",
  },
  {
    id: "PROJ-5",
    title: "Database optimization",
    description: "Optimize database queries and add proper indexing",
    status: "done",
    priority: "low",
    assignee: {
      name: "Alex Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    labels: ["backend", "performance"],
    storyPoints: 8,
    createdAt: "2024-01-10",
  },
  {
    id: "PROJ-6",
    title: "Write API documentation",
    description: "Create comprehensive API documentation using Swagger",
    status: "todo",
    priority: "low",
    assignee: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    labels: ["documentation"],
    storyPoints: 5,
    createdAt: "2024-01-16",
  },
]

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)

  const handleTicketMove = (ticketId: string, newStatus: TicketStatus) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket)))
  }

  const handleTicketAdd = (ticket: Omit<Ticket, "id" | "createdAt">) => {
    const newTicket: Ticket = {
      ...ticket,
      id: `PROJ-${tickets.length + 1}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTickets((prev) => [...prev, newTicket])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <ProjectHeader project={project} />
        </div>
        <KanbanBoard
          tickets={tickets}
          onTicketMove={handleTicketMove}
          onTicketAdd={handleTicketAdd}
          project={project}
        />
      </main>
    </div>
  )
}
