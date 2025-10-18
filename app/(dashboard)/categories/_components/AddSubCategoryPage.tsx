"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Bradcrumb from "@/components/shyard/Bradcrumb"

export default function AddSubCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id

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
      router.push(`/category/${categoryId}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
       <Bradcrumb pageName="Category" subPageName="Add sub category"/>

      {/* Main Content */}
      <main className=" py-8">
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sub Category Name */}
            <div>
              <label htmlFor="name" className="block text-base font-medium text-[#3E3E3E] mb-2">
                Sub Category Name 
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter sub category name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-[#00000033]/20 placeholder:text-[#8D8D8D] rounded-[10px] h-[50px] "
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
                placeholder="Enter sub category description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border pt-2 pl-2 border-[#00000033]/20 placeholder:text-[#8D8D8D] rounded-[10px] h-[170px] "
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end">
            <div className="flex items-center gap-4 pt-4">
                 <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? "Adding..." : "Add Sub Category"}
              </Button>
             
            </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
