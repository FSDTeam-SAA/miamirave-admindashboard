"use client"

import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CategoryModalProps {
  open: boolean
  mode: "add" | "edit"
  data?: any
  onOpenChange: (open: boolean) => void
}

export default function CategoryModal({ open, mode, data, onOpenChange }: CategoryModalProps) {
  const [formData, setFormData] = useState({ name: "", description: "" })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({ name: data.name, description: data.description })
    } else {
      setFormData({ name: "", description: "" })
    }
  }, [mode, data, open])

  const createCategory = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/create-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed to create category")
      return response.json()
    },
    onSuccess: () => {
      toast.success("Category created successfully")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      onOpenChange(false)
    },
    onError: () => {
      toast.error("Failed to create category")
    },
  })

  const updateCategory = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/update-category/${data._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed to update category")
      return response.json()
    },
    onSuccess: () => {
      toast.success("Category updated successfully")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      onOpenChange(false)
    },
    onError: () => {
      toast.error("Failed to update category")
    },
  })

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required")
      return
    }
    if (mode === "add") {
      createCategory.mutate()
    } else {
      updateCategory.mutate()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Category" : "Edit Category"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter category description"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createCategory.isPending || updateCategory.isPending}
              className="bg-[#34813C] hover:bg-[#34813C]"
            >
              {createCategory.isPending || updateCategory.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
