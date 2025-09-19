"use client"

import * as React from "react"
import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  BarChart3,
  Kanban,
  Clock,
  CheckCircle2,
  AlertCircle,
  Circle,
  TrendingUp,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Mock data
const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    key: "ECP",
    description: "Building a modern e-commerce platform with React and Node.js",
    status: "In Progress",
    progress: 65,
    lead: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "SC" },
    members: [
      { name: "John Doe", avatar: "/placeholder.svg?height=24&width=24", initials: "JD" },
      { name: "Jane Smith", avatar: "/placeholder.svg?height=24&width=24", initials: "JS" },
      { name: "Mike Johnson", avatar: "/placeholder.svg?height=24&width=24", initials: "MJ" },
    ],
    totalIssues: 45,
    completedIssues: 29,
    category: "Software",
    priority: "High",
    dueDate: "2024-03-15",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Mobile Banking App",
    key: "MBA",
    description: "Secure mobile banking application with biometric authentication",
    status: "Planning",
    progress: 15,
    lead: { name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "DW" },
    members: [
      { name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24", initials: "AB" },
      { name: "Bob Davis", avatar: "/placeholder.svg?height=24&width=24", initials: "BD" },
    ],
    totalIssues: 32,
    completedIssues: 5,
    category: "Mobile",
    priority: "Critical",
    dueDate: "2024-04-20",
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    key: "DAD",
    description: "Real-time analytics dashboard for business intelligence",
    status: "In Progress",
    progress: 80,
    lead: { name: "Emily Rodriguez", avatar: "/placeholder.svg?height=32&width=32", initials: "ER" },
    members: [
      { name: "Chris Lee", avatar: "/placeholder.svg?height=24&width=24", initials: "CL" },
      { name: "Diana Park", avatar: "/placeholder.svg?height=24&width=24", initials: "DP" },
      { name: "Frank Miller", avatar: "/placeholder.svg?height=24&width=24", initials: "FM" },
      { name: "Grace Kim", avatar: "/placeholder.svg?height=24&width=24", initials: "GK" },
    ],
    totalIssues: 28,
    completedIssues: 22,
    category: "Analytics",
    priority: "Medium",
    dueDate: "2024-02-28",
    lastUpdated: "30 minutes ago",
  },
  {
    id: 4,
    name: "Customer Support Portal",
    key: "CSP",
    description: "Self-service customer support portal with ticketing system",
    status: "Done",
    progress: 100,
    lead: { name: "Alex Thompson", avatar: "/placeholder.svg?height=32&width=32", initials: "AT" },
    members: [
      { name: "Helen Chang", avatar: "/placeholder.svg?height=24&width=24", initials: "HC" },
      { name: "Ivan Petrov", avatar: "/placeholder.svg?height=24&width=24", initials: "IP" },
    ],
    totalIssues: 18,
    completedIssues: 18,
    category: "Support",
    priority: "Low",
    dueDate: "2024-01-15",
    lastUpdated: "1 week ago",
  },
  {
    id: 5,
    name: "AI Chatbot Integration",
    key: "ACI",
    description: "Intelligent chatbot for customer service automation",
    status: "In Progress",
    progress: 40,
    lead: { name: "Lisa Wang", avatar: "/placeholder.svg?height=32&width=32", initials: "LW" },
    members: [
      { name: "Jack Wilson", avatar: "/placeholder.svg?height=24&width=24", initials: "JW" },
      { name: "Kate Brown", avatar: "/placeholder.svg?height=24&width=24", initials: "KB" },
      { name: "Leo Garcia", avatar: "/placeholder.svg?height=24&width=24", initials: "LG" },
    ],
    totalIssues: 35,
    completedIssues: 14,
    category: "AI/ML",
    priority: "High",
    dueDate: "2024-05-10",
    lastUpdated: "4 hours ago",
  },
  {
    id: 6,
    name: "Security Audit System",
    key: "SAS",
    description: "Automated security scanning and vulnerability assessment",
    status: "Planning",
    progress: 5,
    lead: { name: "Mark Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "MJ" },
    members: [{ name: "Nina Patel", avatar: "/placeholder.svg?height=24&width=24", initials: "NP" }],
    totalIssues: 42,
    completedIssues: 2,
    category: "Security",
    priority: "Critical",
    dueDate: "2024-06-30",
    lastUpdated: "3 days ago",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "Sarah Chen",
    action: "updated issue ECP-123",
    project: "E-commerce Platform",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: "David Wilson",
    action: "created new epic MBA-45",
    project: "Mobile Banking App",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    action: "completed sprint DAD-Sprint-5",
    project: "Data Analytics Dashboard",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "Lisa Wang",
    action: "assigned ACI-67 to Jack Wilson",
    project: "AI Chatbot Integration",
    time: "2 hours ago",
  },
]



function getStatusIcon(status: string) {
  switch (status) {
    case "Done":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "Planning":
      return <Circle className="h-4 w-4 text-gray-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800 border-green-200"
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Planning":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function ProjectDashboard() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.status === "In Progress").length
  const completedProjects = projects.filter((p) => p.status === "Done").length
  const totalIssues = projects.reduce((sum, p) => sum + p.totalIssues, 0)
  const completedIssues = projects.reduce((sum, p) => sum + p.completedIssues, 0)

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <h1 className="text-lg font-semibold">Project Dashboard</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Kanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+1</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedProjects}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+1</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Issue Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round((completedIssues / totalIssues) * 100)}%</div>
                <p className="text-xs text-muted-foreground">
                  {completedIssues} of {totalIssues} issues completed
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Projects Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Projects</CardTitle>
                    <Button asChild>
                      <Link href={usePathname() + "/create-new-project"}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Project
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>Manage and track your project progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Project Cards */}
                  <div className="space-y-4">
                    {filteredProjects.map((project) => (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{project.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {project.key}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {project.members.length + 1} members
                                </div>
                                <div className="flex items-center gap-1">
                                  <Circle className="h-4 w-4" />
                                  {project.completedIssues}/{project.totalIssues} issues
                                </div>
                                <div>Due: {project.dueDate}</div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Project</DropdownMenuItem>
                                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(project.status)}>
                                {getStatusIcon(project.status)}
                                {project.status}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(project.priority)}>
                                {project.priority}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">Updated {project.lastUpdated}</div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={project.lead.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{project.lead.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">Lead: {project.lead.name}</span>
                            </div>
                            <div className="flex -space-x-2">
                              {project.members.slice(0, 3).map((member, index) => (
                                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                                </Avatar>
                              ))}
                              {project.members.length > 3 && (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                                  +{project.members.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates across all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.project} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
