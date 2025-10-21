"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePromo, useUpdatePromo } from "@/hooks/use-promos";

interface PromoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo?: {
    _id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    image: string;
    discount?: string;
  };
}

export function PromoFormModal({
  open,
  onOpenChange,
  promo,
}: PromoFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    discount: "", // ✅ make it string for better input behavior
    imageLink: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const createPromo = useCreatePromo();
  const updatePromo = useUpdatePromo();
  const isLoading = createPromo.isPending || updatePromo.isPending;

  // Populate form when editing
  useEffect(() => {
    if (promo) {
      setFormData({
        name: promo.name,
        description: promo.description,
        startDate: promo.startDate.split("T")[0],
        endDate: promo.endDate.split("T")[0],
        discount: promo.discount != null ? String(promo.discount) : "",
        imageLink: null,
      });
      setPreviewImage(promo.image); // show existing image
    } else {
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        discount: "",
        imageLink: null,
      });
      setPreviewImage(null);
    }
  }, [promo, open]);

  // Handle file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, imageLink: file });

    // Preview new image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("startDate", formData.startDate);
    form.append("endDate", formData.endDate);
    form.append("discount", String(formData.discount));
    if (formData.imageLink) {
      form.append("imageLink", formData.imageLink);
    }

    if (promo) {
      await updatePromo.mutateAsync({ id: promo._id, data: form });
    } else {
      await createPromo.mutateAsync(form);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{promo ? "Edit Promo" : "Create New Promo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Promo Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter promo name"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter promo description"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              placeholder="Enter discount percentage (e.g., 10)"
            />
          </div>

          {/* Image Upload & Preview */}
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <div className="mt-2">
                <Label>Preview:</Label>
                <img
                  src={previewImage}
                  alt="Promo Preview"
                  className="mt-2 h-40 w-full rounded-lg object-cover border"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : promo ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
