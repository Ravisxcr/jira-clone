"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { KanbanColumn } from "./kanban-column"
import { TicketCard } from "./ticket-card"
import { MoveTicketDialog } from "./move-ticket-dailog"
import type { Ticket, TicketStatus, Project } from "@/features/kanban/schemas"

interface KanbanBoardProps {
  tickets: Ticket[]
  onTicketMove: (ticketId: string, newStatus: TicketStatus) => void
  onTicketAdd: (ticket: Omit<Ticket, "id" | "createdAt">) => void
  project: Project
}

const columns = [
  {
    id: "todo",
    title: "Todo",
    color: "bg-red-500",
  },
  {
    id: "inProgress",
    title: "In Progress",
    color: "bg-blue-500",
  },
  {
    id: "review",
    title: "Blocked",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-500",
  },
]

export function KanbanBoard({ tickets, onTicketMove, onTicketAdd, project }: KanbanBoardProps) {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)
  const [pendingMove, setPendingMove] = useState<{
    ticketId: string
    fromStatus: TicketStatus
    toStatus: TicketStatus
  } | null>(null)
  const [showMoveDialog, setShowMoveDialog] = useState(false)

  const handleDragStart = (event: DragStartEvent) => {
    const ticket = tickets.find((t) => t.id === event.active.id)
    setActiveTicket(ticket || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveTicket(null)
      return
    }

    const ticketId = active.id as string
    const newStatus = over.id as TicketStatus

    const ticket = tickets.find((t) => t.id === ticketId)

    if (!ticket) {
      setActiveTicket(null)
      return
    }

    // Check if move requires form data
    const requiresForm =
      (ticket.status === "todo" && newStatus !== "todo") || // Moving from Todo
      (ticket.status === "review" && newStatus === "done") // Moving from Blocked to Done

    // Check if move is not allowed
    const isNotAllowed = ticket.status !== "todo" && newStatus === "todo" // Can't revert to Todo

    if (isNotAllowed) {
      alert("Cannot move ticket back to Todo once it has been started")
      setActiveTicket(null)
      return
    }

    if (requiresForm) {
      setPendingMove({
        ticketId,
        fromStatus: ticket.status,
        toStatus: newStatus,
      })
      setShowMoveDialog(true)
    } else {
      onTicketMove(ticketId, newStatus)
    }

    setActiveTicket(null)
  }

  const getTicketsByStatus = (status: TicketStatus) => {
    return tickets.filter((ticket) => ticket.status === status)
  }

  const handleMoveConfirm = (moveData: any) => {
    if (pendingMove) {
      onTicketMove(pendingMove.ticketId, pendingMove.toStatus)
      setPendingMove(null)
      setShowMoveDialog(false)
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id as TicketStatus}
            title={column.title}
            color={column.color}
            tickets={getTicketsByStatus(column.id as TicketStatus)}
            onAddTicket={column.id === "todo" ? onTicketAdd : undefined}
            project={project}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTicket ? (
          <div className="rotate-3 opacity-90">
            <TicketCard ticket={activeTicket} />
          </div>
        ) : null}
      </DragOverlay>
      <MoveTicketDialog
        open={showMoveDialog}
        onOpenChange={setShowMoveDialog}
        pendingMove={pendingMove}
        ticket={pendingMove ? tickets.find((t) => t.id === pendingMove.ticketId) ?? null : null}
        onConfirm={handleMoveConfirm}
        onCancel={() => {
          setPendingMove(null)
          setShowMoveDialog(false)
        }}
      />
    </DndContext>
  )
}
