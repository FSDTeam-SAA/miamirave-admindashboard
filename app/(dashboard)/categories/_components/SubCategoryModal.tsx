"use client"

import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SubCategoryModalProps {
  open: boolean
  mode: "add" | "edit"
  categoryId?: string
  data?: any
  onOpenChange: (open: boolean) => void
}

export default function SubCategoryModal({ open, mode, categoryId, data, onOpenChange }: SubCategoryModalProps) {
  const [formData, setFormData] = useState({ name: "", description: "" })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({ name: data.name, description: data.description })
    } else {
      setFormData({ name: "", description: "" })
    }
  }, [mode, data, open])

  const createSubCategory = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sub-category/create-sub-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: categoryId,
        }),
      })
      if (!response.ok) throw new Error("Failed to create sub-category")
      return response.json()
    },
    onSuccess: () => {
      toast.success("Sub-category created successfully")
      queryClient.invalidateQueries({ queryKey: ["subcategories", categoryId] })
      onOpenChange(false)
    },
    onError: () => {
      toast.error("Failed to create sub-category")
    },
  })

  const updateSubCategory = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/sub-category/update-sub-category/${data._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      )
      if (!response.ok) throw new Error("Failed to update sub-category")
      return response.json()
    },
    onSuccess: () => {
      toast.success("Sub-category updated successfully")
      queryClient.invalidateQueries({ queryKey: ["subcategories", categoryId] })
      onOpenChange(false)
    },
    onError: () => {
      toast.error("Failed to update sub-category")
    },
  })

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("Sub-category name is required")
      return
    }
    if (mode === "add") {
      createSubCategory.mutate()
    } else {
      updateSubCategory.mutate()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Sub-Category" : "Edit Sub-Category"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Sub-Category Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter sub-category name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter sub-category description"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createSubCategory.isPending || updateSubCategory.isPending}
              className="bg-[#34813C] hover:bg-[#34813C]"
            >
              {createSubCategory.isPending || updateSubCategory.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
