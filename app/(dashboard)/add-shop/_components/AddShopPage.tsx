"use client"

import Bradcrumb from "@/components/shyard/Bradcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image as LucideImage, Save, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const

interface FormData {
  shopName: string
  location: string
  email: string
  phone: string
  address: string
}

interface Hours {
  start: string
  end: string
}

type Day = typeof days[number]
type StoreHours = Record<Day, Hours>
type PickupHours = Record<Day, Hours>

export default function AddShopPage() {
  const [formData, setFormData] = useState<FormData>({
    shopName: "",
    location: "",
    email: "",
    phone: "",
    address: "",
  })

  const [storeHours, setStoreHours] = useState<StoreHours>(
    days.reduce((acc, day) => ({ ...acc, [day]: { start: "", end: "" } }), {} as StoreHours),
  )

  const [pickupHours, setPickupHours] = useState<PickupHours>(
    days.reduce((acc, day) => ({ ...acc, [day]: { start: "", end: "" } }), {} as PickupHours),
  )

  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setThumbnail(result)
        console.log("Selected image:", {
          name: file.name,
          size: file.size,
          type: file.type,
          data: result.substring(0, 50) + "...",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setThumbnail(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    console.log("Image removed")
  }

  const handleSubmit = () => {
    console.log("Form Data:", {
      ...formData,
      storeHours,
      pickupHours,
      thumbnail: thumbnail ? thumbnail.substring(0, 50) + "..." : null,
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen">
      <Bradcrumb pageName="Add Shop"  />

      <main className="">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-[#2F2F2F] mb-2">Create a shop name</label>
              <Input
                type="text"
                placeholder="Write a shop name"
                className="w-full px-4 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#2F2F2F] mb-2">Set Location</label>
              <Input
                type="text"
                placeholder="Choose a location"
                className="w-full px-4 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#2F2F2F] mb-4">Add Contacts details</label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  type="email"
                  placeholder="Add email"
                  className="px-4 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  type="tel"
                  placeholder="Add phone"
                  className="px-4 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <Input
                type="text"
                placeholder="Add address"
                className="w-full px-4 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="border border-[#B6B6B6] p-6 h-[467px]">
              <label className="block text-xl font-medium text-[#2F2F2F] mb-2">Thumbnail</label>
              <div
                className="border-2 border-dashed hover:border-[#B6B6B6] border-border rounded-lg p-12 h-[383px] text-center relative cursor-pointer"
                onClick={triggerFileInput}
              >
                {thumbnail ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering file input when clicking X
                        removeImage()
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <LucideImage className="w-[80px] h-[80px] text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Click to choose an image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-[#2F2F2F] mb-4">Available Store hours</h3>
              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day} className="flex items-center gap-10">
                    <span className="text-[18px] font-medium text-[#F0217A] w-20">{day}</span>
                    <Input
                      type="time"
                      placeholder="Start Time"
                      className="flex-1 px-3 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={storeHours[day].start}
                      onChange={(e) =>
                        setStoreHours({
                          ...storeHours,
                          [day]: { ...storeHours[day], start: e.target.value },
                        })
                      }
                    />
                    <Input
                      type="time"
                      placeholder="End Time"
                      className="flex-1 px-3 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={storeHours[day].end}
                      onChange={(e) =>
                        setStoreHours({
                          ...storeHours,
                          [day]: { ...storeHours[day], end: e.target.value },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-[#2F2F2F] mb-4">Available In-store Pickup</h3>
              <div className="space-y-3">
                {days.map((day) => (
                  <div key={`pickup-${day}`} className="flex items-center gap-10">
                    <span className="text-[18px] font-medium text-[#F0217A] w-20">{day}</span>
                    <Input
                      type="time"
                      placeholder="Start Time"
                      className="flex-1 px-3 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={pickupHours[day].start}
                      onChange={(e) =>
                        setPickupHours({
                          ...pickupHours,
                          [day]: { ...pickupHours[day], start: e.target.value },
                        })
                      }
                    />
                    <Input
                      type="time"
                      placeholder="End Time"
                      className="flex-1 px-3 h-[50px] border border-[#B6B6B6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={pickupHours[day].end}
                      onChange={(e) =>
                        setPickupHours({
                          ...pickupHours,
                          [day]: { ...pickupHours[day], end: e.target.value },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[80px] flex justify-center">
          <Button
            className="bg-[#2F7537] hover:bg-[#2F7537]/90 h-[48px] text-white px-12"
            onClick={handleSubmit}
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </main>
    </div>
  )
}