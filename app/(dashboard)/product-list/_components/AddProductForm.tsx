"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ImageIcon, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PriceSet {
  id: string;
  quantity: string; // backend expects String
  price: string;    // backend expects String
  unit: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  subCategories?: SubCategory[];
}

interface SubCategory {
  _id: string;
  name: string;
  description: string;
  category: string;
}

interface ProductFormData {
  title: string;
  subTitle: string;
  promoList?: string[];
  category: string;     // ObjectId
  subcategory: string;  // ObjectId (single)
  description: string;
  totalTHC: string;
  totalCBD: string;
  thcCbdRatio: string;
  totalTerpenes: string;
  totalSize: string;
  strainPrevalence: string;
  unitsInPackage: string;
  strain: string;
  topTerpenes: {
    terpene1: string;
    terpene2: string;
    terpene3: string;
    terpene4: string;
  };
  labData: {
    thc: {
      totalTHC: string;
      thca: string;
      delta9THC: string;
    };
    cbd: {
      totalCBD: string;
      cbda: string;
      cbg?: string;
      cbga?: string;
    };
    terpenes: {
      totalTerpenes: string;
      betaycene: string; // UI -> bMyrcene
      terpinolene: string;
      ocimene: string;
    };
  };
  setPrices: PriceSet[];
  imageLink?: string; // existing thumbnail URL if any
}

interface AddProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  product?: any;
  isLoading?: boolean;
}

export default function AddProductForm({
  onSuccess,
  onCancel,
  product,
  isLoading = false,
}: AddProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    subTitle: "",
    promoList: [],
    category: "",
    subcategory: "",
    description: "",
    totalTHC: "",
    totalCBD: "",
    thcCbdRatio: "",
    totalTerpenes: "",
    totalSize: "",
    strainPrevalence: "",
    unitsInPackage: "",
    strain: "",
    topTerpenes: { terpene1: "", terpene2: "", terpene3: "", terpene4: "" },
    labData: {
      thc: { totalTHC: "", thca: "", delta9THC: "" },
      cbd: { totalCBD: "", cbda: "", cbg: "", cbga: "" },
      terpenes: { totalTerpenes: "", betaycene: "", terpinolene: "", ocimene: "" },
    },
    setPrices: [],
  });

  // Thumbnail upload/preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Inline "Add price" inputs
  const [currentPrice, setCurrentPrice] = useState({ size: "", quantity: "", price: "" });

  const queryClient = useQueryClient();

  // Categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/category/all-category`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
  });
  const categories: Category[] = categoriesData?.data || [];

  // Subcategories
  const { data: subcategoryData, isLoading: subcategoriesLoading } = useQuery({
    queryKey: ["subcategories", formData.category],
    queryFn: async () => {
      if (!formData.category) return null;
      const response = await fetch(`${API_BASE_URL}/category/get-category/${formData.category}`);
      if (!response.ok) throw new Error("Failed to fetch subcategories");
      return response.json();
    },
    enabled: !!formData.category,
  });
  const subcategories: SubCategory[] = subcategoryData?.data?.subCategories || [];

  // Prefill + existing thumbnail preview
  useEffect(() => {
    if (product) {
      const existingThumb = product.thumbnail?.[0] || product.imageLink || "";
      setImagePreview(existingThumb || null);

      setFormData({
        title: product.title || "",
        subTitle: product.subTitle || "",
        promoList: product.promoList?.map((id: any) => id?.toString?.()) || [],
        category: product.category?._id ?? product.category ?? "",
        subcategory: product.subcategory?._id ?? product.subcategory ?? "",
        description: product.description || "",
        totalTHC: product.totalTHC?.toString?.() || "",
        totalCBD: product.totalCBD?.toString?.() || "",
        thcCbdRatio: product.thcCbdRatio || "",
        totalTerpenes: product.totalTerpenes?.toString?.() || "",
        totalSize: product.totalSize || "",
        strainPrevalence: product.strainPrevalence || "",
        unitsInPackage: product.unitsInPackage?.toString?.() || "",
        strain: product.strain || "",
        topTerpenes: product.topTerpenes
          ? {
              terpene1: (product.topTerpenes.bCaryophyllene ?? "").toString(),
              terpene2: (product.topTerpenes.limonene ?? "").toString(),
              terpene3: (product.topTerpenes.humulene ?? "").toString(),
              terpene4: (product.topTerpenes.linalool ?? "").toString(),
            }
          : { terpene1: "", terpene2: "", terpene3: "", terpene4: "" },
        labData: product.labData
          ? {
              thc: {
                totalTHC: (product.labData.thc?.totalTHC ?? "").toString(),
                thca: (product.labData.thc?.thca ?? "").toString(),
                delta9THC: (product.labData.thc?.delta9THC ?? "").toString(),
              },
              cbd: {
                totalCBD: (product.labData.cbd?.totalCBD ?? "").toString(),
                cbda: (product.labData.cbd?.cbda ?? "").toString(),
                cbg: (product.labData.cbd?.cbg ?? "").toString(),
                cbga: (product.labData.cbd?.cbga ?? "").toString(),
              },
              terpenes: {
                totalTerpenes: (product.labData.terpenes?.totalTerpenes ?? "").toString(),
                betaycene: (product.labData.terpenes?.bMyrcene ?? "").toString(),
                terpinolene: (product.labData.terpenes?.terpinolene ?? "").toString(),
                ocimene: (product.labData.terpenes?.ocimene ?? "").toString(),
              },
            }
          : {
              thc: { totalTHC: "", thca: "", delta9THC: "" },
              cbd: { totalCBD: "", cbda: "", cbg: "", cbga: "" },
              terpenes: { totalTerpenes: "", betaycene: "", terpinolene: "", ocimene: "" },
            },
        setPrices:
          product.setPrices?.map((p: any, i: number) => ({
            id: (p._id ?? `${i + 1}`).toString(),
            quantity: (p.quantity ?? "").toString(),
            price: (p.price ?? "").toString(),
            unit: (p.unit ?? "").toString(),
          })) ?? [],
        imageLink: existingThumb || "",
      });
    }
  }, [product]);

  // -------- Price helpers (EDIT inline) --------
  const handlePriceChange = (id: string, field: keyof PriceSet, value: string) => {
    setFormData((prev) => ({
      ...prev,
      setPrices: prev.setPrices.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleAddPrice = () => {
    if (currentPrice.size && currentPrice.quantity && currentPrice.price) {
      setFormData((prev) => ({
        ...prev,
        setPrices: [
          ...prev.setPrices,
          {
            id: Date.now().toString(),
            quantity: currentPrice.quantity,
            price: currentPrice.price, // keep string (backend schema)
            unit: currentPrice.size,
          },
        ],
      }));
      setCurrentPrice({ size: "", quantity: "", price: "" });
    } else {
      toast.error("Please provide unit, quantity, and price");
    }
  };

  const handleRemovePrice = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      setPrices: prev.setPrices.filter((p) => p.id !== id),
    }));
  };

  // -------- Thumbnail helpers (upload + preview) --------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const clearImage = () => {
    setImageFile(null);
    // keep existing preview if product had one
    setImagePreview(formData.imageLink || null);
  };

  // -------- Queries + mutation --------
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const url = product
        ? `${API_BASE_URL}/products/update/${product._id}`
        : `${API_BASE_URL}/products/create`;
      const method = product ? "PUT" : "POST";

      const num = (v: any) =>
        v === "" || v === null || v === undefined ? undefined : Number(v);

      // sanitize setPrices (filter empties)
      const cleanPrices = (data.setPrices || []).filter(
        (p) => p.unit && p.quantity && p.price !== ""
      );

      const payload: any = {
        title: data.title,
        subTitle: data.subTitle,
        category: data.category,
        subcategory: data.subcategory,
        description: data.description,
        totalTHC: num(data.totalTHC),
        totalCBD: num(data.totalCBD),
        thcCbdRatio: data.thcCbdRatio,
        totalTerpenes: num(data.totalTerpenes),
        totalSize: data.totalSize,
        strainPrevalence: data.strainPrevalence,
        unitsInPackage: num(data.unitsInPackage),
        strain: data.strain,
        setPrices: cleanPrices, // stringify later
        topTerpenes: {
          bCaryophyllene: num(data.topTerpenes.terpene1),
          limonene: num(data.topTerpenes.terpene2),
          humulene: num(data.topTerpenes.terpene3),
          linalool: num(data.topTerpenes.terpene4),
        },
        labData: {
          thc: {
            totalTHC: num(data.labData.thc.totalTHC),
            thca: num(data.labData.thc.thca),
            delta9THC: num(data.labData.thc.delta9THC),
          },
          cbd: {
            totalCBD: num(data.labData.cbd.totalCBD),
            cbda: num(data.labData.cbd.cbda),
            ...(data.labData.cbd.cbg ? { cbg: num(data.labData.cbd.cbg) } : {}),
            ...(data.labData.cbd.cbga ? { cbga: num(data.labData.cbd.cbga) } : {}),
          },
          terpenes: {
            totalTerpenes: num(data.labData.terpenes.totalTerpenes),
            bMyrcene: num(data.labData.terpenes.betaycene), // map UI -> backend
            terpinolene: num(data.labData.terpenes.terpinolene),
            ocimene: num(data.labData.terpenes.ocimene),
          },
        },
      };

      const formDataToSend = new FormData();

      // scalars
      const scalars = [
        "title",
        "subTitle",
        "category",
        "subcategory",
        "description",
        "totalTHC",
        "totalCBD",
        "thcCbdRatio",
        "totalTerpenes",
        "totalSize",
        "strainPrevalence",
        "unitsInPackage",
        "strain",
      ] as const;
      scalars.forEach((k) => {
        const v = (payload as any)[k];
        if (v !== undefined && v !== null && v !== "") formDataToSend.append(k, String(v));
      });

      // promoList: append each id (avoid sending empty array as a string)
      if (Array.isArray(formData.promoList) && formData.promoList.length > 0) {
        formData.promoList
          .filter((id) => id && id.trim() !== "")
          .forEach((id) => formDataToSend.append("promoList", id));
      }

      // complex
      formDataToSend.append("setPrices", JSON.stringify(payload.setPrices));
      formDataToSend.append("topTerpenes", JSON.stringify(payload.topTerpenes));
      formDataToSend.append("labData", JSON.stringify(payload.labData));

      // file: only append if new file chosen (backend will keep existing if absent)
      if (imageFile) {
        formDataToSend.append("thumbnail", imageFile);
      }

      const response = await fetch(url, { method, body: formDataToSend });
      if (!response.ok) throw new Error("Failed to save product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(product ? "Product updated successfully" : "Product created successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error("[v0] Error saving product:", err);
      toast.error("Failed to save product");
    },
  });

  // selects
  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId, subcategory: "" }));
  };
  const handleSubcategorySelect = (subcategoryId: string) => {
    setFormData((prev) => ({ ...prev, subcategory: subcategoryId }));
  };

  // submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      toast.error("Please fill in required fields");
      return;
    }
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Add product title *</label>
            <Input
              type="text"
              placeholder="Enter product title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Add product Subtitle</label>
            <Input
              type="text"
              placeholder="Add your subtitle"
              value={formData.subTitle}
              onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Product Category *</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={categoriesLoading}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
              required
            >
              <option value="">{categoriesLoading ? "Loading categories..." : "Select a category"}</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory (single) */}
          {formData.category && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Subcategory (choose one)</label>
              <div className="space-y-2 border rounded-md p-3 bg-muted/50">
                {subcategoriesLoading ? (
                  <p className="text-sm text-muted-foreground">Loading subcategories...</p>
                ) : subcategories.length > 0 ? (
                  subcategories.map((subcat) => (
                    <label key={subcat._id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="subcategory"
                        checked={formData.subcategory === subcat._id}
                        onChange={() => handleSubcategorySelect(subcat._id)}
                        className="rounded border-input"
                      />
                      <span className="text-sm text-foreground">{subcat.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No subcategories available</p>
                )}
              </div>
            </div>
          )}

          {/* Set Prices (EDITABLE) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Set Prices</label>

            {/* Editable list */}
            <div className="space-y-2 mb-4">
              {formData.setPrices.map((priceSet) => (
                <div key={priceSet.id} className="grid grid-cols-12 items-end gap-2 bg-muted p-3 rounded-md">
                  <div className="col-span-3">
                    <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
                    <Input
                      type="text"
                      value={priceSet.unit}
                      onChange={(e) => handlePriceChange(priceSet.id, "unit", e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-xs text-muted-foreground mb-1 block">Qty</label>
                    <Input
                      type="text"
                      value={priceSet.quantity}
                      onChange={(e) => handlePriceChange(priceSet.id, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="col-span-4">
                    <label className="text-xs text-muted-foreground mb-1 block">Price</label>
                    <Input
                      type="text"
                      value={priceSet.price}
                      onChange={(e) => handlePriceChange(priceSet.id, "price", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleRemovePrice(priceSet.id)}
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {formData.setPrices.length === 0 && (
                <p className="text-sm text-muted-foreground">No prices added yet.</p>
              )}
            </div>

            {/* Add New Price */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
                  <Input
                    type="text"
                    placeholder="e.g., 10g"
                    value={currentPrice.size}
                    onChange={(e) => setCurrentPrice({ ...currentPrice, size: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Qty</label>
                  <Input
                    type="text"
                    placeholder="Quantity"
                    value={currentPrice.quantity}
                    onChange={(e) => setCurrentPrice({ ...currentPrice, quantity: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Price</label>
                  <Input
                    type="text"
                    placeholder="Price"
                    value={currentPrice.price}
                    onChange={(e) => setCurrentPrice({ ...currentPrice, price: e.target.value })}
                  />
                </div>
                <Button type="button" onClick={handleAddPrice} className="bg-green-600 hover:bg-green-700 text-white">
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnail (upload + preview) */}
          <div className="border rounded-md p-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Thumbnail</label>

            {/* Preview */}
            {imagePreview ? (
              <div className="mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Thumbnail preview"
                  className="w-full max-h-60 object-contain rounded-md border"
                />
                <div className="flex gap-2 mt-2">
                  <label className="cursor-pointer">
                    <span className="px-3 py-2 border rounded-md mr-2 inline-block">Change</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {imageFile && (
                    <Button type="button" variant="outline" onClick={clearImage}>
                      Revert to existing
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed rounded-md p-8 text-center hover:border-foreground cursor-pointer block">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload image</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}

            {!imagePreview && formData.imageLink && (
              <p className="text-xs text-muted-foreground mt-2">No preview available.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <ReactQuill
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              theme="snow"
              placeholder="Enter product description"
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
              className="h-32"
            />
          </div>

          {/* General Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">General Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Total THC</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="Total"
                  value={formData.totalTHC}
                  onChange={(e) => setFormData({ ...formData, totalTHC: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Total CBD</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="Total"
                  value={formData.totalCBD}
                  onChange={(e) => setFormData({ ...formData, totalCBD: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">THC-CBD ratio</label>
                <Input
                  type="text"
                  placeholder="Ratio (e.g., 4:1)"
                  value={formData.thcCbdRatio}
                  onChange={(e) => setFormData({ ...formData, thcCbdRatio: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Total Terpenes</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="Total"
                  value={formData.totalTerpenes}
                  onChange={(e) => setFormData({ ...formData, totalTerpenes: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Total Size</label>
                <Input
                  type="text"
                  placeholder="Size (e.g., 10g)"
                  value={formData.totalSize}
                  onChange={(e) => setFormData({ ...formData, totalSize: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Units in Package</label>
                <Input
                  type="number"
                  step="1"
                  placeholder="Units"
                  value={formData.unitsInPackage}
                  onChange={(e) => setFormData({ ...formData, unitsInPackage: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Strain Provenance</label>
                <Input
                  type="text"
                  placeholder="Indica/Sativa etc."
                  value={formData.strainPrevalence}
                  onChange={(e) => setFormData({ ...formData, strainPrevalence: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Strain</label>
                <Input
                  type="text"
                  placeholder="e.g., OG Kush"
                  value={formData.strain}
                  onChange={(e) => setFormData({ ...formData, strain: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Top Terpenes */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Top Terpenes</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                step="any"
                placeholder="β-Caryophyllene"
                value={formData.topTerpenes.terpene1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    topTerpenes: { ...formData.topTerpenes, terpene1: e.target.value },
                  })
                }
              />
              <Input
                type="number"
                step="any"
                placeholder="Limonene"
                value={formData.topTerpenes.terpene2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    topTerpenes: { ...formData.topTerpenes, terpene2: e.target.value },
                  })
                }
              />
              <Input
                type="number"
                step="any"
                placeholder="Humulene"
                value={formData.topTerpenes.terpene3}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    topTerpenes: { ...formData.topTerpenes, terpene3: e.target.value },
                  })
                }
              />
              <Input
                type="number"
                step="any"
                placeholder="Linalool"
                value={formData.topTerpenes.terpene4}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    topTerpenes: { ...formData.topTerpenes, terpene4: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lab Data */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Lab Data</h3>

        {/* THC */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-foreground mb-3">THC</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Total THC</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.thc.totalTHC}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, thc: { ...formData.labData.thc, totalTHC: e.target.value } },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">THCA</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.thc.thca}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, thc: { ...formData.labData.thc, thca: e.target.value } },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Delta-9 THC</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.thc.delta9THC}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, thc: { ...formData.labData.thc, delta9THC: e.target.value } },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* CBD */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-foreground mb-3">CBD</p>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Total CBD</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.cbd.totalCBD}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, cbd: { ...formData.labData.cbd, totalCBD: e.target.value } },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">CBDA</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.cbd.cbda}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, cbd: { ...formData.labData.cbd, cbda: e.target.value } },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">CBG (optional)</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.cbd.cbg ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, cbd: { ...formData.labData.cbd, cbg: e.target.value } },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">CBGA (optional)</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.cbd.cbga ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: { ...formData.labData, cbd: { ...formData.labData.cbd, cbga: e.target.value } },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Terpenes */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-3">TERPENES</p>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Total Terpenes</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.terpenes.totalTerpenes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: {
                      ...formData.labData,
                      terpenes: { ...formData.labData.terpenes, totalTerpenes: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">β-Myrcene</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.terpenes.betaycene}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: {
                      ...formData.labData,
                      terpenes: { ...formData.labData.terpenes, betaycene: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Terpinolene</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.terpenes.terpinolene}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: {
                      ...formData.labData,
                      terpenes: { ...formData.labData.terpenes, terpinolene: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Ocimene</label>
              <Input
                type="number"
                step="any"
                value={formData.labData.terpenes.ocimene}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labData: {
                      ...formData.labData,
                      terpenes: { ...formData.labData.terpenes, ocimene: e.target.value },
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isPending || isLoading}>
          {isPending ? "Saving..." : product ? "Update Product" : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
