"use client"

import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TicketCard } from "./ticket-card"
import type { Ticket, TicketStatus, Project } from "@/features/kanban/schemas"
import { AddTicketDialog } from "./add-ticket-dialog"
import { useState } from "react"

interface KanbanColumnProps {
  id: TicketStatus
  title: string
  color: string
  tickets: Ticket[]
  onAddTicket?: (ticket: Omit<Ticket, "id" | "createdAt">) => void
  project?: Project
}

export function KanbanColumn({ id, title, color, tickets, onAddTicket, project }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id })
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="flex flex-col w-80 flex-shrink-0">
      <div className={`${color} rounded-t-lg px-4 py-3 border-b`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">{tickets.length}</span>
        </div>
      </div>

      <div ref={setNodeRef} className="flex-1 bg-white rounded-b-lg border border-t-0 min-h-[500px] p-3 space-y-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}

        {onAddTicket && (
          <>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-500 hover:text-gray-700 border-2 border-dashed border-gray-200 hover:border-gray-300"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add issue
            </Button>

            <AddTicketDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAdd={onAddTicket} project={project}/>
          </>
        )}
      </div>
    </div>
  )
}
