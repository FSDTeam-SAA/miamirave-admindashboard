"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Trash2, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import Breadcrumb from "@/components/shyard/Bradcrumb"
import { CustomPagination } from "@/components/shyard/CustomPagination"
import AddEditProductModal from "./AddEditProductModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import ProductDetailsModal from "./ProductDetailsModal"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface Product {
  _id: string
  title: string
  subTitle: string
  thumbnail: string[]
  code: number
  setPrices: Array<{ quantity: string; price: string; unit: string }>
  createdAt: string
}

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const itemsPerPage = 5

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products/all-products`)
      if (!response.ok) throw new Error("Failed to fetch products")
      return response.json()
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetch(`${API_BASE_URL}/products/delete/${productId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Product deleted successfully")
      setIsDeleteModalOpen(false)
      setSelectedProduct(null)
    },
    onError: () => {
      toast.error("Failed to delete product")
    },
  })

  const products = data?.data?.products || []
  const totalItems = products.length

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct._id)
    }
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setIsAddModalOpen(true)
  }

  const handleViewClick = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailsModalOpen(true)
  }

  const handleAddSuccess = () => {
    setIsAddModalOpen(false)
    setEditingProduct(null)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-destructive">Failed to load products</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Breadcrumb pageName="Product List" />
        <Button
          onClick={() => {
            setEditingProduct(null)
            setIsAddModalOpen(true)
          }}
          className="bg-[#34813C] hover:bg-[#34813C] h-[50px] text-white gap-2"
        >
          <Plus size={20} />
          Add product
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Code</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product: Product) => (
              <tr key={product._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.thumbnail?.[0] && (
                      <div className="w-[60px] h-[60px] relative rounded overflow-hidden">
                        <Image
                          src={product.thumbnail[0] || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{product.title}</p>
                      <p className="text-sm text-muted-foreground">{product.subTitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{product.code}</td>
                <td className="px-6 py-4 text-sm text-foreground">${product.setPrices?.[0]?.price || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewClick(product)}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title="View details"
                    >
                      <Eye size={18} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title="Edit product"
                    >
                      <Edit size={18} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="p-2 hover:bg-destructive/10 rounded transition-colors"
                      title="Delete product"
                    >
                      <Trash2 size={18} className="text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <CustomPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <AddEditProductModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingProduct(null)
        }}
        onSuccess={handleAddSuccess}
        product={editingProduct}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={selectedProduct?.title}
        isLoading={deleteProductMutation.isPending}
      />

      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  )
}
