"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Toaster, toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Edit, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import { CustomPagination } from "@/components/shyard/CustomPagination"
import ExpandedSubCategories from "./ExpandedSubCategories"
import CategoryModal from "./CategoryModal"
import SubCategoryModal from "./SubCategoryModal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface Category {
  _id: string
  name: string
  description: string
  __v: number
  subcategoryCount: number
}

interface ApiResponse {
  statusCode: number
  success: boolean
  message: string
  data: Category[]
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/all-category`)
  if (!response.ok) throw new Error("Failed to fetch categories")
  const data: ApiResponse = await response.json()
  return data.data
}

const SkeletonRow = () => (
  <tr className="border-b border-border">
    <td className="px-6 py-4">
      <div className="w-[220px] h-[40px] bg-gray-200 animate-pulse rounded-[2px]" />
    </td>
    <td className="px-6 py-4">
      <div className="w-[100px] h-4 bg-gray-200 animate-pulse rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="w-[50px] h-4 bg-gray-200 animate-pulse rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
      </div>
    </td>
  </tr>
)

export default function RootPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const [categoryModal, setCategoryModal] = useState<{
    open: boolean
    mode: "add" | "edit"
    data?: Category
  }>({ open: false, mode: "add" })

  const [subCategoryModal, setSubCategoryModal] = useState<{
    open: boolean
    mode: "add" | "edit"
    categoryId?: string
    data?: any
  }>({ open: false, mode: "add" })

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean
    category?: Category
  }>({ open: false })

  const queryClient = useQueryClient()
  const itemsPerPage = 5

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const deleteCategory = useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${categoryId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete category")
      return response.json()
    },
    onSuccess: () => {
      toast.success("Category deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      setDeleteModal({ open: false })
    },
    onError: () => {
      toast.error("Failed to delete category")
    },
  })

  const totalItems = categories.length
  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <Bradcrumb pageName="Category" />
        <Button
          onClick={() => setCategoryModal({ open: true, mode: "add" })}
          className="bg-[#34813C] hover:bg-[#2d6c32] h-[48px] text-white gap-2"
        >
          <Plus size={20} />
          Add Category
        </Button>
      </div>

      {/* Main Content */}
      <main className="w-full py-8">
        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">Name</th>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">Date</th>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">Sub Categories</th>
                <th className="px-6 py-3 text-left text-[18px] font-semibold text-[#131313]">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonRow key={index} />)
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-red-500">
                    Error: {(error as Error).message}
                  </td>
                </tr>
              ) : paginatedCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-[#707070]">
                    No categories found
                  </td>
                </tr>
              ) : (
                paginatedCategories.map((category) => (
                  <React.Fragment key={category._id}>
                    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">{category.name}</td>
                      <td className="px-6 py-4 text-base text-[#707070]">N/A</td>
                      <td className="px-6 py-4 text-base text-[#707070]">{category.subcategoryCount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setExpandedCategory(expandedCategory === category._id ? null : category._id)
                            }
                            className="text-foreground hover:text-[#34813C] transition-colors"
                          >
                            {expandedCategory === category._id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              setCategoryModal({
                                open: true,
                                mode: "edit",
                                data: category,
                              })
                            }
                            className="text-foreground hover:text-[#34813C] transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => setDeleteModal({ open: true, category })}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedCategory === category._id && (
                      <tr>
                        <td colSpan={4} className="px-6 py-0">
                          <ExpandedSubCategories
                            categoryId={category._id}
                            onAddSubCategory={() =>
                              setSubCategoryModal({
                                open: true,
                                mode: "add",
                                categoryId: category._id,
                              })
                            }
                            onEditSubCategory={(subCategory) =>
                              setSubCategoryModal({
                                open: true,
                                mode: "edit",
                                categoryId: category._id,
                                data: subCategory,
                              })
                            }
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="w-full mt-6">
          <CustomPagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {/* Modals */}
      <CategoryModal
        open={categoryModal.open}
        mode={categoryModal.mode}
        data={categoryModal.data}
        onOpenChange={(open) => setCategoryModal({ ...categoryModal, open })}
      />

      <SubCategoryModal
        open={subCategoryModal.open}
        mode={subCategoryModal.mode}
        categoryId={subCategoryModal.categoryId}
        data={subCategoryModal.data}
        onOpenChange={(open) => setSubCategoryModal({ ...subCategoryModal, open })}
      />

      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#131313]">
                {deleteModal.category?.name}
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
                deleteCategory.mutate(deleteModal.category?._id as string)
              }
              className="bg-red-600 hover:bg-red-700 text-white min-w-[90px]"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
