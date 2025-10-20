"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Shop } from "@/lib/api-client"
import Image from "next/image"

interface ShopDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shop: Shop | null
}

export function ShopDetailsModal({ open, onOpenChange, shop }: ShopDetailsModalProps) {
  if (!shop) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* p-0 so we can make header/footer sticky inside */}
      <DialogContent className="max-w-2xl p-0">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <DialogHeader className="px-6 py-4">
            <DialogTitle>Shop Details</DialogTitle>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-4 px-6 py-4">
            <div className="w-full overflow-hidden rounded-lg">
              <Image
                src={shop.image || "/placeholder.svg"}
                alt={shop.name}
                width={1200}
                height={600}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shop Name</p>
                <p className="text-foreground">{shop.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-foreground break-all">{shop.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-foreground">{shop.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-foreground">{shop.location.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latitude</p>
                <p className="text-foreground">{shop.location.latitude}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Longitude</p>
                <p className="text-foreground">{shop.location.longitude}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-foreground">{shop.description || "N/A"}</p>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky footer */}
        <div className=" bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="flex justify-end gap-2 px-6 py-4">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
