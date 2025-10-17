"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Bradcrumb from "@/components/shyard/Bradcrumb"

export default function AddCategory() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Bradcrumb pageName="Categories" subPageName="Add Category" />

      {/* Main Content */}
      <main className="w-full">
        <div className=" rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div>
              <label htmlFor="name" className="block text-base font-medium text-[#3E3E3E] mb-2">
                Category Name 
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-[#00000033]/20 h-[50px] rounded-[6px]"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-base font-medium text-[#3E3E3E] mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter category description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-[#00000033]/20 h-[100px] bg-transparent rounded-md  text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? "Adding..." : "Add Category"}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
