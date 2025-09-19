import { useDraggable } from "@dnd-kit/core"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Ticket } from "@/features/kanban/schemas"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface TicketCardProps {
  ticket: Ticket
}

const priorityIcons = {
  high: <ArrowUp className="w-3 h-3 text-red-500" />,
  medium: <Minus className="w-3 h-3 text-yellow-500" />,
  low: <ArrowDown className="w-3 h-3 text-green-500" />,
}

const priorityColors = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
}

export function TicketCard({ ticket }: TicketCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ticket.id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab
        border-l-4 ${priorityColors[ticket.priority]}
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">{ticket.id}</span>
        {priorityIcons[ticket.priority]}
      </div>

      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{ticket.title}</h4>

      {ticket.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>}

      <div className="flex flex-wrap gap-1 mb-3">
        {ticket.labels.map((label) => (
          <Badge key={label} variant="secondary" className="text-xs">
            {label}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={ticket.assignee.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">
              {ticket.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {ticket.storyPoints && (
          <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">{ticket.storyPoints}</div>
        )}
      </div>
    </div>
  )
}
