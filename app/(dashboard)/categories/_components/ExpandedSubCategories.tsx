"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface SubCategory {
  _id: string
  name: string
  description: string
  category: string
}

interface CategoryResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    _id: string
    name: string
    description: string
    subCategories: SubCategory[]
  }
}

interface ExpandedSubCategoriesProps {
  categoryId: string
  onAddSubCategory: () => void
  onEditSubCategory: (subCategory: SubCategory) => void
}

// ✅ Fixed API fetch
const fetchSubCategories = async (categoryId: string): Promise<SubCategory[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-category/${categoryId}`)
  if (!response.ok) throw new Error("Failed to fetch sub-categories")

  const data: CategoryResponse = await response.json()
  return data.data?.subCategories || []
}

export default function ExpandedSubCategories({
  categoryId,
  onAddSubCategory,
  onEditSubCategory,
}: ExpandedSubCategoriesProps) {
  const queryClient = useQueryClient()

  // Modal state
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean
    subCategory?: SubCategory
  }>({ open: false })

  const { data: subCategories = [], isLoading, error } = useQuery<SubCategory[]>({
    queryKey: ["subcategories", categoryId],
    queryFn: () => fetchSubCategories(categoryId),
  })

  const deleteSubCategory = useMutation({
    mutationFn: async (subCategoryId: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sub-category/${subCategoryId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete sub-category")
      return response.json()
    },
    onSuccess: () => {
      toast.success("Sub-category deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["subcategories", categoryId] })
      setDeleteModal({ open: false })
    },
    onError: () => {
      toast.error("Failed to delete sub-category")
    },
  })

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-muted/30 p-6 mt-2 rounded-b-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#131313] text-lg">Sub-Categories</h3>
            <Button
              onClick={onAddSubCategory}
              size="sm"
              className="bg-[#34813C] hover:bg-[#2d6c32] text-white gap-2"
            >
              <Plus size={16} />
              Add Sub-Category
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-md border border-border bg-white">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-[16px] font-semibold text-[#131313]">Name</th>
                  <th className="px-6 py-3 text-left text-[16px] font-semibold text-[#131313]">Description</th>
                  <th className="px-6 py-3 text-left text-[16px] font-semibold text-[#131313]">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-[#707070]">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-red-500">
                      Error loading sub-categories
                    </td>
                  </tr>
                ) : subCategories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-[#707070]">
                      No sub-categories found
                    </td>
                  </tr>
                ) : (
                  subCategories.map((subCategory) => (
                    <tr
                      key={subCategory._id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-[#131313]">{subCategory.name}</td>
                      <td className="px-6 py-4 text-sm text-[#707070]">{subCategory.description}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onEditSubCategory(subCategory)}
                            className="text-foreground hover:text-[#34813C] transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setDeleteModal({ open: true, subCategory })}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Sub-Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#131313]">
                {deleteModal.subCategory?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false })}
              className="min-w-[90px]"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                deleteSubCategory.mutate(deleteModal.subCategory?._id as string)
              }
              className="bg-red-600 hover:bg-red-700 text-white min-w-[90px]"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
