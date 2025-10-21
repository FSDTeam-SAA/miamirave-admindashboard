"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useCreateShop, useUpdateShop } from "@/hooks/use-shops";

// Lazy load map modal
const LocationPickerModal = dynamic(
  () => import("./LocationPickerModal").then((mod) => mod.LocationPickerModal),
  { ssr: false }
);

interface ShopFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shop?: any;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function ShopFormModal({ open, onOpenChange, shop }: ShopFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
  });

  const [storeHours, setStoreHours] = useState<Record<string, { start: string; end: string }>>({});
  const [inStoreHours, setInStoreHours] = useState<Record<string, { start: string; end: string }>>({});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createMutation = useCreateShop();
  const updateMutation = useUpdateShop();
  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Initialize form data
  useEffect(() => {
    if (shop) {
      // Normalize store_hours array → object
      const normalizedStoreHours: Record<string, { start: string; end: string }> = {};
      (shop.store_hours || []).forEach((item: any) => {
        normalizedStoreHours[item.day] = {
          start: item.start_time || "",
          end: item.end_time || "",
        };
      });

      // Normalize in_store_hours array → object
      const normalizedInStoreHours: Record<string, { start: string; end: string }> = {};
      (shop.in_store_hours || []).forEach((item: any) => {
        normalizedInStoreHours[item.day] = {
          start: item.start_time || "",
          end: item.end_time || "",
        };
      });

      setFormData({
        name: shop.name || "",
        description: shop.description || "",
        address: shop.location?.address || "",
        phone: shop.phone || "",
        email: shop.email || "",
        latitude: shop.location?.latitude?.toString() || "",
        longitude: shop.location?.longitude?.toString() || "",
      });

      setPreviewUrl(shop.image || null);
      setStoreHours(normalizedStoreHours);
      setInStoreHours(normalizedInStoreHours);
    } else {
      // Reset for new shop
      setFormData({
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        latitude: "",
        longitude: "",
      });
      setPreviewUrl(null);
      setStoreHours({});
      setInStoreHours({});
    }
  }, [shop, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTimeChange = (day: string, type: "store" | "pickup", key: "start" | "end", value: string) => {
    if (type === "store") {
      setStoreHours((prev) => ({
        ...prev,
        [day]: { ...prev[day], [key]: value },
      }));
    } else {
      setInStoreHours((prev) => ({
        ...prev,
        [day]: { ...prev[day], [key]: value },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert objects → arrays
    const storeHoursArray = Object.entries(storeHours).map(([day, { start, end }]) => ({
      day,
      start_time: start,
      end_time: end,
    }));

    const inStoreHoursArray = Object.entries(inStoreHours).map(([day, { start, end }]) => ({
      day,
      start_time: start,
      end_time: end,
    }));

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("latitude", formData.latitude);
    form.append("longitude", formData.longitude);
    form.append("store_hours", JSON.stringify(storeHoursArray));
    form.append("in_store_hours", JSON.stringify(inStoreHoursArray));

    // ✅ Use correct field name for backend
    if (imageFile) form.append("imageLink", imageFile);

    if (shop) {
      await updateMutation.mutateAsync({ id: shop._id, formData: form });
    } else {
      await createMutation.mutateAsync(form);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{shop ? "Edit Shop" : "Add Shop"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shop name and location button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Shop Name *</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Write a shop name..."
                required
              />
            </div>

            <div className="flex items-end justify-end">
              <Button type="button" variant="outline" onClick={() => setShowLocationModal(true)}>
                Set Location on Map
              </Button>
            </div>
          </div>

          {/* Email and phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email *</Label>
              <Input name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>

          {/* Address + coordinates */}
          <div>
            <Label>Address *</Label>
            <Input name="address" value={formData.address} onChange={handleInputChange} required />
            {formData.latitude && formData.longitude && (
              <p className="text-sm text-gray-500 mt-1">
                📍 Latitude: {formData.latitude} | Longitude: {formData.longitude}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleInputChange} />
          </div>

          {/* Image upload */}
          <div>
            <Label>Thumbnail</Label>
            <div className="flex gap-3 items-center">
              <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />
              {imageFile && (
                <Button type="button" variant="outline" onClick={handleRemoveImage}>
                  Remove
                </Button>
              )}
            </div>
            {previewUrl && (
              <div className="mt-2">
                <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Hours Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Store Hours */}
            <div>
              <Label>Available Store Hours</Label>
              {DAYS.map((day) => (
                <div key={day} className="grid grid-cols-3 gap-2 items-center my-2">
                  <span className="text-rose-600 text-sm">{day}</span>
                  <Input
                    type="time"
                    value={storeHours[day]?.start || ""}
                    onChange={(e) => handleTimeChange(day, "store", "start", e.target.value)}
                  />
                  <Input
                    type="time"
                    value={storeHours[day]?.end || ""}
                    onChange={(e) => handleTimeChange(day, "store", "end", e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* In-store Pickup */}
            <div>
              <Label>Available In-store Pickup</Label>
              {DAYS.map((day) => (
                <div key={day} className="grid grid-cols-3 gap-2 items-center my-2">
                  <span className="text-rose-600 text-sm">{day}</span>
                  <Input
                    type="time"
                    value={inStoreHours[day]?.start || ""}
                    onChange={(e) => handleTimeChange(day, "pickup", "start", e.target.value)}
                  />
                  <Input
                    type="time"
                    value={inStoreHours[day]?.end || ""}
                    onChange={(e) => handleTimeChange(day, "pickup", "end", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>

        {/* Map Modal */}
        <Suspense fallback={null}>
          <LocationPickerModal
            open={showLocationModal}
            onOpenChange={setShowLocationModal}
            onSelect={(lat, lng) => setFormData((p) => ({ ...p, latitude: lat, longitude: lng }))}
            initialPosition={[
              parseFloat(formData.latitude) || 23.8103,
              parseFloat(formData.longitude) || 90.4125,
            ]}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
