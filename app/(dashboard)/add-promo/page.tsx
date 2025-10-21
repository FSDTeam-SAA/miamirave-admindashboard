"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { usePromos } from "@/hooks/use-promos"
import { Toaster } from "sonner"
import { PromosTable } from "./_components/PromosPage"
import { PromoFormModal } from "./_components/promo-form-modal"

export default function PromosPage() {
  const [formModalOpen, setFormModalOpen] = useState(false)
  const { data, isLoading } = usePromos()

  const promos = data?.data || []

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Promos Management</h1>
            <p className="text-muted-foreground mt-1">Manage your promotional campaigns</p>
          </div>
          <Button onClick={() => setFormModalOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-5 w-5" />
            Add Promo
          </Button>
        </div>

        {/* Table */}
        <PromosTable promos={promos} isLoading={isLoading} />

        {/* Form Modal */}
        <PromoFormModal open={formModalOpen} onOpenChange={setFormModalOpen} />
      </div>
    </div>
  )
}
