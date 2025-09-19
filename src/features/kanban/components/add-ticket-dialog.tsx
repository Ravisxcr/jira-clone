"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Ticket, TicketPriority, Project } from "@/features/kanban/schemas"

interface AddTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (ticket: Omit<Ticket, "id" | "createdAt">) => void
  project?: Project
}

export function AddTicketDialog({ open, onOpenChange, onAdd, project }: AddTicketDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as TicketPriority,
    assignee: "John Doe",
    labels: "",
    storyPoints: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const ticket: Omit<Ticket, "id" | "createdAt"> = {
      title: formData.title,
      description: formData.description,
      status: "todo",
      priority: formData.priority,
      assignee: {
        name: formData.assignee,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      labels: formData.labels
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      storyPoints: formData.storyPoints ? Number.parseInt(formData.storyPoints) : undefined,
    }

    onAdd(ticket)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignee: "John Doe",
      labels: "",
      storyPoints: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter issue title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter issue description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: TicketPriority) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  {project?.members.map((member) => (
                    <SelectItem key={member.name} value={member.name}>
                      {member.name}
                    </SelectItem>
                  )) || (
                    <>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                      <SelectItem value="Alex Brown">Alex Brown</SelectItem>
                      <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="labels">Labels</Label>
              <Input
                id="labels"
                value={formData.labels}
                onChange={(e) => setFormData((prev) => ({ ...prev, labels: e.target.value }))}
                placeholder="frontend, backend, bug"
              />
            </div>

            <div>
              <Label htmlFor="storyPoints">Story Points</Label>
              <Input
                id="storyPoints"
                type="number"
                value={formData.storyPoints}
                onChange={(e) => setFormData((prev) => ({ ...prev, storyPoints: e.target.value }))}
                placeholder="1, 2, 3, 5, 8, 13"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Issue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
