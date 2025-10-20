"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShops } from "@/hooks/use-shops"
import type { Shop } from "@/lib/api-client"
import { Toaster } from "@/components/ui/sonner"
import { ShopsTable } from "./shops-table"
import { ShopsPagination } from "./shops-pagination"
import { ShopFormModal } from "./shop-form-modal"
import { ShopDetailsModal } from "./shop-details-modal"
import { DeleteShopModal } from "./delete-shop-modal"

const ITEMS_PER_PAGE = 5

export default function ShopsPage() {
  const { data: shops = [], isLoading } = useShops()
  const [currentPage, setCurrentPage] = useState(1)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  const totalPages = Math.ceil(shops.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedShops = shops.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleAddShop = () => {
    setSelectedShop(null)
    setFormModalOpen(true)
  }

  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop)
    setFormModalOpen(true)
  }

  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop)
    setDetailsModalOpen(true)
  }

  const handleDeleteShop = (shop: Shop) => {
    setSelectedShop(shop)
    setDeleteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shops</h1>
            <p className="text-muted-foreground">Manage your shops</p>
          </div>
          <Button onClick={handleAddShop} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Shop
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <ShopsTable
            shops={paginatedShops}
            onView={handleViewShop}
            onEdit={handleEditShop}
            onDelete={handleDeleteShop}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <ShopsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>

      {/* Modals */}
      <ShopFormModal open={formModalOpen} onOpenChange={setFormModalOpen} shop={selectedShop || undefined} />

      <ShopDetailsModal open={detailsModalOpen} onOpenChange={setDetailsModalOpen} shop={selectedShop} />

      {selectedShop && (
        <DeleteShopModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          shopId={selectedShop._id}
          shopName={selectedShop.name}
        />
      )}
    </div>
  )
}
