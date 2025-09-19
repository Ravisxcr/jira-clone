export type TicketStatus = "todo" | "in-progress" | "review" | "done"
export type TicketPriority = "high" | "medium" | "low"

export interface Assignee {
  name: string
  avatar: string
}

export interface Ticket {
  id: string
  title: string
  description?: string
  status: TicketStatus
  priority: TicketPriority
  assignee: Assignee
  labels: string[]
  storyPoints?: number
  createdAt: string
}

export interface ProjectMember {
  name: string
  avatar: string
}

export interface Project {
  id: string
  name: string
  key: string
  description: string
  avatar: string
  lead: ProjectMember
  members: ProjectMember[]
  createdAt: string
}
