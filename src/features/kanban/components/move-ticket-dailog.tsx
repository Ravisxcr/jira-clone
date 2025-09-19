"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MessageSquare, User } from "lucide-react"
import type { Ticket, TicketStatus } from "@/features/kanban/schemas"

interface MoveTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pendingMove: {
    ticketId: string
    fromStatus: TicketStatus
    toStatus: TicketStatus
  } | null
  ticket: Ticket | null
  onConfirm: (moveData: MoveData) => void
  onCancel: () => void
}

interface MoveData {
  timeSpent?: string
  comment: string
  reason?: string
  assignee?: string
}

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  review: "In Review",
  blocked: "Blocked",
  done: "Done",
}

export function MoveTicketDialog({
  open,
  onOpenChange,
  pendingMove,
  ticket,
  onConfirm,
  onCancel,
}: MoveTicketDialogProps) {
  const [formData, setFormData] = useState<MoveData>({
    timeSpent: "",
    comment: "",
    reason: "",
    assignee: ticket?.assignee.name || "",
  })

  if (!pendingMove || !ticket) return null

  const isFromTodo = pendingMove.fromStatus === "todo"
  const isBlockedToDone = pendingMove.fromStatus === "review" && pendingMove.toStatus === "done"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.comment.trim()) {
      alert("Please provide a comment for this move")
      return
    }

    if (isFromTodo && !formData.timeSpent) {
      alert("Please provide estimated time when starting work")
      return
    }

    if (isBlockedToDone && !formData.reason) {
      alert("Please provide a reason for resolving the blocked issue")
      return
    }

    onConfirm(formData)

    // Reset form
    setFormData({
      timeSpent: "",
      comment: "",
      reason: "",
      assignee: ticket?.assignee.name || "",
    })
  }

  const getDialogTitle = () => {
    if (isFromTodo) {
      return "Start Work on Issue"
    }
    if (isBlockedToDone) {
      return "Resolve Blocked Issue"
    }
    return "Move Issue"
  }

  const getDialogDescription = () => {
    if (isFromTodo) {
      return "You're about to start work on this issue. Please provide the required information."
    }
    if (isBlockedToDone) {
      return "You're moving a blocked issue to done. Please explain how the blocker was resolved."
    }
    return `Moving issue from ${statusLabels[pendingMove.fromStatus]} to ${statusLabels[pendingMove.toStatus]}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        {/* Ticket Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Badge variant="outline" className="font-mono text-xs">
              {ticket.id}
            </Badge>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{ticket.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={ticket.assignee.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {ticket.assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{ticket.assignee.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Moving:</span>
                  <Badge variant="secondary" className="text-xs">
                    {statusLabels[pendingMove.fromStatus]}
                  </Badge>
                  <span>→</span>
                  <Badge variant="secondary" className="text-xs">
                    {statusLabels[pendingMove.toStatus]}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time Spent - Required when moving from Todo */}
          {isFromTodo && (
            <div>
              <Label htmlFor="timeSpent" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Estimated Time to Complete *</span>
              </Label>
              <Select
                value={formData.timeSpent}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, timeSpent: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select estimated time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="2h">2 hours</SelectItem>
                  <SelectItem value="4h">4 hours</SelectItem>
                  <SelectItem value="1d">1 day</SelectItem>
                  <SelectItem value="2d">2 days</SelectItem>
                  <SelectItem value="3d">3 days</SelectItem>
                  <SelectItem value="1w">1 week</SelectItem>
                  <SelectItem value="2w">2 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Reason - Required when moving from Blocked to Done */}
          {isBlockedToDone && (
            <div>
              <Label htmlFor="reason">How was the blocker resolved? *</Label>
              <Select
                value={formData.reason}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="external-dependency">External dependency resolved</SelectItem>
                  <SelectItem value="technical-solution">Technical solution found</SelectItem>
                  <SelectItem value="resource-available">Required resource became available</SelectItem>
                  <SelectItem value="requirement-clarified">Requirements clarified</SelectItem>
                  <SelectItem value="workaround-implemented">Workaround implemented</SelectItem>
                  <SelectItem value="other">Other (explain in comments)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Comment - Always required */}
          <div>
            <Label htmlFor="comment" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Comment *</span>
            </Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder={
                isFromTodo
                  ? "Describe your approach or any initial thoughts..."
                  : isBlockedToDone
                    ? "Explain how the issue was resolved..."
                    : "Add a comment about this move..."
              }
              rows={3}
              required
            />
          </div>

          {/* Assignee - Show for all moves */}
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Select
              value={formData.assignee}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, assignee: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                <SelectItem value="Alex Brown">Alex Brown</SelectItem>
                <SelectItem value="Emma Davis">Emma Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isFromTodo ? "Start Work" : isBlockedToDone ? "Resolve & Complete" : "Move Issue"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
