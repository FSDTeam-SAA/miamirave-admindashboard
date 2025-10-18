// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Bradcrumb from "@/components/shyard/Bradcrumb"

// export default function AddCategory() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//       router.push("/")
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen ">
//       {/* Header */}
//       <Bradcrumb pageName="Categories" subPageName="Add Category" />

//       {/* Main Content */}
//       <main className="w-full">
//         <div className=" rounded-lg p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Category Name */}
//             <div>
//               <label htmlFor="name" className="block text-base font-medium text-[#3E3E3E] mb-2">
//                 Category Name 
//               </label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter category name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-[#00000033]/20 h-[50px] rounded-[6px]"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-base font-medium text-[#3E3E3E] mb-2">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Enter category description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-[#00000033]/20 h-[100px] bg-transparent rounded-md  text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//               />
//             </div>

//             {/* Form Actions */}
//             <div className="flex items-center gap-4 pt-4">
//               <Button
//                 type="submit"
//                 disabled={isLoading || !formData.name.trim()}
//                 className="bg-green-600 hover:bg-green-700 text-white"
//               >
//                 {isLoading ? "Adding..." : "Add Category"}
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => router.back()}
//                 variant="outline"
//                 className="border-border text-foreground hover:bg-muted"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }


"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import Image from "next/image"

async function createCategory(data: { name: string; description: string; imageLink: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/create-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create category")
  }
  return response.json()
}

export default function AddCategory() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageLink: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created successfully!")
      router.push("/")
    },
    onError: () => {
      toast.error("Failed to create category")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === "imageLink" && value) {
      setImagePreview(value)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setFormData((prev) => ({
          ...prev,
          imageLink: imageUrl,
        }))
        setImagePreview(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="min-h-screen">
      <Bradcrumb pageName="Categories" subPageName="Add Category" />

      <main className="w-full">
        <div className="rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-3 py-2 border border-[#00000033]/20 h-[100px] bg-transparent rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-base font-medium text-[#3E3E3E] mb-2">
                Category Image
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-[#00000033]/20 h-[50px] rounded-[6px]"
              />
            
              {imagePreview && (
                <div className="mt-4">
                  <Image
                    src={imagePreview}
                    alt="Category preview"
                    width={100}
                    height={100}
                    className="max-w-[200px] h-auto rounded-md border border-[#00000033]/20"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                disabled={mutation.isPending || !formData.name.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {mutation.isPending ? "Adding..." : "Add Category"}
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