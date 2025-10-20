"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import type { Shop } from "@/lib/api-client"
import { useCreateShop, useUpdateShop } from "@/hooks/use-shops"

interface ShopFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shop?: Shop
}

export function ShopFormModal({ open, onOpenChange, shop }: ShopFormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Preview of either the selected file OR the existing shop image
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const createMutation = useCreateShop()
  const updateMutation = useUpdateShop()
  const isLoading = createMutation.isPending || updateMutation.isPending

  // Helpers for object URL lifecycle
  const clearObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }

  useEffect(() => {
    // When opening or switching shop, seed fields + preview with existing image
    if (shop) {
      setFormData({
        name: shop.name ?? "",
        description: shop.description ?? "",
        email: shop.email ?? "",
        phone: shop.phone ?? "",
        address: shop.location?.address ?? "",
        latitude: shop.location?.latitude ?? "",
        longitude: shop.location?.longitude ?? "",
      })
      setImageFile(null)
      clearObjectUrl()
      setPreviewUrl(shop.image || null) // <-- show previous image
    } else {
      setFormData({
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
      })
      setImageFile(null)
      clearObjectUrl()
      setPreviewUrl(null)
    }

    // When modal closes, also clean up
    return () => {
      clearObjectUrl()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop, open])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Update selected file + live preview
    setImageFile(file)
    clearObjectUrl()
    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    setPreviewUrl(url)
  }

  const handleRemoveSelected = () => {
    // Remove newly picked file, revert preview to existing image (if any)
    setImageFile(null)
    clearObjectUrl()
    setPreviewUrl(shop?.image || null)

    // Reset file input visually
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = new FormData()
    form.append("name", formData.name)
    form.append("description", formData.description)
    form.append("email", formData.email)
    form.append("phone", formData.phone)
    form.append("address", formData.address)
    form.append("latitude", String(formData.latitude))
    form.append("longitude", String(formData.longitude))

    // Only append a file if user actually selected one.
    // (Keeps the previous image on the server if editing and no new file chosen.)
    if (imageFile) {
      // keep the key your backend expects; you were using "imageLink"
      form.append("imageLink", imageFile)
    }

    if (shop) {
      await updateMutation.mutateAsync({ id: shop._id, formData: form })
    } else {
      await createMutation.mutateAsync(form)
    }

    if (!isLoading) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{shop ? "Edit Shop" : "Add New Shop"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Shop Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter shop name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="Enter latitude"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="Enter longitude"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter shop description"
              rows={3}
            />
          </div>

          {/* Image picker + previews */}
          <div className="space-y-3">
            <Label htmlFor="image">Shop Image</Label>
            <div className="flex items-center gap-3">
              <Input
                id="image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
              />
              {imageFile && (
                <Button type="button" variant="outline" onClick={handleRemoveSelected}>
                  Remove selected
                </Button>
              )}
            </div>

            {previewUrl ? (
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground mb-2">
                  {imageFile ? "Selected image preview" : "Current image"}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Shop image preview"
                  className="h-40 w-40 object-cover rounded-md"
                />
              </div>
            ) : shop?.image ? (
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground mb-2">Current image</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shop.image}
                  alt="Existing shop image"
                  className="h-40 w-40 object-cover rounded-md"
                />
              </div>
            ) : null}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  {shop ? "Updating..." : "Creating..."}
                </>
              ) : shop ? (
                "Update Shop"
              ) : (
                "Create Shop"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
