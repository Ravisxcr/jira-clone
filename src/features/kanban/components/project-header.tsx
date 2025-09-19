import { Calendar, Users, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/features/kanban/schemas"

interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={project.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-blue-600 text-white font-bold text-lg">
                {project.key.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                <Badge variant="outline" className="font-mono text-xs">
                  {project.key}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4 max-w-2xl">{project.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Lead:</span>
                  <div className="flex items-center space-x-1">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={project.lead.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {project.lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-700">{project.lead.name}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Team Members</span>
              </div>
              <div className="flex -space-x-2">
                {project.members.slice(0, 5).map((member, index) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-white">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.members.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">+{project.members.length - 5}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
