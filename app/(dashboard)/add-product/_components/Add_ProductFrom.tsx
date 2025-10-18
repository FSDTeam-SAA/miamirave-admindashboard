"use client"

import { useState } from "react"
import Link from "next/link"
import { Image,  X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface PriceSet {
  id: string
  size: string
  quantity: string
  price: string
}

export default function Add_ProductFrom() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    promo: "",
    category: "",
    subCategory: "",
    description: "",
  })

  const [priceSets, setPriceSets] = useState<PriceSet[]>([
    { id: "1", size: "10u", quantity: "5.0", price: "" },
    { id: "2", size: "10u", quantity: "5.0", price: "" },
  ])

  const [currentPrice, setCurrentPrice] = useState({ size: "", quantity: "", price: "" })

  const handleAddPrice = () => {
    if (currentPrice.size && currentPrice.quantity && currentPrice.price) {
      setPriceSets([
        ...priceSets,
        {
          id: Date.now().toString(),
          size: currentPrice.size,
          quantity: currentPrice.quantity,
          price: currentPrice.price,
        },
      ])
      setCurrentPrice({ size: currentPrice.size, quantity: currentPrice.quantity, price: "" })
    }
  }

  const handleRemovePrice = (id: string) => {
    setPriceSets(priceSets.filter((p) => p.id !== id))
  }

  return (
    <main className="min-h-screen ">
      <div className="">
        {/* Header */}
        <Bradcrumb pageName="Product List" subPageName="Add product" />

        {/* Content */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Add product title</label>
              <Input
                type="text"
                placeholder="Enter product title"
                className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] "
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Add product Subtitle</label>
              <Input
                type="text"
                placeholder="Add your subtitle"
                className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] "
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>

            {/* Promo */}
            <div>
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Add product Promo</label>
              <select className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] ">
                <option>Select promo</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Product Categories</label>
              <select className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] ">
                <option>Select Categories</option>
              </select>
            </div>

            {/* Sub Categories */}
            <div>
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Set sub_categories</label>
              <select className="w-full px-4 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] ">
                <option>Select sub categories</option>
              </select>
            </div>

            {/* Set Prices */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Set Prices</label>

              {/* Price Sets Display */}
              <div className="space-y-2 mb-4">
                {priceSets.map((priceSet) => (
                  <div key={priceSet.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-[4px] h-[50px]">
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">Size</div>
                      <div className="text-sm font-medium text-gray-900">{priceSet.size}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">Qty</div>
                      <div className="text-sm font-medium text-gray-900">{priceSet.quantity}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">Price</div>
                      <div className="text-sm font-medium text-gray-900">${priceSet.price}</div>
                    </div>
                    <button onClick={() => handleRemovePrice(priceSet.id)} className="p-1 hover:bg-gray-200 rounded">
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Price */}
              <div className="space-y-3 pt-4 ">
                <div className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Size"
                      value={currentPrice.size}
                      onChange={(e) => setCurrentPrice({ ...currentPrice, size: e.target.value })}
                      className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                    />
                    <span className="text-xs text-gray-500 mt-1 block">Size</span>
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Qty"
                      value={currentPrice.quantity}
                      onChange={(e) => setCurrentPrice({ ...currentPrice, quantity: e.target.value })}
                      className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                    />
                    <span className="text-xs text-gray-500 mt-1 block">Qty</span>
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Price"
                      value={currentPrice.price}
                      onChange={(e) => setCurrentPrice({ ...currentPrice, price: e.target.value })}
                      className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                    />
                    <span className="text-xs text-gray-500 mt-1 block">Price</span>
                  </div>
                  <button
                    onClick={handleAddPrice}
                    className="px-3 py-2 bg-green-600 text-white rounded-[4px] h-[50px] hover:bg-green-700 text-sm font-medium"
                  >
                    Set
                  </button>
                </div>
              </div>

           
            </div>

            {/* Thumbnail */}
            <div className="border p-6 h-[327px] ">
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Thumbnail</label>
              <div className="border-2 border-dashed h-[243px] border-[#B6B6B6] rounded-[4px]  p-8 text-center hover:border-[#2F2F2F] cursor-pointer">
                <span>
                <Image  className="mx-auto h-[80px] w-[100px] text-gray-400 mb-2" />
                </span>
                <p className="text-sm text-gray-600">Upload image</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Description */}
            <div className="pb-10">
              <label className="block text-xl font-semibold text-[#2F2F2F] mb-2">Description</label>
              <ReactQuill
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                theme="snow"
                placeholder="Enter product description"
                className=" h-[577px] rounded-[4px]"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>

            {/* General Info */}
            <div>
              <h3 className="text-xl font-semibold text-[#2F2F2F] mb-3">General Info</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Total CBD</label>
                  <Input
                    type="text"
                    placeholder="Total"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">THC-CBD ratio</label>
                  <Input
                    type="text"
                    placeholder="Ratio"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Total Terpenes</label>
                  <Input
                    type="text"
                    placeholder="Total"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Total Size</label>
                  <Input
                    type="text"
                    placeholder="Size"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Strain Provenance</label>
                  <Input
                    type="text"
                    placeholder="Strain"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
              </div>
            </div>

            {/* Top Terpenes */}
            <div>
              <h3 className="text-xl font-semibold text-[#2F2F2F] mb-3">Top Terpenes</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="β-Caryophyllene"
                  className="px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                />
                <Input
                  type="text"
                  placeholder="Limonene"
                  className="px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                />
                <Input
                  type="text"
                  placeholder="Myrcene"
                  className="px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                />
                <Input
                  type="text"
                  placeholder="Linalool"
                  className="px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Lab Data */}
          <div className="mt-[70px]">
            <h3 className="text-xl font-semibold text-[#2F2F2F] mb-3">Lab Data</h3>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-900 mb-2">THC</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Total THC</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">THCA</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Delta-9 THC</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-900 mb-2">CBD</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Total CBD</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">CBDA</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">CBD</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-900 mb-2">TERPENES</p>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Total Terpenes</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Betaycene</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Terpinolene</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Ocimene</label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-[#B6B6B6] rounded-[4px] h-[50px] text-sm "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8  flex justify-end gap-4">
          <Link href="/product-list">
            <Button variant="outline" className="px-8 bg-transparent">
              Cancel
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8">Save Product</Button>
        </div>
      </div>
    </main>
  )
}
