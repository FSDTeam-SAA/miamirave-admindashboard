"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import { Input } from "@/components/ui/input"
import { Image as ImageIcon, Save, X } from "lucide-react"

interface FormData {
  title: string
  startDate: string
  endDate: string
}

export default function AddPromoPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    startDate: "",
    endDate: "",
  })
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeThumbnail = () => {
    setThumbnail(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Bradcrumb pageName="Add Promo" />

      {/* Form */}
      <main className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Promo Title */}
            <div>
              <label className="block text-xl font-medium text-[#2F2F2F] mb-2">Add promo title</label>
              <Input
                type="text"
                placeholder="Add your title"
                className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] placeholder:text-[#00000033]/20 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xl font-medium text-[#2F2F2F] mb-2">Start Date</label>
                <Input
                  type="date"
                  className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] placeholder:text-[#00000033]/20 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-[#2F2F2F] mb-2">End Date</label>
                <Input
                  type="date"
                  className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] placeholder:text-[#00000033]/20 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Right Column - Thumbnail */}
          <div className="border p-6 h-[327px]">
            <label className="block text-xl font-medium text-[#2F2F2F] mb-2">Thumbnail</label>
            <div
              className="border-2 border-dashed border-border hover:border-[#B6B6B6] rounded-lg p-4 text-center h-[243px] relative flex items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={handleAreaClick}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              {thumbnail ? (
                <div className="relative w-full h-full">
                  <Image
                    src={thumbnail}
                    alt="Thumbnail Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation()
                      removeThumbnail()
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="w-[80px] h-[80px] text-muted-foreground" />
                  <span className="mt-2 text-sm text-muted-foreground">Click to select an image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-[80px] flex justify-center">
          <Button className="bg-[#2F7537] hover:bg-[#2F7537]/80 h-[48px] text-white px-12">
            <span>
              <Save className="mr-2 h-5 w-5" />
            </span>
            Save
          </Button>
        </div>
      </main>
    </div>
  )
}