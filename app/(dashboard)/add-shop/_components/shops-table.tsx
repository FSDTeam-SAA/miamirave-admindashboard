"use client"
import Image from "next/image"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Shop } from "@/lib/api-client"

interface ShopsTableProps {
  shops: Shop[]
  onView: (shop: Shop) => void
  onEdit: (shop: Shop) => void
  onDelete: (shop: Shop) => void
  isLoading: boolean
}

export function ShopsTable({ shops, onView, onEdit, onDelete, isLoading }: ShopsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading shops...</p>
        </div>
      </div>
    )
  }

  if (shops.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground">No shops found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Shop Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop._id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={shop.image || "/placeholder.svg"}
                      alt={shop.name}
                      width={64}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{shop.name}</p>
                    <p className="text-xs text-muted-foreground">{shop._id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-foreground">{shop.location.address}</p>
                <p className="text-xs text-muted-foreground">
                  {shop.location.latitude?.toFixed(4)}, {shop.location.longitude?.toFixed(4)}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-foreground">{shop.email}</p>
                <p className="text-sm text-foreground">{shop.phone}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onView(shop)} title="View details">
                    <Eye size={18} className="text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(shop)} title="Edit shop">
                    <Edit size={18} className="text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(shop)} title="Delete shop">
                    <Trash2 size={18} className="text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
